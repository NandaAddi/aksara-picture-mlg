import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // 1. Konfigurasi Supabase (Gunakan Environment Variable di Vercel nanti)
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY; 
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 2. Domain Website Anda
  const BASE_URL = 'https://aksarapicture.web.id';

  // 3. Halaman Statis (Halaman utama yang selalu ada)
  const staticPages = [
    '',
    '/portfolio',
    '/services',
    '/blog',
    '/contact'
  ];

  try {
    // 4. Ambil Artikel dari Supabase (Hanya yang published)
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // 5. Susun XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
        .map((url) => {
          return `
            <url>
              <loc>${BASE_URL}${url}</loc>
              <changefreq>monthly</changefreq>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}

      ${articles
        .map((article) => {
          return `
            <url>
              <loc>${BASE_URL}/article/${article.slug}</loc>
              <lastmod>${new Date(article.created_at).toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;

    // 6. Kirim Response sebagai XML
    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(sitemap);

  } catch (e) {
    res.status(500).json({ error: 'Gagal membuat sitemap' });
  }
}