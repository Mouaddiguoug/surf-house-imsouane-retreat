import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type Frame = { src: string; alt: string };

const sectionVariants = cva("", {
  variants: {
    tone: {
      cream: "bg-background",
      sand: "bg-house-sand text-house-ink",
    },
    layout: {
      // The pictures sit in the page's column, framed, with the section's
      // padding around everything.
      framed: "px-6 py-20 sm:px-10 sm:py-28",
      // The pictures run the full height of the section and out to the edge
      // of the viewport; only the copy is padded.
      bleed: "",
    },
  },
  defaultVariants: { tone: "cream", layout: "framed" },
});

type PackageFeatureProps = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /**
   * One landscape frame, or two portrait frames side by side. Two tall frames
   * together take the same footprint as one wide one, so the column stays
   * the same shape whichever a section has.
   */
  frames: [Frame] | [Frame, Frame];
  /** Which side the picture takes on `lg`. Alternate down the page. */
  side?: "left" | "right";
} & VariantProps<typeof sectionVariants>;

/** A picture column that is as tall as the section and touches its edge. */
function BleedFrames({
  frames,
  side,
}: {
  frames: [Frame] | [Frame, Frame];
  side: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4",
        frames.length === 2 && "grid-cols-2",
        side === "right" ? "lg:order-2" : "lg:order-1",
      )}
    >
      {frames.map((frame) => (
        // Below `lg` there is no copy beside the frames to give them a
        // height, so the ratio does it; from `lg` the row does, and the
        // ratio is released so the frame can fill it.
        <div
          key={frame.src}
          className={cn(
            "relative w-full overflow-hidden",
            frames.length === 2 ? "aspect-2/3" : "aspect-4/3",
            "lg:aspect-auto lg:h-full lg:min-h-[36rem]",
          )}
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            sizes={
              frames.length === 2
                ? "(min-width: 1024px) 25vw, 50vw"
                : "(min-width: 1024px) 50vw, 100vw"
            }
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * One thing the package comes with, given a section of its own.
 *
 * These were three cards in a row, each with an icon and two lines, and each
 * of the three deserves more than that — the yoga is half the day, the food
 * is the whole week, the village is the reason it is this house and not a
 * school on the beach. A section apiece gives each one a photograph and room
 * to say what it actually is.
 *
 * The picture alternates sides down the page so three of these in a row do
 * not read as a template repeating, and the copy column is kept to a
 * readable measure rather than stretched to meet the frame.
 *
 * `layout="bleed"` is the other way to hold a picture: the frames take the
 * whole height of the section and run to the edge of the viewport, square,
 * with the copy centred beside them. It is the right call when the frames
 * are tall — a portrait pair at full height is a different thing from the
 * same pair sitting in a rounded box — and the wrong one for a single
 * landscape, which would be cropped to a sliver to reach the height.
 */
export function PackageFeature({
  id,
  eyebrow,
  title,
  body,
  frames,
  side = "left",
  tone,
  layout,
}: PackageFeatureProps) {
  const copy = (
    <div
      className={cn("max-w-xl", side === "right" ? "lg:order-1" : "lg:order-2")}
    >
      <p className="text-house-clay font-mono text-xs tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display mt-4 text-3xl leading-[1.1] text-balance sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-relaxed text-pretty">{body}</p>
    </div>
  );

  if (layout === "bleed") {
    return (
      <section id={id} className={sectionVariants({ tone, layout })}>
        <div className="grid lg:grid-cols-2">
          <BleedFrames frames={frames} side={side} />
          {/* The copy keeps the page's own padding and column, and centres
              on the height the frames set. */}
          <div
            className={cn(
              "flex items-center px-6 py-16 sm:px-10 sm:py-24 lg:px-16 xl:px-24",
              side === "right" ? "lg:order-1 lg:justify-end" : "lg:order-2",
            )}
          >
            {copy}
          </div>
        </div>
      </section>
    );
  }

  const pictures = (
    <div
      className={cn(
        "grid gap-4",
        frames.length === 2 && "grid-cols-2",
        side === "right" ? "lg:order-2" : "lg:order-1",
      )}
    >
      {frames.map((frame) => (
        <div
          key={frame.src}
          className={cn(
            "shadow-photo relative w-full overflow-hidden rounded-3xl",
            frames.length === 2 ? "aspect-2/3" : "aspect-4/3",
          )}
        >
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            sizes={
              frames.length === 2
                ? "(min-width: 1024px) 22vw, 45vw"
                : "(min-width: 1024px) 45vw, 100vw"
            }
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section id={id} className={sectionVariants({ tone })}>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {pictures}
        {copy}
      </div>
    </section>
  );
}
