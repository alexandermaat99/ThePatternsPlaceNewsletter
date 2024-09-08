/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://thepatternsplace.com",
  generateRobotsTxt: true, // (Optional) Generates `robots.txt` file
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
};
