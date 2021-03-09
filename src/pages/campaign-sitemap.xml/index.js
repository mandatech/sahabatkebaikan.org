import { getServerSideSitemap } from 'next-sitemap';

export const getServerSideProps = async (ctx) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/campaigns`);
  const campaigns = await res.json();

  const fields = [];

  campaigns.items.forEach((campaign) => {
    fields.push({
      loc: `https://sahabatkebaikan.org/campaign/${campaign.slug}`, // Absolute url
      lastmod: new Date(campaign.updated_at).toISOString(),
      changefreq: 'daily',
      priority: 0.7,
    });
  });

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default () => {};
