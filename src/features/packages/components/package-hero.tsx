import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

import type { PackageSummary } from "@/features/packages/data/packages";
import { cn } from "@/lib/utils/cn";

/**
 * The opening of a package page: the photograph, dissolved into the page.
 *
 * Not a banner with a hard edge and not a full-bleed hero with copy fighting
 * a scrim. The frame runs from the top of the page and fades into the
 * section's own ground on the way down, so there is no line where the picture
 * stops — by the time the title arrives the backdrop is the page colour and
 * the type needs no shadow to survive on it.
 *
 * `tone` is that ground, and it has to match the section itself or the fade
 * lands on the wrong colour and leaves a seam. The eyebrow takes clay on the
 * light grounds and sky on ink, the pairing every other section uses.
 */
const heroVariants = cva("relative overflow-hidden px-6 sm:px-10", {
  variants: {
    tone: {
      cream: "bg-background",
      sand: "bg-house-sand text-house-ink",
      ink: "bg-house-ink text-house-sand",
    },
  },
  defaultVariants: { tone: "cream" },
});

/** Clear at the top, the page's own colour by the foot of the frame. */
const fadeVariants = cva("absolute inset-0", {
  variants: {
    tone: {
      cream:
        "bg-gradient-to-b from-transparent via-background/55 via-55% to-background",
      sand: "bg-gradient-to-b from-transparent via-house-sand/55 via-55% to-house-sand",
      ink: "bg-gradient-to-b from-transparent via-house-ink/55 via-55% to-house-ink",
    },
  },
  defaultVariants: { tone: "cream" },
});

const eyebrowVariants = cva("font-mono text-xs tracking-[0.18em] uppercase", {
  variants: {
    tone: {
      cream: "text-house-clay",
      sand: "text-house-clay",
      ink: "text-house-sky",
    },
  },
  defaultVariants: { tone: "cream" },
});

const quietVariants = cva("", {
  variants: {
    tone: {
      cream: "text-muted-foreground",
      sand: "text-house-muted",
      ink: "text-house-sand/70",
    },
  },
  defaultVariants: { tone: "cream" },
});

const ruleVariants = cva("", {
  variants: {
    tone: {
      cream: "border-border",
      sand: "border-house-ink/15",
      ink: "border-house-sand/15",
    },
  },
  defaultVariants: { tone: "cream" },
});

type PackageHeroProps = {
  package: PackageSummary;
  /** The section id, kept from when each package was a section of the home page. */
  id: string;
  /** The paragraph under the title. */
  lede: string;
  /** Anything that belongs between the lede and the facts — the goal chips. */
  children?: React.ReactNode;
} & VariantProps<typeof heroVariants>;

export function PackageHero({
  package: entry,
  id,
  lede,
  tone,
  children,
}: PackageHeroProps) {
  return (
    <section id={id} className={cn(heroVariants({ tone }), "pb-20 sm:pb-28")}>
      {/* The frame and its fade are one layer, pinned to the top of the
          section. The navbar is solid on these routes and sits over the first
          80px of it, which is why the picture is given more height than the
          copy needs to clear. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[min(62dvh,30rem)]"
      >
        <Image
          src={entry.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className={fadeVariants({ tone })} />
      </div>

      {/* Starts far enough down that the title lands where the frame has
          already become the page. */}
      <div className="relative mx-auto w-full max-w-6xl pt-[min(40dvh,19rem)]">
       

        <h1 className="font-display mt-4 text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
          {entry.title}
        </h1>

        <p
          className={cn(
            quietVariants({ tone }),
            "font-display mt-3 text-lg sm:text-xl",
          )}
        >
          {entry.subtitle}
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty">
          {lede}
        </p>

        {children}

        <dl
          className={cn(
            ruleVariants({ tone }),
            "mt-10 grid grid-cols-3 gap-4 border-t pt-6 sm:max-w-2xl",
          )}
        >
          {entry.facts.map((fact) => (
            <div key={fact.term}>
              <dt
                className={cn(
                  quietVariants({ tone }),
                  "font-mono text-[0.65rem] tracking-[0.18em] uppercase",
                )}
              >
                {fact.term}
              </dt>
              <dd className="mt-1 text-sm">{fact.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
