// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://www.merlotlab.com/sitemap.xml",
  };
}
