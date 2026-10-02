import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

export type CaptionFact = {
  /** "The waves", "Coach to surfer" — mono, sky, the quiet half of the pair. */
  term: string;
  detail: string;
};

/**
 * The ink strip under a page hero: the three facts a reader wants before the
 * paragraphs, as the photograph's caption.
 *
 * It sits under the frame rather than inside it. On a phone a hero has room
 * for its title, its copy and two buttons; three more rows would push the
 * copy up into the pale sky every one of these photographs has, where no
 * gradient can hold it.
 *
 * Shared because the Imsouane and coaching heroes are one composition — the
 * photo, then its caption — and two copies of the same strip had already
 * begun to drift.
 */
/**
 * The strip takes the ground of the hero above it, so the photograph's
 * gradient runs straight into its caption: ink under Imsouane, deep tide
 * under the coaching page's dawn.
 */
const stripVariants = cva("text-house-sand px-6 sm:px-10", {
  variants: {
    tone: {
      ink: "bg-house-ink",
      tide: "bg-house-tide-deep",
    },
  },
  defaultVariants: { tone: "ink" },
});

export function CaptionStrip({
  facts,
  tone,
  className,
}: {
  facts: readonly CaptionFact[];
  tone?: "ink" | "tide";
  className?: string;
}) {
  return (
    <div className={cn(stripVariants({ tone }), className)}>
      {/* Same measure as the sections below, so the values line up with
          their headings. */}
      <dl className="divide-house-sand/15 mx-auto grid w-full max-w-6xl divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {facts.map((fact) => (
          <div
            key={fact.term}
            className="py-5 sm:px-8 sm:py-6 sm:first:pl-0 sm:last:pr-0"
          >
            <dt className="text-house-sky font-mono text-label tracking-[0.18em] uppercase">
              {fact.term}
            </dt>
            <dd className="font-display mt-1 text-xl leading-tight sm:text-2xl">
              {fact.detail}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
