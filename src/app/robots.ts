import type { MetadataRoute } from "next";

import { SITE } from "@/lib/constants/site";

/** Everything is crawlable except the enquiry endpoint, which is not a page. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
