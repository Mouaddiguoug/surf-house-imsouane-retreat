import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import {
  formatPrice,
  type PackageSummary,
} from "@/features/packages/data/packages";
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
 * lands on the wrong colour and leaves a seam.
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

/**
 * The quiet partner to the book button. It sits on the page's own ground, not
 * on footage, so it cannot borrow a scrim the way `shellOutline` does: a
 * hairline and a wash one step off the ground instead. On sand the wash is
 * ink, because a sand wash on sand would not show.
 */
const secondaryVariants = cva(
  "h-12 w-full cursor-pointer rounded-xl bg-transparent px-6 font-mono text-xs tracking-[0.14em] uppercase sm:w-auto lg:w-full",
  {
    variants: {
      tone: {
        cream: "border-house-ink/15 text-house-ink hover:bg-house-sand",
        sand: "border-house-ink/15 text-house-ink hover:bg-house-ink/5",
        ink: "border-house-sand/30 text-house-sand hover:bg-house-sand/10",
      },
    },
    defaultVariants: { tone: "cream" },
  },
);

/**
 * The entrance every hero on the site makes: a second-long fade with a short
 * rise, held invisible until its own delay so a late block never flashes
 * before it moves. `fill-mode-both` is the half of that people forget.
 */
const ENTER =
  "animate-in fade-in fill-mode-both duration-1000 motion-reduce:animate-none";

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
        className={cn(
          "absolute inset-x-0 top-0 h-[min(62dvh,30rem)]",
          // Fades up and settles from a hair over size. The fade rides on the
          // same layer, so the two arrive as one picture rather than a
          // gradient landing on a photograph.
          ENTER,
          "zoom-in-105 ease-out",
        )}
      >
        <Image
          src={entry.image}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: entry.imagePosition ?? "50% 50%" }}
          className="object-cover"
        />
        <div className={fadeVariants({ tone })} />
      </div>

      {/* Starts far enough down that the title lands where the frame has
          already become the page. */}
      <div className="relative mx-auto w-full max-w-6xl pt-[min(40dvh,19rem)]">
        <h1
          className={cn(
            "font-display text-4xl leading-[1.05] text-balance sm:text-5xl lg:text-6xl",
            ENTER,
            "slide-in-from-bottom-6",
          )}
        >
          {entry.title}
        </h1>

        <p
          className={cn(
            quietVariants({ tone }),
            "font-display mt-3 text-lg sm:text-xl",
            ENTER,
            "slide-in-from-bottom-4 delay-150",
          )}
        >
          {entry.subtitle}
        </p>

        {/* Two columns from lg, the way the home hero sits along its foot:
            the case for the week on the left, what it costs and the way in
            on the right. The lede stays under the subtitle and only the facts
            drop to meet the buttons, so the two columns close on one line
            without opening a gap above the paragraph. Before this the
            price sat under the lede with nothing after it, so a reader who
            had costed the week out had to scroll the whole page to find the
            button — and the right half of a wide screen stood empty. Below
            lg they stack, facts before price, so the number arrives with the
            button directly under it. */}
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <div className="flex flex-col">
            <p
              className={cn(
                "max-w-xl text-base leading-relaxed text-pretty",
                ENTER,
                "slide-in-from-bottom-4 delay-300",
              )}
            >
              {lede}
            </p>

            {/* Extras and facts arrive together, last: they are the small
                print of the opening and should not compete with the title for
                the first second. */}
            <div className={cn(ENTER, "delay-500 lg:mt-auto")}>
              {children}

              {/* Term and detail on one line on a phone, the way the package
                  card lists them — three columns at 390px left each detail a
                  hundred pixels and broke "Beginner & Intermediate" in two.
                  Three across once there is room for them. */}
              <dl
                className={cn(
                  ruleVariants({ tone }),
                  "mt-8 flex flex-col gap-2.5 border-t pt-6 sm:grid sm:max-w-2xl sm:grid-cols-3 sm:gap-4",
                )}
              >
                {entry.facts.map((fact) => (
                  <div
                    key={fact.term}
                    className="flex items-baseline justify-between gap-4 sm:block"
                  >
                    <dt
                      className={cn(
                        quietVariants({ tone }),
                        "font-mono text-label tracking-[0.18em] uppercase",
                      )}
                    >
                      {fact.term}
                    </dt>
                    <dd className="text-right text-sm sm:mt-1 sm:text-left">
                      {fact.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Price and the way in are one block: a reader who has got this
              far is costing the week out, and the next thing they need is
              the button. Both rates are named — the cheaper one is only cheap
              because it is final, and quoting it alone would undersell the
              difference. The button opens the booking dialog on this package,
              where the two rates are laid side by side before the engine;
              the link beside it is the page's one way out, the same pair the
              strip at the foot of the page offers. */}
          <div className={cn(ENTER, "delay-500 lg:self-end")}>
            <p className="font-display text-3xl leading-none">
              <span
                className={cn(
                  quietVariants({ tone }),
                  "font-mono text-label tracking-[0.18em] uppercase",
                )}
              >
                From{" "}
              </span>
              €{formatPrice(entry.rates.nonRefundable)}
              <span className={cn(quietVariants({ tone }), "text-base")}>
                {" "}
                / {entry.rates.unit}
              </span>
            </p>
            <p
              className={cn(
                quietVariants({ tone }),
                "mt-2 text-sm text-pretty",
              )}
            >
              Non-refundable rate, per person, premium dorm bed. Semi-flexible
              from €{formatPrice(entry.rates.semiFlexible)} / {entry.rates.unit}.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <BookButton
                packageSlug={entry.slug}
                className="h-12 w-full px-6 text-xs sm:w-auto lg:w-full"
              >
                {entry.bookLabel}
              </BookButton>
              <Link
                href={entry.secondary.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  secondaryVariants({ tone }),
                )}
              >
                {entry.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
