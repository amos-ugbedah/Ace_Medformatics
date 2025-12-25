// sitemapBuilder.js
import { writeFileSync } from 'fs';

const baseUrl = 'https://acemedformatics.org';
const routes = [
  '/',
  '/programs',
  '/program-categories',
  '/mentors',
  '/mentees',
  '/collaborations',
  '/contact',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('')}
</urlset>
`;

writeFileSync('./public/sitemap.xml', sitemap);
console.log('Sitemap generated in public/sitemap.xml');
