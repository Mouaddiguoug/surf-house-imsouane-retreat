"use client";

import * as React from "react";

import { cn } from "@/lib/utils/cn";

type HeroVideoProps = {
  /** Path under `public`, e.g. `/assets/background_hero.mp4`. */
  src: string;
  /** Still frame held before playback starts, and instead of it. */
  poster: string;
  className?: string;
};

/**
 * Decorative background video.
 *
 * Deliberately has no `autoPlay` attribute. The server renders a paused
 * element showing its poster, and playback is started from an effect only once
 * we can read `prefers-reduced-motion` — so a reader who has asked for less
 * motion keeps the still, and everyone else never sees the poster flash to an
 * unplayed frame. `muted` is set on the element as well as through props,
 * because browsers only grant script-initiated autoplay to a muted video.
 *
 * `aria-hidden` and `tabIndex={-1}`: it carries no information and offers no
 * controls, so it should not appear in the accessibility tree or tab order.
 */
export function HeroVideo({ src, poster, className }: HeroVideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      if (query.matches) {
        video.pause();
        video.currentTime = 0;
        return;
      }
      video.muted = true;
      // Autoplay can still be refused (low power mode, data saver). The poster
      // stays up in that case, which is a perfectly good hero.
      void video.play().catch(() => {});
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className={cn("size-full object-cover", className)}
    />
  );
}
