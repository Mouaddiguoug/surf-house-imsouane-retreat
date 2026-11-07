import type { MetadataRoute } from "next";

import { PACKAGES } from "@/features/packages/data/packages";
import { LEGAL_PATHS } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";
import { localizeHref } from "@/lib/i18n/locale";

/**
 * Every indexable page, in both languages, each entry naming its other
 * language as an alternate so search engines pair them. Hash sections
 * (`/#contact`) are not pages and do not belong here. `lastModified` is the
 * build, which is honest: these are static routes and they change when the
 * site is deployed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();

  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ...PACKAGES.map(
      (entry) => [entry.href, 0.9, "monthly"] as [string, number, "monthly"],
    ),
    ["/upgrade", 0.6, "monthly"],
    ["/house", 0.8, "monthly"],
    ["/coaching", 0.8, "monthly"],
    ["/imsouane", 0.7, "yearly"],
    ...LEGAL_PATHS.map((path) => [path, 0.3, "yearly"] as [string, number, "yearly"]),
  ];

  return pages.flatMap(([path, priority, changeFrequency]) => {
    const languages = {
      en: `${SITE.url}${path}`,
      fr: `${SITE.url}${localizeHref(path, "fr")}`,
    };
    return (["en", "fr"] as const).map((locale) => ({
      url: languages[locale],
      lastModified: built,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
