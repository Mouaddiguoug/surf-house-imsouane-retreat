"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import * as React from "react";

import { PLATFORMS, type Review } from "@/features/reviews/data/reviews";

type ReviewTrackProps = {
  reviews: Review[];
  labels: {
    region: string;
    previous: string;
    next: string;
    from: string;
    newTab: string;
  };
};

/**
 * The guests' words as one sideways track, after Eagle's Nest's "What
 * people say": each quote set large, divided from the next by a hairline,
 * the name and score at its foot. Both edges fade into the page, so the
 * track reads as running on past the screen.
 *
 * It is an ordinary scroller (swipe, trackpad, shift-wheel, keyboard once
 * focused) with snap points, plus two buttons that step one quote at a
 * time. The quotes are verbatim and in the language they were written in,
 * so `lang` stays on each one rather than following the page.
 */
export function ReviewTrack({ reviews, labels }: ReviewTrackProps) {
  const track = React.useRef<HTMLUListElement>(null);
  const [edge, setEdge] = React.useState<"start" | "middle" | "end">("start");

  const sync = React.useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth - 2;
    setEdge(
      el.scrollLeft <= 2 ? "start" : el.scrollLeft >= max ? "end" : "middle",
    );
  }, []);

  React.useEffect(() => {
    const el = track.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const item = el?.querySelector("li");
    if (!el || !item) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollBy({
      left: direction * item.getBoundingClientRect().width,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const button =
    "border-house-ink inline-flex size-12 cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 hover:bg-house-ink hover:text-house-shell disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-house-ink/40 motion-reduce:transition-none";

  return (
    <div>
      <ul
        ref={track}
        tabIndex={0}
        aria-label={labels.region}
        className="review-track focus-visible:ring-house-ink/30 relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:ring-3 focus-visible:outline-none"
      >
        {reviews.map((review) => {
          const platform = PLATFORMS.find((p) => p.name === review.platform);
          return (
            <li
              key={review.name + review.quote.slice(0, 16)}
              className="review-item border-house-ink/25 flex shrink-0 snap-start flex-col border-l px-6 first:border-l-0 sm:px-8"
            >
              <figure className="flex h-full flex-col">
                <blockquote
                  lang="en"
                  className="text-[clamp(1.375rem,2.3vw,2.125rem)] leading-[1.18] font-medium tracking-[-0.025em] text-pretty"
                >
                  {review.quote}
                </blockquote>
                <figcaption className="mt-auto pt-10 text-sm">
                  <span className="text-house-sage block font-semibold">
                    {review.name}
                    {review.origin ? `, ${review.origin}` : ""}
                  </span>
                  <span className="mt-0.5 block">
                    {review.score}/{review.outOf} {labels.from}{" "}
                    {platform ? (
                      <a
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4 hover:no-underline"
                      >
                        {review.platform}
                        <span className="sr-only"> {labels.newTab}</span>
                      </a>
                    ) : (
                      review.platform
                    )}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <div className="page-wrap mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={edge === "start"}
          aria-label={labels.previous}
          className={button}
        >
          <ArrowLeft aria-hidden className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={edge === "end"}
          aria-label={labels.next}
          className={button}
        >
          <ArrowRight aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
}
