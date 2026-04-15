import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/calendar",
    },
    sitemap: "https://orkilubin.pl/sitemap.xml",
  };
}
