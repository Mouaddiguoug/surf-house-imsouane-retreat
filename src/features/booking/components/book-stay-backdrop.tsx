"use client";

import Image from "next/image";
import * as React from "react";

import { cn } from "@/lib/utils/cn";

/** How long each photograph holds before the next one begins to arrive. */
const SLIDE_MS = 6000;

/** How long one photograph takes to give way to the next. */
const FADE_MS = 1600;

/** How much of the photograph shows through the section's ink. */
const OPACITY = 0.22;

/**
 * Web-sized copies of the house photographs, 1800px on the long edge. The
 * originals beside them are 6000 × 4000 and 6MB each; asking the image
 * pipeline to decode seven of those on the first visit left the backdrop
 * blank for longer than the first slide is meant to last.
 */
const SLIDES = [1, 2, 3, 4, 5, 6, 7].map((n) => `/assets/book-a-stay/${n}.jpg`);

/**
 * The booking section's backdrop: the house, cycling behind the copy.
 *
 * Held at a fraction of full strength so it reads as a texture on the ink
 * rather than as a photograph — the section still has to carry white type
 * and a payment call to action, and at this opacity the darkest text pairing
 * stays well clear of the contrast floor even where a frame is bright.
 *
 * These are wide interior frames — a room, the living space — so the shape
 * of the container decides whether they read as anything at all. On a wide
 * screen the section is a letterbox and covering it shows most of each
 * photograph. On a phone the section is a tall column, and covering that
 * would crop a 3:2 frame to a fifth of its width: a strip of wall. So on a
 * phone the pictures take a band across the top instead, sized close to
 * their own proportions, and fade into the ink before the copy starts.
 *
 * Only the first slide is in the server-rendered markup. The rest mount
 * after the component does, so the page does not pay for seven photographs
 * before it can paint, and a reader who has asked for less motion keeps the
 * first frame alone and never downloads the other six.
 *
 * None of them is `priority`, the first included. The section sits some
 * 3,000px below the fold, and a preload there is not a head start — it is
 * a 1920px image competing with the hero for the first connection. Lazy
 * loading begins well over a screen before the section arrives, which is
 * more than a cross-fade needs.
 *
 * Decorative throughout: `aria-hidden`, empty alt text, and no pointer
 * events, because every one of these views is described in words elsewhere
 * on the page.
 */
export function BookStayBackdrop({ className }: { className?: string }) {
  const [index, setIndex] = React.useState(0);
  const [cycling, setCycling] = React.useState(false);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCycling(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  React.useEffect(() => {
    if (!cycling) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => window.clearInterval(id);
  }, [cycling]);

  const slides = cycling ? SLIDES : SLIDES.slice(0, 1);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 h-[17rem] overflow-hidden sm:inset-0 sm:h-auto",
        className,
      )}
    >
      {/* The opacity sits on each frame rather than on the container, so the
          mask below can meet the ink at full strength. */}
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          sizes="100vw"
          style={{
            opacity: i === index ? OPACITY : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
          className="object-cover transition-opacity ease-in-out motion-reduce:transition-none"
        />
      ))}

      {/* The foot of the band, on a phone only: the pictures end in the
          section's own ink rather than on a cut line. */}
      <div className="from-house-ink absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent sm:hidden" />
    </div>
  );
}
