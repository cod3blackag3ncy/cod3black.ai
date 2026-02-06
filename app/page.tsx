// Force dynamic rendering - visitors always get fresh content
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import HomeClient from './home-client';

export default function Home() {
  return <HomeClient />;
}
