import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  PACKAGE_UI,
  euros,
  perLabel,
} from "@/features/packages/data/package-ui";
import type { PackageSummary } from "@/features/packages/data/packages";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

type PackageCardProps = {
  package: PackageSummary;
  className?: string;
  locale?: Locale;
  /**
   * The photograph's shape. `row` is for cards set side by side: one fixed
   * height from 900px, so cards of different widths still put their rule,
   * kind and title on one line.
   */
  aspect?: "landscape" | "square" | "portrait" | "row";
};

const KIND = {
  en: { stay: "Stay", programme: "Programme" },
  fr: { stay: "Séjour", programme: "Programme" },
} as const;

/**
 * One product, as a way in to its page.
 *
 * Editorial rather than promotional: the photograph on top, square-cornered
 * and uncovered, then the words on the page's own ground under a 1px
 * charcoal rule. No glass, no scrim, no shadow — the V1.5 system draws its
 * depth with rules and colour, and a photograph with nothing laid over it is
 * the one thing a card can honestly show of a stay.
 *
 * A sold product shows its "from" price beside the kind; a programme shows
 * no price at all, because none is published. The whole card is one link,
 * with a single cover element so it keeps one tab stop and a readable
 * heading.
 */
export function PackageCard({
  package: entry,
  className,
  locale = "en",
  aspect = "landscape",
}: PackageCardProps) {
  const ui = PACKAGE_UI[locale];

  return (
    <article
      data-slot="package-card"
      className={cn(
        "group relative flex flex-col",
        "has-[a:focus-visible]:outline-3 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-house-ink",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-sm",
          aspect === "landscape" && "aspect-4/3",
          aspect === "square" && "aspect-square",
          aspect === "portrait" && "aspect-4/5",
          aspect === "row" &&
            "aspect-4/3 min-[900px]:aspect-auto min-[900px]:h-[22rem]",
        )}
      >
        <Image
          src={entry.image}
          alt={entry.imageAlt}
          fill
          sizes="(min-width: 900px) 40vw, 100vw"
          style={{ objectPosition: entry.imagePosition ?? "50% 50%" }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
        />
      </div>

      <div className="border-house-ink mt-5 flex flex-1 flex-col border-t pt-4">
        <div className="flex h-5 items-baseline justify-between gap-4 text-xs leading-none font-semibold tracking-[0.16em] uppercase">
          <span>{KIND[locale][entry.kind]}</span>
          {entry.rates && (
            <span className="text-house-muted normal-case tracking-normal">
              <span className="uppercase tracking-[0.16em]">{ui.from}</span>{" "}
              <span className="text-house-ink font-display text-base leading-none font-normal">
                {euros(entry.rates.from, locale)}
              </span>{" "}
              / {perLabel(entry, locale)}
            </span>
          )}
        </div>

        <h3 className="font-display mt-3 text-2xl leading-[1.15] text-balance sm:text-[1.75rem]">
          {entry.title}
        </h3>
        <p className="text-house-muted mt-3 text-base leading-relaxed text-pretty">
          {entry.summary}
        </p>

        <p className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold tracking-[0.14em] uppercase">
          {entry.cta}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          />
        </p>
      </div>

      <Link
        href={entry.href}
        className="absolute inset-0 focus-visible:outline-none"
      >
        <span className="sr-only">{entry.title}</span>
      </Link>
    </article>
  );
}
