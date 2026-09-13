import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import type { PackageSummary } from "@/features/packages/data/packages";
import { cn } from "@/lib/utils/cn";

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
}: {
  package: PackageSummary;
}) {
  return (
    <section className="bg-house-ink text-house-sand px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            Ready when you are
          </h2>
          <p className="text-house-sand/75 mt-3 text-base leading-relaxed text-pretty">
            Live availability, secure payment, and a confirmation in your inbox
            the moment it goes through.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
            {entry.bookLabel}
          </BookButton>
          <Link
            href={entry.secondary.href}
            className={cn(
              buttonVariants({ variant: "shellOutline" }),
              "h-12 w-full px-6 text-xs sm:w-auto",
            )}
          >
            {entry.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
