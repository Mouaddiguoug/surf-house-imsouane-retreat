"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";

import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { bookingUrl } from "@/features/booking/bookinglayer";
import {
  bookingDialogClosed,
  bookingDialogOpened,
} from "@/features/booking/bookingSlice";
import { takeBookingOpener } from "@/features/booking/components/book-button";
import { perLabel } from "@/features/packages/data/package-ui";
import { PACKAGES, formatPrice } from "@/features/packages/data/packages";
import { CONTACT_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

/**
 * The booking dialog: which stay are you booking?
 *
 * The engine does not run inside this panel. Dates, the room and the card
 * belong to Bookinglayer, and the reader is handed over with the package
 * already chosen. That is the only question left to ask here — there was a
 * second step, a choice between two rate plans, until the shop stopped
 * selling them — so each package is simply a link to its page in the shop.
 *
 * Only the buttons with no package in mind open this: the navbar, the
 * footer, the house and village pages. A button on a package page already
 * knows the answer and goes straight to the shop.
 */
export function BookStayDialog() {
  const open = useAppSelector((state) => state.booking.dialogOpen);
  const dispatch = useAppDispatch();

  function handleOpenChange(next: boolean) {
    dispatch(next ? bookingDialogOpened() : bookingDialogClosed());
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
            // the viewport, whatever its content.
            "sm:inset-auto sm:top-1/2 sm:left-1/2 sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:w-[min(36rem,calc(100vw-3rem))] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:shadow-2xl sm:ring-1 sm:ring-foreground/10",
            "duration-300 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-4",
            "motion-reduce:animate-none",
          )}
        >
          <header className="flex shrink-0 items-start justify-between gap-4 border-b border-border py-4 pr-3 pl-5 sm:pl-8">
            <div className="min-w-0">
              <DialogTitle className="font-display text-xl leading-tight sm:text-2xl">
                Book a stay
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mt-1 text-sm">
                Which stay are you booking? Dates and your room are chosen on
                our booking site.
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

          <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain p-5 sm:p-8">
            <PackageList />

            <p className="text-muted-foreground text-xs leading-relaxed">
              Prices are per person in euros, from the shared-dorm bed; a
              private room costs more, and your final price is shown during
              booking. Full terms are in our{" "}
              <Link
                href="/legal/refunds"
                className="text-house-tide underline underline-offset-4"
              >
                Cancellation &amp; Refund Policy
              </Link>
              .
            </p>
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}

/**
 * The three packages, each a way out to the shop.
 *
 * Real links rather than buttons that navigate: the reader can see where
 * each one goes, open it in a tab of their own choosing, and a screen
 * reader announces it as leaving the page. Where no shop is configured a
 * row points at the contact section instead, so nothing here is ever dead.
 */
function PackageList() {
  const dispatch = useAppDispatch();
  // The shop opens in a new tab; closing the dialog behind it means the
  // reader comes back to the page they left, not to a half-finished choice.
  const close = () => dispatch(bookingDialogClosed());

  return (
    <ul className="flex flex-col gap-3">
      {PACKAGES.map((entry) => {
        const href = bookingUrl(entry.slug);
        const row = cn(
          "group border-border flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border p-5 text-left",
          "transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
          focusRing,
        );
        const content = (
          <>
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
            <span className="flex shrink-0 items-center gap-4">
              <span className="text-right">
                <span className="text-muted-foreground block font-mono text-label tracking-[0.18em] uppercase">
                  From
                </span>
                <span className="font-display block text-lg">
                  €{formatPrice(entry.rates.from)}
                </span>
                <span className="text-muted-foreground block text-xs">
                  / {perLabel(entry)}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="text-muted-foreground size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
            </span>
          </>
        );

        return (
          <li key={entry.slug}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={row}
                onClick={close}
              >
                {content}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link href={CONTACT_HREF} className={row} onClick={close}>
                {content}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
