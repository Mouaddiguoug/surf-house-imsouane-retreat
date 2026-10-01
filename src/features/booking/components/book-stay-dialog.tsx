"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ArrowLeft, ArrowUpRight, Check, Lock, Minus, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { bookingUrl, type RatePlanId } from "@/features/booking/bookinglayer";
import {
  bookingDialogClosed,
  bookingDialogOpened,
  bookingPackageChosen,
  bookingPackageCleared,
} from "@/features/booking/bookingSlice";
import { takeBookingOpener } from "@/features/booking/components/book-button";
import { RATE_PLANS } from "@/features/legal/data/legal";
import {
  PACKAGES,
  formatPrice,
  packageBySlug,
} from "@/features/packages/data/packages";
import { CONTACT_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

/** The two plans, in the order they should be read: cheapest first. */
const PLAN_ORDER: RatePlanId[] = ["non-refundable", "semi-flexible"];

/**
 * The booking dialog: choose a week, then choose how you want to pay for it.
 *
 * The engine no longer runs inside this panel. What a guest has to actually
 * understand before paying — which week, and what happens if they cancel —
 * is the part the house should say in its own words, so it happens here; the
 * calendar, the room and the card belong to Bookinglayer and the reader is
 * handed over with both choices already made.
 *
 * Two steps, and the first is skipped whenever the button already knew the
 * answer. A "Book" button on a package page opens straight on that week's
 * plans; the one in the navbar opens on the three packages. Stepping back is
 * always possible, because a reader who opened the wrong week should not have
 * to close the dialog to fix it.
 */
export function BookStayDialog() {
  const open = useAppSelector((state) => state.booking.dialogOpen);
  const slug = useAppSelector((state) => state.booking.slug);
  const dispatch = useAppDispatch();

  const entry = slug ? packageBySlug(slug) : null;

  function handleOpenChange(next: boolean) {
    dispatch(next ? bookingDialogOpened(null) : bookingDialogClosed());
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-house-deep/55 duration-300 motion-reduce:animate-none" />
        <DialogPrimitive.Popup
          data-slot="book-stay-popup"
          finalFocus={takeBookingOpener}
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-background text-foreground outline-none",
            // `sm:inset-auto` first, and it is the whole fix: `inset-0` sets
            // `bottom: 0` as well as `top: 0`, and overriding only `top` left
            // the panel stretched between `top: 50%` and `bottom: 0` — half
            // the viewport, whatever its content, with the second rate plan
            // cut off below the fold.
            "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:w-[min(52rem,calc(100vw-3rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:shadow-2xl sm:ring-1 sm:ring-foreground/10",
            "duration-300 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-4",
            "motion-reduce:animate-none",
          )}
        >
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border py-4 pr-3 pl-5 sm:pl-8">
            <div className="min-w-0">
              {entry && (
                <button
                  type="button"
                  onClick={() => dispatch(bookingPackageCleared())}
                  className={cn(
                    "text-muted-foreground -mx-2 mb-1.5 inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1 font-mono text-label tracking-[0.18em] uppercase",
                    "transition-colors duration-200 hover:text-foreground motion-reduce:transition-none",
                    focusRing,
                  )}
                >
                  <ArrowLeft aria-hidden className="size-3.5" />
                  All packages
                </button>
              )}
              <DialogTitle className="font-display text-xl leading-tight sm:text-2xl">
                {entry ? entry.name : "Book a stay"}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1 text-sm">
                {entry
                  ? "Choose how you would like to pay for it."
                  : "Which week are you booking?"}
              </DialogDescription>
            </div>
            <DialogClose
              aria-label="Close booking"
              className={cn(
                "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl",
                "transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
                focusRing,
              )}
            >
              <X aria-hidden className="size-5" />
            </DialogClose>
          </header>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain p-5 sm:p-8">
            {entry ? <PlanStep slug={entry.slug} /> : <PackageStep />}
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}

