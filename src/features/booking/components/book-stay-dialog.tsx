"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { ExternalLink, LoaderCircle, X } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  bookingDialogClosed,
  bookingDialogOpened,
} from "@/features/booking/bookingSlice";
import {
  CLOUDBEDS_IMMERSIVE_CSS,
  CLOUDBEDS_IMMERSIVE_SCRIPT_URL,
  CLOUDBEDS_IMMERSIVE_TAG,
  bookingEngineUrl,
} from "@/features/booking/cloudbeds";
import { takeBookingOpener } from "@/features/booking/components/book-button";
import { CLOUDBEDS_PROPERTY_CODE } from "@/lib/constants/env";
import { CONTACT_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type ScriptState = "idle" | "loading" | "ready" | "failed";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

const SLOW_AFTER_MS = 8000;

/**
 * The booking dialog: the Cloudbeds booking engine, taking over the screen.
 *
 * Mounted once, in the root layout, and opened from the store by any
 * `BookButton` on any page — it has no trigger of its own. On close, focus
 * goes back to whichever button opened it.
 *
 * It fills the viewport rather than sitting in a centred panel, and that is
 * the engine's requirement rather than a taste: standard mode sizes itself in
 * `dvh` and hangs its date picker off the end of `<body>` in a fixed-position
 * portal, so anything short of the whole viewport leaves the picker measuring
 * one box and the reader looking at another. See `CLOUDBEDS_IMMERSIVE_CSS`.
 *
 * The engine's script is ~a page's worth of JavaScript, so it is only
 * requested the first time the dialog opens; until it reports ready the body
 * shows a spinner at full height, so the panel never jumps when the engine
 * lands. Outside presses do not dismiss: the flow inside has date pickers and
 * a payment step, and a stray click should not throw a half-made booking
 * away. Escape still closes, except while focus is inside the engine, where
 * it belongs to whatever picker is open in there.
 */
export function BookStayDialog() {
  const open = useAppSelector((state) => state.booking.dialogOpen);
  const dispatch = useAppDispatch();
  const setOpen = React.useCallback(
    (next: boolean) =>
      dispatch(next ? bookingDialogOpened() : bookingDialogClosed()),
    [dispatch],
  );
  // True once the dialog has been opened at all — the gate on the script tag.
  const [engaged, setEngaged] = React.useState(false);
  const [script, setScript] = React.useState<ScriptState>("idle");
  // The engine is 1.3 MB from a CDN and has been seen to stall; past this
  // point the spinner gets a way out alongside it.
  const [slow, setSlow] = React.useState(false);
  const engineRef = React.useRef<HTMLElement | null>(null);

  // The script tag is gated on the first open, whichever button does it.
  // Adjusted during render rather than in an effect: the store flips `open`
  // from outside, so there is no event handler here to hang it on, and React
  // re-runs the render immediately with the new state.
  if (open && !engaged) {
    setEngaged(true);
    // Already registered (a hot reload): skip the spinner. `onReady` still
    // fires, harmlessly, on the script below.
    setScript(
      customElements.get(CLOUDBEDS_IMMERSIVE_TAG) ? "ready" : "loading",
    );
  }

  React.useEffect(() => {
    if (script !== "loading") return;
    const timer = window.setTimeout(() => setSlow(true), SLOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [script]);

  const propertyCode = CLOUDBEDS_PROPERTY_CODE;

  function handleOpenChange(
    next: boolean,
    details: DialogPrimitive.Root.ChangeEventDetails,
  ) {
    if (
      !next &&
      details.reason === "escape-key" &&
      engineRef.current?.contains(document.activeElement)
    ) {
      details.cancel();
      return;
    }
    setOpen(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange} disablePointerDismissal>
      {engaged && propertyCode && (
        <>
          <Script
            src={CLOUDBEDS_IMMERSIVE_SCRIPT_URL}
            strategy="afterInteractive"
            onReady={() => setScript("ready")}
            onError={() => setScript("failed")}
          />
          {/* Cloudbeds' documented hook for styling the embed from the host
              page. It ships with the engine rather than from the global
              stylesheet, so nothing is sent to a reader who never books. */}
          <style data-cb-immersive-experience-root="">
            {CLOUDBEDS_IMMERSIVE_CSS}
          </style>
        </>
      )}

      <DialogPortal>
        <DialogOverlay className="bg-house-deep/55 duration-300 motion-reduce:animate-none" />
        <DialogPrimitive.Popup
          data-slot="book-stay-popup"
          finalFocus={takeBookingOpener}
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-background text-foreground outline-none",
            "duration-300 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-4 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-4",
            "motion-reduce:animate-none",
          )}
        >
          {/* Nothing of ours sits in the flow above the engine: every pixel
              of chrome here pushes its search card further down the viewport,
              and the date picker measures its room from there. So the title is
              read rather than drawn, and the close floats over the engine's own
              header — which the engine stylesheet pads to keep its language and
              currency controls out from under it. */}
          <DialogTitle className="sr-only">Book a stay</DialogTitle>
          <DialogDescription className="sr-only">
            Live availability and secure payment.
          </DialogDescription>

          <DialogClose
            aria-label="Close booking"
            className={cn(
              "absolute top-3 right-3 z-20 inline-flex size-11 cursor-pointer items-center justify-center rounded-xl",
              "bg-background/85 shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm",
              "transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
              focusRing,
            )}
          >
            <X aria-hidden className="size-5" />
          </DialogClose>

          {/* The engine sets its own heights; this is the one scroll
              container so the page underneath stays locked while the panel
              scrolls. */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
            {!propertyCode ? (
              <Notice
                title="Online booking is almost ready"
                body="We are finishing the set-up of our booking calendar. In the meantime, write to us with your dates and we will hold the room by hand."
              >
                <Link
                  href={CONTACT_HREF}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "clay" }),
                    "h-12 px-6 text-xs",
                  )}
                >
                  Get in touch
                </Link>
              </Notice>
            ) : script === "failed" ? (
              <Notice
                title="The booking calendar did not load"
                body="Something between here and Cloudbeds is not answering. The same calendar is open on their site, and a booking made there is exactly the same booking."
              >
                <a
                  href={bookingEngineUrl(propertyCode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "clay" }),
                    "h-12 gap-2 px-6 text-xs has-data-[icon=inline-end]:pr-5",
                  )}
                >
                  Book on Cloudbeds
                  <ExternalLink aria-hidden data-icon="inline-end" />
                </a>
              </Notice>
            ) : (
              <>
                {script !== "ready" && (
                  <div
                    role="status"
                    className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center"
                  >
                    <LoaderCircle
                      aria-hidden
                      className="text-house-tide size-6 animate-spin motion-reduce:animate-none"
                    />
                    <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                      Loading live availability
                    </p>
                    {slow && (
                      <p className="text-muted-foreground mt-2 text-sm">
                        Taking longer than usual.{" "}
                        <a
                          href={bookingEngineUrl(propertyCode)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "text-house-tide inline-flex items-center gap-1 rounded-sm underline underline-offset-4",
                            "transition-colors duration-200 hover:text-foreground",
                            focusRing,
                          )}
                        >
                          Book on Cloudbeds instead
                          <ExternalLink aria-hidden className="size-3.5" />
                        </a>
                      </p>
                    )}
                  </div>
                )}
                {script === "ready" && (
                  <cb-immersive-experience
                    ref={engineRef}
                    mode="standard"
                    property-code={propertyCode}
                    hide-custom-header="yes"
                    hide-custom-footer="yes"
                    className="block w-full"
                  />
                )}
              </>
            )}
          </div>
        </DialogPrimitive.Popup>
      </DialogPortal>
    </Dialog>
  );
}

/** The dialog body when there is no engine to show — one message, one way out. */
function Notice({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center p-6 sm:p-10">
      <div className="flex max-w-md flex-col items-start">
        <h3 className="font-display text-2xl leading-[1.1] text-balance sm:text-3xl">
          {title}
        </h3>
        <p className="text-muted-foreground mt-3 text-base leading-relaxed text-pretty">
          {body}
        </p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
