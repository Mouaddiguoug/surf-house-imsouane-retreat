"use client";

import * as React from "react";

import { cn } from "@/lib/utils/cn";

export type HeroVideoSource = {
  /** Path under `public`, e.g. `/assets/hero-1080.mp4`. */
  src: string;
  /** With codecs, so a browser that cannot decode it skips it unfetched. */
  type: string;
  /** Matched once, when the element loads; it does not swap on resize. */
  media?: string;
};

type HeroVideoProps = {
  /**
   * In order of preference. The browser plays the first one whose `media`
   * matches and whose `type` it can decode, so the smaller AV1 file goes
   * ahead of its H.264 fallback, and the phone crop ahead of the wide one.
   */
  sources: HeroVideoSource[];
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
 *
 * It also stops once the page has covered it. The hero it sits in is pinned to
 * the top of the viewport, so scrolling never takes it out of view the way it
 * would an ordinary hero — as far as the browser is concerned the video is
 * always on screen, and it goes on decoding every frame for the whole length
 * of the page. A screen of scroll is the cue that there is nothing left to
 * see.
 */
export function HeroVideo({ sources, poster, className }: HeroVideoProps) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");

    // What the video was last told to do. `scroll` fires far more often than
    // the answer changes, and re-issuing `play()` on a playing video is work
    // for nothing.
    let applied: "still" | "covered" | "playing" | null = null;

    const sync = () => {
      const next = query.matches
        ? "still"
        : window.scrollY > window.innerHeight
          ? "covered"
          : "playing";
      if (next === applied) return;
      applied = next;

      if (next === "still") {
        video.pause();
        video.currentTime = 0;
        return;
      }
      if (next === "covered") {
        video.pause();
        return;
      }
      video.muted = true;
      // Autoplay can still be refused (low power mode, data saver). The poster
      // stays up in that case, which is a perfectly good hero.
      void video.play().catch(() => {});
    };

    sync();
    query.addEventListener("change", sync);
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      query.removeEventListener("change", sync);
      window.removeEventListener("scroll", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      tabIndex={-1}
      className={cn("size-full object-cover", className)}
    >
      {sources.map((source) => (
        <source key={source.src} {...source} />
      ))}
    </video>
  );
}
