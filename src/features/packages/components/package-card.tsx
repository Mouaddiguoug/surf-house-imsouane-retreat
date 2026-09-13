import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import type { PackageSummary } from "@/features/packages/data/packages";
import { cn } from "@/lib/utils/cn";

/**
 * One package, as a way in to its page.
 *
 * The whole card is the target. The link covers it with a pseudo-element
 * rather than wrapping the markup, so the card keeps one tab stop and a
 * readable heading instead of becoming a link with a paragraph inside it —
 * and nothing else in here may become interactive, or it would sit under that
 * cover.
 *
 * `ground` is the card's own surface, not the section's. A light card has to
 * be the opposite light of whatever it sits on — shell on sand, sand on
 * shell — or it disappears into it, which is why the section passes this down
 * rather than the card deciding for itself. Ink is the exception: the
 * specialist week carries it on either ground.
 */
const cardVariants = cva(
  cn(
    "group shadow-card relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border",
    "transition-colors duration-200 motion-reduce:transition-none",
    "has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-ring/50",
  ),
  {
    variants: {
      ground: {
        shell:
          "bg-house-shell border-house-ink/10 text-house-ink hover:bg-house-sand",
        sand: "bg-house-sand border-house-ink/10 text-house-ink hover:bg-house-shell",
        ink: "bg-house-ink border-house-sand/15 text-house-sand hover:bg-house-deep",
      },
    },
    defaultVariants: { ground: "shell" },
  },
);

const quietVariants = cva("", {
  variants: {
    ground: {
      shell: "text-house-muted",
      sand: "text-house-muted",
      ink: "text-house-sand/70",
    },
  },
  defaultVariants: { ground: "shell" },
});

const ruleVariants = cva("", {
  variants: {
    ground: {
      shell: "border-house-ink/10",
      sand: "border-house-ink/10",
      ink: "border-house-sand/15",
    },
  },
  defaultVariants: { ground: "shell" },
});

type PackageCardProps = {
  package: PackageSummary;
  className?: string;
} & VariantProps<typeof cardVariants>;

export function PackageCard({
  package: entry,
  ground,
  className,
}: PackageCardProps) {
  // The ink week keeps its own ground wherever it is placed.
  const surface = entry.invert ? "ink" : (ground ?? "shell");

  return (
    <article className={cn(cardVariants({ ground: surface }), className)}>
      {/* Full bleed to the card's own corners rather than inset with a second
          radius inside the first: the card clips it, so the picture takes the
          top two corners and nothing else has to know about them. The same
          frame opens the page this card leads to, so the picture on the card
          is the picture you land on.

          The ceiling is for the width this card is allowed to reach: three up
          it is a 3:2 frame about 250px tall, but the card that spans the row
          on a tablet would take the same ratio to nearly 500px and tower over
          the two above it. Past that width the frame crops to a letterbox
          rather than growing. */}
      <div className="relative aspect-3/2 max-h-72 w-full overflow-hidden">
        <Image
          src={entry.image}
          alt={entry.imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {/* The link is on the title and the card is its hit area: the
            pseudo-element below stretches over the whole article, so there is
            one tab stop, the accessible name is the package, and no second
            row of link text is needed to make the card work. Nothing else in
            here may become interactive, or it would sit under that cover.

            No top margin — the title is the first thing in the box, so it sits
            on the padding like the other three sides. */}
        <h3 className="font-display text-2xl leading-[1.15] text-balance">
          <Link
            href={entry.href}
            className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none"
          >
            {entry.title}
          </Link>
        </h3>

        {/* The gap belongs to the subtitle rather than to `mt-auto`. With the
            call to action gone there is no slack left for `mt-auto` to hand
            out, so the rule below collapses onto this line and reads as an
            underline of it instead of a divider above the facts. */}
        <p
          className={cn(
            quietVariants({ ground: surface }),
            "mt-2 mb-6 text-sm",
          )}
        >
          {entry.subtitle}
        </p>

        {/* `mt-auto` so the facts sit on the card's floor: when one card's
            subtitle wraps and its neighbours' do not, the three tables still
            line up row for row. */}
        <dl
          className={cn(
            ruleVariants({ ground: surface }),
            "mt-auto flex flex-col gap-2 border-t pt-5 text-sm",
          )}
        >
          {entry.facts.map((fact) => (
            <div
              key={fact.term}
              className="flex items-baseline justify-between gap-4"
            >
              <dt
                className={cn(
                  quietVariants({ ground: surface }),
                  "font-mono text-[0.65rem] tracking-[0.18em] uppercase",
                )}
              >
                {fact.term}
              </dt>
              <dd className="text-right">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
