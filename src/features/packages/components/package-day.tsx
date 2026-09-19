import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

export type DayEntry = {
  /** "07:30", or a part of the day where the house sets no clock. */
  time: string;
  title: string;
  body: string;
};

/** A beat of the wider week, for the strip beside the day. */
export type ArcEntry = { label: string; title: string };

const sectionVariants = cva("px-6 py-20 sm:px-10 sm:py-28", {
  variants: {
    tone: {
      cream: "bg-background",
      sand: "bg-house-sand text-house-ink",
    },
  },
  defaultVariants: { tone: "sand" },
});

const quietVariants = cva("", {
  variants: {
    tone: { cream: "text-muted-foreground", sand: "text-house-muted" },
  },
  defaultVariants: { tone: "sand" },
});

const ruleVariants = cva("", {
  variants: {
    tone: { cream: "border-border", sand: "border-house-ink/15" },
  },
  defaultVariants: { tone: "sand" },
});

type PackageDayProps = {
  id: string;
  heading: string;
  intro: string;
  entries: DayEntry[];
  /** The week in five lines, so the day is read inside its arc. */
  arc?: { label: string; entries: ArcEntry[] };
  /** The caveat under the clock — surf here runs on the tide, not the hour. */
  note?: string;
} & VariantProps<typeof sectionVariants>;

/**
 * A day of the package, hour by hour.
 *
 * The week timeline this replaces told the reader what changed from Monday to
 * Friday and nothing about what any one of those days felt like, and the
 * question a guest actually asks is the second one: when do I surf, when do I
 * eat, when is it mine. So the day gets the detail and the week becomes a
 * strip beside it — five beats, one line each — which is the right ratio for
 * how much of each a reader wants.
 *
 * Two columns on `lg`, the heading column pinned, because a day of eight
 * entries runs longer than a screen and the reader should keep the frame
 * ("a typical day", "times move with the tide") in view while they scroll
 * the detail. Below `lg` it stacks and reads top to bottom.
 */
export function PackageDay({
  id,
  heading,
  intro,
  entries,
  arc,
  note,
  tone,
}: PackageDayProps) {
  return (
    <section id={id} className={sectionVariants({ tone })}>
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            {heading}
          </h2>
          <p
            className={cn(
              quietVariants({ tone }),
              "mt-3 max-w-md text-base leading-relaxed text-pretty",
            )}
          >
            {intro}
          </p>

          {arc && (
            <div className={cn(ruleVariants({ tone }), "mt-10 border-t pt-6")}>
              <p className="text-house-clay font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                {arc.label}
              </p>
              <ol className="mt-4 space-y-2.5">
                {arc.entries.map((beat) => (
                  <li
                    key={beat.label}
                    className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3 text-sm"
                  >
                    <span
                      className={cn(
                        quietVariants({ tone }),
                        "font-mono text-[0.65rem] tracking-[0.18em] uppercase",
                      )}
                    >
                      {beat.label}
                    </span>
                    <span>{beat.title}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {note && (
            <p
              className={cn(
                quietVariants({ tone }),
                "mt-8 max-w-md font-mono text-xs leading-relaxed tracking-[0.05em]",
              )}
            >
              {note}
            </p>
          )}
        </div>

        {/* The rail carries the day. The dot is pulled 28px left — half its
            own width past the 24px padding — to sit centred on the rule, the
            same treatment the week timeline used. */}
        <ol
          className={cn(
            ruleVariants({ tone }),
            "space-y-9 border-l pl-6 sm:space-y-10",
          )}
        >
          {entries.map((entry) => (
            <li
              key={entry.time + entry.title}
              className="relative sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-6"
            >
              <span
                aria-hidden
                className="bg-house-clay absolute top-1.5 -left-7 size-2 rounded-full"
              />
              <p className="text-house-clay font-mono text-xs tracking-[0.18em] uppercase tabular-nums">
                {entry.time}
              </p>
              <div className="mt-1.5 sm:mt-0">
                <p className="font-display text-lg leading-snug">
                  {entry.title}
                </p>
                <p
                  className={cn(
                    quietVariants({ tone }),
                    "mt-1.5 text-sm leading-relaxed",
                  )}
                >
                  {entry.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
