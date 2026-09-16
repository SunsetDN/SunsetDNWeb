const fs = require("fs");
const path = require("path");
const { ROOT } = require("./build-pages");

const SITE_URL = "https://sunsetdn.parin.asia";

const PAGES = [
  { path: "index.html", priority: "1.0" },
  { path: "members.html", priority: "0.8" },
  { path: "tech.html", priority: "0.6" },
  { path: "commission.html", priority: "0.6" },
];

const today = new Date().toISOString().slice(0, 10);

const urls = PAGES.map(
  (page) => `  <url>
    <loc>${SITE_URL}/${page.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${page.priority}</priority>
  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, "sitemap.xml"), xml, "utf8");
console.log("sitemap.xml generated");
