module.exports = {
  siteUrl: `https://sahabatkebaikan.org`,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 30000,
  generateRobotsTxt: true,
  exclude: ['/campaign/new', '/campaign-sitemap.xml', '/category-sitemap.xml'],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/campaign/new'],
      },
    ],
    additionalSitemaps: [
      `https://sahabatkebaikan.org/campaign-sitemap.xml`,
      `https://sahabatkebaikan.org/category-sitemap.xml`,
    ],
  },
};