/** Step one: which of the three. */
function PackageStep() {
  const dispatch = useAppDispatch();

  return (
    <ul className="flex flex-col gap-3">
      {PACKAGES.map((entry) => (
        <li key={entry.slug}>
          <button
            type="button"
            onClick={() => dispatch(bookingPackageChosen(entry.slug))}
            className={cn(
              "group border-border flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border p-5 text-left",
              "transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
              focusRing,
            )}
          >
            <span className="min-w-0">
              <span className="text-muted-foreground block font-mono text-label tracking-[0.18em] uppercase">
                {entry.name}
              </span>
              <span className="font-display mt-1 block text-lg leading-snug">
                {entry.title}
              </span>
              <span className="text-muted-foreground mt-1 block text-sm">
                {entry.subtitle}
              </span>
            </span>
            <span className="shrink-0 text-right">
              <span className="text-muted-foreground block font-mono text-label tracking-[0.18em] uppercase">
                From
              </span>
              <span className="font-display block text-lg">
                €{formatPrice(entry.rates.nonRefundable)}
              </span>
              <span className="text-muted-foreground block text-xs">
                / {entry.rates.unit}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/** Step two: on which terms. */
function PlanStep({ slug }: { slug: string }) {
  const entry = packageBySlug(slug);

  return (
    <div className="flex flex-col gap-5">
      {/* Side by side from `sm`, because this is a comparison: stacked, the
          second plan sat below the fold on a laptop and a reader had to
          scroll to learn that a choice existed at all. `items-stretch` plus
          `mt-auto` on each card's action keeps the two buttons on one line
          however unevenly the terms above them fall. */}
      <div className="grid items-stretch gap-4 sm:grid-cols-2">
        {PLAN_ORDER.map((id) => {
          const plan = RATE_PLANS.find((candidate) => candidate.id === id)!;
          const price =
            id === "non-refundable"
              ? entry.rates.nonRefundable
              : entry.rates.semiFlexible;
          const href = bookingUrl(slug, id);
          const isWeek = entry.rates.unit === "week";
          // Only the terms that apply to this package. The semi-flexible plan
          // carries one cancellation window per kind of stay, and rendering
          // both put the Custom Retreat's ten days on the Foundation's card,
          // at the moment a reader is deciding whether they can afford to
          // change their mind. Both edges of the window are stated, because
          // "refunded more than 30 days out" says nothing about day 29.
          // `RATE_PLANS` lists the seven-night window first and every other
          // stay second; keep that order if a window is ever added.
          const window =
            "windows" in plan ? plan.windows[isWeek ? 0 : 1] : null;
          // Each line carries its own mark. A tick beside "the deposit is
          // retained" reads as a benefit, so the semi-flexible plan ticks only
          // what it gives and marks what it keeps with a plain rule.
          const terms: {
            text: string | null | undefined;
            mark: "lock" | "gives" | "keeps";
          }[] =
            id === "non-refundable"
              ? [
                  { text: plan.payment, mark: "lock" },
                  { text: plan.cancellation, mark: "lock" },
                  { text: isWeek ? plan.change : null, mark: "lock" },
                  {
                    text: `No-show: ${plan.noShow.toLowerCase()}`,
                    mark: "lock",
                  },
                ]
              : [
                  { text: plan.payment, mark: "gives" },
                  { text: window?.free, mark: "gives" },
                  { text: window?.late, mark: "keeps" },
                  {
                    text: `No-show: ${plan.noShow.toLowerCase()}`,
                    mark: "keeps",
                  },
                ];

          return (
            <section
              key={id}
              className="border-border flex flex-col rounded-2xl border p-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-display text-lg">{plan.name}</h3>
                <p className="font-display text-xl">
                  €{formatPrice(price)}
                  <span className="text-muted-foreground text-sm">
                    {" "}
                    / {entry.rates.unit}
                  </span>
                </p>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                {plan.tagline}
              </p>

              <ul className="mt-4 flex flex-col gap-2">
                {terms.map(({ text, mark }) =>
                  text ? (
                    <li
                      key={text}
                      className="flex gap-2.5 text-sm leading-relaxed"
                    >
                      {mark === "lock" ? (
                        <Lock
                          aria-hidden
                          className="text-house-muted mt-1 size-3.5 shrink-0"
                        />
                      ) : mark === "gives" ? (
                        <Check
                          aria-hidden
                          className="text-house-tide mt-1 size-3.5 shrink-0"
                        />
                      ) : (
                        <Minus
                          aria-hidden
                          className="text-house-muted mt-1 size-3.5 shrink-0"
                        />
                      )}
                      <span>{text}</span>
                    </li>
                  ) : null,
                )}
              </ul>

              <div className="mt-auto pt-5">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({
                        variant: id === "non-refundable" ? "clay" : "outline",
                      }),
                      // The outline plan wears the clay one's label — rounded
                      // corner, uppercase mono — so the two read as a pair
                      // that differ in weight, not as two unrelated controls.
                      "h-12 w-full gap-2 px-5 text-xs",
                      id !== "non-refundable" &&
                        "border-house-ink/15 rounded-xl font-mono tracking-[0.14em] uppercase",
                    )}
                  >
                    Continue on this rate
                    <ArrowUpRight aria-hidden className="size-4" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <p className="text-muted-foreground bg-muted rounded-xl px-4 py-3 text-xs leading-relaxed">
                    Online booking for this rate is being switched on. Write to
                    us and we will hold the week by hand —{" "}
                    <Link
                      href={CONTACT_HREF}
                      className="text-house-tide underline underline-offset-4"
                    >
                      get in touch
                    </Link>
                    .
                  </p>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <p className="text-muted-foreground text-xs leading-relaxed">
        Prices are per person in euros, from the premium dorm bed; a private
        room is priced at the next step. Full terms are in our{" "}
        <Link
          href="/legal/refunds"
          className="text-house-tide underline underline-offset-4"
        >
          Cancellation &amp; Refund Policy
        </Link>
        .
      </p>
    </div>
  );
}
