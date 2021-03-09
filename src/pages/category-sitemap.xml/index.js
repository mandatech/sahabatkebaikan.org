import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
  // Method to source urls from cms
  // const urls = await fetch('https//example.com/api')
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/categories`);
  const categories = await res.json();

  const fields = [];

  categories.items.forEach((category) => {
    fields.push({
      loc: `https://sahabatkebaikan.org/kategori/${category.id}`, // Absolute url
      lastmod: new Date(category.updated_at).toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    });
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
