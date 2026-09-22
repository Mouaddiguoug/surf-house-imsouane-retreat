import Image from "next/image";

import { cn } from "@/lib/utils/cn";

export type DayEntry = {
  /** "07:30", or a part of the day where the house sets no clock. */
  time: string;
  title: string;
  body: string;
};

/** A beat of the wider week, for the strip at the head of the panel. */
export type ArcEntry = { label: string; title: string };

/**
 * The two photographs every day section shares. The ground is the shore
 * from above — foam and green water — and the portrait is a surfer on a
 * wave. Both are the same on every package page: the day is the part of
 * the offer that is the same house, the same bay, whichever week you book.
 */
const GROUND = {
  src: "/assets/package_day_bg.jpg",
};
const PORTRAIT = {
  src: "/assets/day_schedule.jpg",
  alt: "A surfer in a black wetsuit riding down the face of a clean blue wave at Imsouane, the lip curling behind them.",
};

type PackageDayProps = {
  id: string;
  heading: string;
  intro: string;
  entries: DayEntry[];
  /** The week in five lines, so the day is read inside its arc. */
  arc?: { label: string; entries: ArcEntry[] };
  /** The caveat under the clock — surf here runs on the tide, not the hour. */
  note?: string;
};

/**
 * A day of the package, hour by hour.
 *
 * The week timeline this replaces told the reader what changed from Monday to
 * Friday and nothing about what any one of those days felt like, and the
 * question a guest actually asks is the second one: when do I surf, when do I
 * eat, when is it mine. So the day gets the detail and the week becomes a
 * strip at the head of it — five beats, one line each.
 *
 * The section sits on a photograph of the shore, with the day itself in a
 * cream panel on top and a portrait beside it. The panel is the point: the
 * ground is busy, all foam and water, and a timeline needs a quiet surface
 * to be read on, so the picture stays a picture and the reading happens on
 * paper laid over it. The scrim under the heading is deep rather than
 * light because the foam is nearly white — a light wash would leave the
 * title standing on the one part of the frame it cannot survive.
 *
 * The portrait starts level with the heading and is pinned on `lg`, so it
 * rides beside the panel as the reader scrolls a day that runs longer than
 * a screen. Below `lg` it follows the panel rather than delaying it.
 */
export function PackageDay({
  id,
  heading,
  intro,
  entries,
  arc,
  note,
}: PackageDayProps) {
  return (
    <section
      id={id}
      // `overflow-clip`, not `-hidden`: hidden makes the section a scroll
      // container, and the rows' `view()` timelines would measure against it
      // instead of the page — every row "in view" from the start, nothing to
      // reveal. Clip cuts the picture to the box just the same without that.
      className="bg-house-deep text-house-shell relative isolate overflow-clip px-6 py-20 sm:px-10 sm:py-28"
    >
      <Image
        src={GROUND.src}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="bg-house-deep/45 absolute inset-0" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <div>
          <h2 className="font-display text-3xl leading-[1.1] text-balance text-shadow-md sm:text-4xl">
            {heading}
          </h2>
          <p className="text-house-shell/85 mt-3 max-w-md text-base leading-relaxed text-pretty text-shadow-sm">
            {intro}
          </p>

          <div className="bg-background text-foreground shadow-photo mt-10 rounded-3xl p-6 sm:p-10">
            {arc && (
              <div className="border-border mb-8 border-b pb-8">
                <p className="text-house-clay font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                  {arc.label}
                </p>
                <ol className="mt-4 space-y-2.5">
                  {arc.entries.map((beat) => (
                    <li
                      key={beat.label}
                      className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3 text-sm"
                    >
                      <span className="text-muted-foreground font-mono text-[0.65rem] tracking-[0.18em] uppercase">
                        {beat.label}
                      </span>
                      <span>{beat.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* No rail, no dots: the time is the marker. A hairline between
                entries does the separating instead — the rule a timeline
                draws down the side, laid flat between the rows. */}
            <ol className="divide-border divide-y">
              {entries.map((entry) => (
                <li
                  key={entry.time + entry.title}
                  className="day-reveal py-6 first:pt-0 last:pb-0 sm:grid sm:grid-cols-[5.5rem_1fr] sm:gap-6 sm:py-7"
                >
                  <p className="text-house-clay font-mono text-xs tracking-[0.18em] uppercase tabular-nums">
                    {entry.time}
                  </p>
                  <div className="mt-1.5 sm:mt-0">
                    <p className="font-display text-lg leading-snug">
                      {entry.title}
                    </p>
                    <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                      {entry.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {note && (
              <p className="text-muted-foreground border-border mt-8 border-t pt-6 font-mono text-xs leading-relaxed tracking-[0.05em]">
                {note}
              </p>
            )}
          </div>
        </div>

        <div
          className={cn(
            "order-last lg:order-none",
            "lg:sticky lg:top-24 lg:self-start",
          )}
        >
          <div className="day-reveal shadow-photo relative aspect-4/5 w-full overflow-hidden rounded-3xl lg:aspect-2/3">
            <Image
              src={PORTRAIT.src}
              alt={PORTRAIT.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
