"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { bookingUrl } from "@/features/booking/bookinglayer";
import { bookingDialogOpened } from "@/features/booking/bookingSlice";
import { contactHref } from "@/lib/constants/nav";
import { useLocale } from "@/lib/i18n/use-locale";
import { useAppDispatch } from "@/store/hooks";
import { cn } from "@/lib/utils/cn";

/**
 * The element that last opened the booking dialog, so the dialog can hand
 * focus back to it on close the way a native trigger would. A module
 * variable rather than store state: it is a DOM node, and there is only
 * ever one dialog to return to.
 */
let lastOpener: HTMLElement | null = null;

/** Called by the dialog on close. Falls back to the default when the opener is gone (a drawer button, say). */
export function takeBookingOpener(): HTMLElement | true {
  const el = lastOpener;
  lastOpener = null;
  return el?.isConnected ? el : true;
}

type BookButtonProps = Omit<React.ComponentProps<typeof Button>, "type"> & {
  children?: React.ReactNode;
  /**
   * The package this button sells, where it sells one. A button on a package
   * page already knows the answer, so it goes straight to that package in
   * the shop; one in the navbar or the footer has no package in mind and
   * opens the dialog on the choice.
   */
  packageSlug?: string;
};

/**
 * A "Book" call to action.
 *
 * Every one on the site is this component, so they all do the same thing:
 * open the booking dialog in place, on whatever page the reader is on,
 * rather than scrolling them off to a section first. Pass `packageSlug` and
 * there is nothing left to ask, so it is a link instead: straight to that
 * package in the Bookinglayer shop, in a new tab, with the arrow that says
 * the reader is leaving the site. Clay by default — it is the one action
 * that should never recede — and the caller passes only the size classes
 * and the label.
 */
export function BookButton({
  variant = "clay",
  className,
  onClick,
  children = "Book a stay",
  packageSlug,
  ...props
}: BookButtonProps) {
  const dispatch = useAppDispatch();
  const locale = useLocale();

  if (packageSlug) {
    const href = bookingUrl(packageSlug);
    const classes = cn(
      buttonVariants({ variant }),
      "cursor-pointer gap-2",
      className,
    );

    // No shop configured: send the reader to a person rather than a dead
    // link. The label stays the same — the house will book it by hand.
    if (!href) {
      return (
        <Link href={contactHref(locale)} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <ArrowUpRight aria-hidden className="size-4" />
        <span className="sr-only">
          {locale === "fr"
            ? " (s'ouvre dans un nouvel onglet)"
            : " (opens in a new tab)"}
        </span>
      </a>
    );
  }

  return (
    <Button
      type="button"
      variant={variant}
      aria-haspopup="dialog"
      className={cn("cursor-pointer", className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        lastOpener = event.currentTarget;
        dispatch(bookingDialogOpened());
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
