import type { MetadataRoute } from "next";

import { PACKAGES } from "@/features/packages/data/packages";
import { LEGAL_LINKS } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";

/**
 * Every indexable page, once. Hash sections (`/#book`, `/#contact`) are not
 * pages and do not belong here. `lastModified` is the build, which is honest:
 * these are static routes and they change when the site is deployed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  ) => ({
    url: `${SITE.url}${path}`,
    lastModified: built,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    ...PACKAGES.map((entry) => page(entry.href, 0.9, "monthly")),
    page("/house", 0.8, "monthly"),
    page("/coaching", 0.8, "monthly"),
    page("/imsouane", 0.7, "yearly"),
    ...LEGAL_LINKS.map((link) => page(link.href, 0.3, "yearly")),
  ];
}
