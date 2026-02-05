import Link from 'next/link';
import type { Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔎</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or was moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
