const BASE_URL = 'https://c3bai.vercel.app';

const routes = [
  '/',
  '/docs/projects',
  '/docs/web-design',
  '/docs/mobile-apps'
];

export async function GET() {
  const lastmod = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
    .map(
      (route) => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.7'}</priority>
  </url>`
    )
    .join('\n')}
</urlset>
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
