import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import { PACKAGE_UI } from "@/features/packages/data/package-ui";
import type { PackageSummary } from "@/features/packages/data/packages";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

type PackageBookingProps = {
  package: PackageSummary;
  locale?: Locale;
  /** The package's own closing lines, where it has them. */
  heading?: string;
  body?: string[];
  /** Replaces the package's usual link out — the WhatsApp chat, say. */
  secondary?: { href: string; label: string; external?: boolean };
};

/**
 * The close of a package page.
 *
 * Every one of these pages used to end the way a section ends — two buttons
 * tacked to the foot of the last block of copy. A page wants a floor instead:
 * its own band, on ink, that stops the reading and asks. The label on the
 * button names the package rather than saying "book", because by this point
 * the reader has been on one page for a while and the confirmation of *which*
 * week is worth the four extra words.
 */
export function PackageBooking({
  package: entry,
  locale = "en",
  heading,
  body,
  secondary,
}: PackageBookingProps) {
  const ui = PACKAGE_UI[locale];
  const link = secondary ?? entry.secondary;
  const paragraphs = body ?? [ui.closingBody];

  return (
    <section className="bg-house-ink text-house-shell py-20 sm:py-24">
      <div className="page-wrap flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            {heading ?? ui.closingHeading}
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-house-shell/80 mt-3 text-base leading-relaxed text-pretty"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          {/* Sand on the charcoal: the charcoal call to action would vanish
              here. A programme has nothing to book yet, so its button opens
              a conversation instead. */}
          {entry.rates ? (
            <BookButton
              variant="sand"
              packageSlug={entry.slug}
              className="h-12 w-full px-6 text-xs sm:w-auto"
            >
              {entry.bookLabel}
            </BookButton>
          ) : (
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "sand" }),
                "h-12 w-full gap-2 px-6 text-xs sm:w-auto",
              )}
            >
              {entry.bookLabel}
              <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only">
                {locale === "fr"
                  ? " (WhatsApp, s'ouvre dans un nouvel onglet)"
                  : " (WhatsApp, opens in a new tab)"}
              </span>
            </a>
          )}
          <Link
            href={link.href}
            {...("external" in link && link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(
              buttonVariants({ variant: "shellOutline" }),
              "h-12 w-full px-6 text-xs sm:w-auto",
            )}
          >
            {link.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
