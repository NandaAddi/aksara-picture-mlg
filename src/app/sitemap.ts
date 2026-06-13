import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://aksarapicture.web.id';

  // Base routes
  const routes = [
    '',
    '/portfolio',
    '/services',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Fetch blog articles dynamically from Supabase
  try {
    const { data: articles } = await supabase
      .from('articles')
      .select('slug, created_at')
      .eq('is_published', true);

    if (articles) {
      const blogRoutes = articles.map((article) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: new Date(article.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
      return [...routes, ...blogRoutes];
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }

  return routes;
}
