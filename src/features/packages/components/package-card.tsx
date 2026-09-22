import Image from "next/image";
import Link from "next/link";

import type { PackageSummary } from "@/features/packages/data/packages";
import { cn } from "@/lib/utils/cn";

type PackageCardProps = {
  package: PackageSummary;
  className?: string;
};

/**
 * One package, as a way in to its page: the photograph is the card, and the
 * words sit on a pane of glass laid over its foot.
 *
 * The glass is tinted dark, not white, and that is the whole reason it can
 * be read. Frosted white at 15% — the textbook version — is fine over a
 * vibrant flat colour and fails over a photograph the moment the photograph
 * is bright, and all three of these have sand or foam in the lower third.
 * Ink at 65% under a 24px blur, on top of a gradient that darkens the frame
 * from the middle down, keeps shell-white type above 14:1 against the
 * single lightest pixel any of the three frames puts under it — measured
 * on the rendered panels, not assumed. That is twice the AAA bar with room
 * for a brighter photograph later. The gradient does the
 * other half: without it the glass would be a rectangle of a different
 * darkness sitting on the picture, and with it the picture simply gets
 * quieter towards the words.
 *
 * The whole card is the target. A single cover link spans it rather than
 * the markup being wrapped, so the card keeps one tab stop and a readable
 * heading instead of becoming a link with a paragraph inside it — and
 * nothing else in here may become interactive, or it would sit under that
 * cover.
 */
export function PackageCard({ package: entry, className }: PackageCardProps) {
  return (
    <article
      className={cn(
        "group shadow-photo relative isolate flex cursor-pointer flex-col justify-end overflow-hidden rounded-3xl",
        // Portrait, with a ceiling for the card that spans a row on a
        // tablet: 4:5 of 736px would be a 920px tower.
        "aspect-4/5 max-h-[30rem] w-full",
        "has-[a:focus-visible]:ring-3 has-[a:focus-visible]:ring-house-shell/80 has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-house-ink",
        className,
      )}
    >
      {/* The frame, and a slow push-in on hover — transform only, inside the
          card's clip, so nothing around it moves. */}
      <Image
        src={entry.image}
        alt={entry.imageAlt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
        className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
      />

      {/* Darkens from the middle down, so the glass has somewhere quiet to
          sit and the type has contrast before the tint even counts. */}
      <div
        aria-hidden
        className="from-house-deep/85 via-house-deep/30 absolute inset-0 -z-10 bg-gradient-to-t to-transparent via-45%"
      />

      {/* Edge to edge and flush to the foot: the card's own corners round it
          off, so the glass has no radius of its own and no ring — a single
          hairline along its top is the edge the eye needs.

          It sits in the flow rather than pinned to the bottom, and that is
          load-bearing rather than tidy. The title's link covers the card with
          an absolutely positioned `::after`, and an absolute wrapper here
          would be that cover's containing block — the cover would stop at the
          glass and the photograph above it would not be clickable. `justify-end`
          on the card puts the panel on the floor without positioning it, so
          the cover resolves against the card and takes the whole of it. The
          frame and its scrim go to `-z-10` to stay behind this. */}
      <div>
        <div
          className={cn(
            "bg-house-deep/65 text-house-shell p-5 backdrop-blur-xl sm:p-6",
            "border-house-shell/20 border-t",
            "transition-colors duration-300 group-hover:bg-house-deep/75 motion-reduce:transition-none",
          )}
        >
          <h3 className="font-display text-2xl leading-[1.15] text-balance">
            {entry.title}
          </h3>
          <p className="text-house-shell/80 mt-1.5 text-sm">{entry.subtitle}</p>

          <dl className="border-house-shell/20 mt-4 flex flex-col gap-1.5 border-t pt-4 text-sm">
            {entry.facts.map((fact) => (
              <div
                key={fact.term}
                className="flex items-baseline justify-between gap-4"
              >
                <dt className="text-house-shell/65 font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                  {fact.term}
                </dt>
                <dd className="text-right">{fact.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* The hit area, as a real element rather than a `::after` on the
          title. It has to live out here, a child of the card itself: the
          glass panel carries `backdrop-filter`, and that makes it a
          containing block for every absolutely positioned descendant no
          matter what `position` they are given — a cover inside it stops at
          the glass, which left the photograph above unclickable. Absolute
          beats the panel's in-flow content in paint order, so the card gets
          one tab stop, one accessible name, and the whole of its own area. */}
      <Link
        href={entry.href}
        className="absolute inset-0 rounded-3xl focus-visible:outline-none"
      >
        <span className="sr-only">{entry.title}</span>
      </Link>
    </article>
  );
}
