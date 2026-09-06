"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { bookingDialogOpened } from "@/features/booking/bookingSlice";
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
};

/**
 * A "Book" call to action.
 *
 * Every one on the site is this component, so they all do the same thing:
 * open the booking dialog in place, on whatever page the reader is on,
 * rather than scrolling them off to a section first. Clay by default — it is
 * the one action that should never recede — and the caller passes only the
 * size classes and the label.
 */
export function BookButton({
  variant = "clay",
  className,
  onClick,
  children = "Book a stay",
  ...props
}: BookButtonProps) {
  const dispatch = useAppDispatch();

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
