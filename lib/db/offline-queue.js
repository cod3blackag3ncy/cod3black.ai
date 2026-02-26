'use client';

/**
 * Offline form queue using IndexedDB
 * Stores form submissions when offline and syncs when back online
 */

const DB_NAME = 'c3bai-offline';
const STORE_NAME = 'inquiry-queue';
const DB_VERSION = 1;

let db = null;

export async function initOfflineQueue() {
  if (typeof window === 'undefined') return false;
  
  if (db) return true;

  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.warn('Failed to initialize offline queue');
      resolve(false);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(true);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

export async function queueFormSubmission(formData) {
  if (!db || typeof window === 'undefined') return null;

  return new Promise((resolve) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const item = {
      formData,
      timestamp: Date.now(),
      status: 'queued',
      attempt: 0,
    };

    const request = store.add(item);

    request.onsuccess = () => {
      console.log('Form queued for offline submission');
      resolve(request.result);
    };

    request.onerror = () => {
      console.error('Failed to queue form');
      resolve(null);
    };
  });
}

export async function getQueuedSubmissions() {
  if (!db || typeof window === 'undefined') return [];

  return new Promise((resolve) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const queued = request.result.filter(item => item.status === 'queued');
      resolve(queued);
    };

    request.onerror = () => {
      resolve([]);
    };
  });
}

export async function updateQueueItem(id, updates) {
  if (!db || typeof window === 'undefined') return false;

  return new Promise((resolve) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      const item = request.result;
      const updated = { ...item, ...updates };
      const updateRequest = store.put(updated);
      
      updateRequest.onsuccess = () => {
        resolve(true);
      };
      
      updateRequest.onerror = () => {
        resolve(false);
      };
    };

    request.onerror = () => {
      resolve(false);
    };
  });
}

export async function syncOfflineQueue() {
  if (typeof window === 'undefined') return 0;
  
  const queued = await getQueuedSubmissions();
  let synced = 0;

  for (const item of queued) {
    if (item.attempt > 3) continue; // Skip after 3 attempts

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item.formData),
      });

      if (response.ok) {
        await updateQueueItem(item.id, { status: 'synced' });
        synced++;
        console.log('✓ Queued submission synced');
      } else {
        await updateQueueItem(item.id, { attempt: item.attempt + 1 });
      }
    } catch (error) {
      console.error('Sync attempt failed:', error);
      await updateQueueItem(item.id, { attempt: item.attempt + 1 });
    }
  }

  return synced;
}

export function setupOnlineListener(callback) {
  if (typeof window === 'undefined') return;

  window.addEventListener('online', async () => {
    console.log('Back online. Syncing queued submissions...');
    const synced = await syncOfflineQueue();
    if (synced > 0) {
      callback(synced);
    }
  });
}
