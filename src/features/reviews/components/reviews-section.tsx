import { Star, StarHalf } from "lucide-react";

import {
  PLATFORMS,
  REVIEWS_ROW_ONE,
  REVIEWS_ROW_TWO,
  type Review,
} from "@/features/reviews/data/reviews";
import { cn } from "@/lib/utils/cn";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

/** Five stars, with a half where a 9/10 earns one. Decorative: the text beside them carries the score. */
function Stars({ score, outOf }: Pick<Review, "score" | "outOf">) {
  const onFive = (score / outOf) * 5;
  const full = Math.floor(onFive);
  const half = onFive - full >= 0.5;
  return (
    <span aria-hidden className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => {
        const filled = i < full;
        const isHalf = !filled && half && i === full;
        return (
          <span key={i} className="relative size-4">
            <Star
              className={cn(
                "text-house-clay absolute inset-0 size-4",
                filled && "fill-house-clay",
              )}
              strokeWidth={filled ? 0 : 1.75}
            />
            {isHalf && (
              <StarHalf
                className="text-house-clay fill-house-clay absolute inset-0 size-4"
                strokeWidth={0}
              />
            )}
          </span>
        );
      })}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const { name, origin, platform, score, outOf, quote } = review;
  return (
    <li className="border-house-ink/10 bg-house-shell text-house-ink shadow-card flex w-[19rem] shrink-0 flex-col gap-4 rounded-2xl border p-6 sm:w-[22rem]">
      <div className="flex items-center gap-2">
        <Stars score={score} outOf={outOf} />
        <span className="text-house-muted font-mono text-[0.65rem] tracking-[0.12em]">
          {score} / {outOf}
        </span>
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-pretty">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {/* An initial, not a photograph: the platforms show avatars but
            reusing them is not ours to do, and a letter reads honestly. */}
        <span
          aria-hidden
          className="bg-house-sand font-display flex size-9 shrink-0 items-center justify-center rounded-full text-sm"
        >
          {name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium">{name}</span>
          <span className="text-house-muted block truncate text-xs">
            {origin ? `${origin} · ` : ""}on {platform}
          </span>
        </span>
      </figcaption>
    </li>
  );
}

/**
 * One drifting row. The list is rendered twice so the loop is seamless:
 * the animation moves it exactly half its width, which — with the trailing
 * padding matching the gap — lands on the second copy's first card. The
 * copy is hidden from assistive tech, and from everyone when motion is
 * reduced, where the row becomes a plain horizontal scroll instead.
 */
function Marquee({
  reviews,
  reverse = false,
}: {
  reviews: Review[];
  reverse?: boolean;
}) {
  return (
    <div className="group/marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
      {[false, true].map((copy) => (
        <ul
          key={String(copy)}
          aria-hidden={copy || undefined}
          className={cn(
            "flex shrink-0 gap-5 pr-5",
            reverse ? "animate-marquee-reverse" : "animate-marquee",
            "group-hover/marquee:[animation-play-state:paused]",
            "motion-reduce:animate-none",
            copy && "motion-reduce:hidden",
          )}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.name + review.platform} review={review} />
          ))}
        </ul>
      ))}
    </div>
  );
}

/**
 * What guests say.
 *
 * Cream, between the sand of the Custom Retreat and the ink of the booking
 * section — the proof sits right before the reader is asked to book. Two
 * rows drifting in opposite directions, past the edges of the measure like
 * a wall of postcards, because eighteen reviews in a grid would read as a
 * spreadsheet. The scores are quoted on the platform's own scale, and the
 * strip under the heading links to where every one of them can be checked.
 */
export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="border-border bg-background border-t overflow-hidden py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 text-center sm:px-10">
        
        <h2 className="font-display mt-4 text-3xl leading-[1.1] text-balance sm:text-4xl lg:text-5xl">
          What guests say
        </h2>
        <p className="text-muted-foreground font-display mx-auto mt-3 max-w-2xl text-lg sm:text-xl">
          Real reviews from the platforms, unedited. The names are first names,
          and every score is on the site&apos;s own scale.
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {PLATFORMS.map((p) => (
            <li key={p.name}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group/platform -mx-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2",
                  "transition-colors duration-200 hover:text-house-tide motion-reduce:transition-none",
                  focusRing,
                )}
              >
                <Star
                  aria-hidden
                  className="text-house-clay fill-house-clay size-4"
                />
                <span className="font-display text-lg">{p.score}</span>
                <span className="text-house-muted text-sm">
                  on {p.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex flex-col gap-5 sm:mt-14">
        <Marquee reviews={REVIEWS_ROW_ONE} />
        <Marquee reviews={REVIEWS_ROW_TWO} reverse />
      </div>
    </section>
  );
}
