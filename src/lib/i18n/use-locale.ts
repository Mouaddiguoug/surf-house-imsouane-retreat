"use client";

import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n/locale";

/**
 * The reader's language, for client components deep in the tree that are
 * not handed it as a prop. Read from the visible URL: French pages are
 * under `/fr`, everything else is English.
 */
export function useLocale(): Locale {
  const pathname = usePathname() ?? "/";
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}
