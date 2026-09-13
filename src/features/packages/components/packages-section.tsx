import { SectionHeading } from "@/components/shared/section-heading";
import { PackageCard } from "@/features/packages/components/package-card";
import { PACKAGES } from "@/features/packages/data/packages";

/**
 * The three packages, on the home page.
 *
 * They used to run here in full, one long section each, which put the whole
 * catalogue between the hero and the proof and made the reader scroll three
 * weeks' worth of detail to find out there were three of them. Now each one
 * owns a page and this is the menu: name, pitch, and the shape of the stay.
 *
 * Sand, because the reviews below are on cream and no two sections here share
 * a ground — which also decides the cards, since a shell card only reads as a
 * card on sand. The middle one keeps its ink from the section it replaces.
 *
 * The third card takes the full width at `sm`, where three into two columns
 * would otherwise leave it stranded on a row of its own.
 */
export function PackagesSection() {
  return (
    <section
      id="packages"
      className="bg-house-sand text-house-ink px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <SectionHeading
            eyebrow="The packages · Three ways to stay"
            title="Three ways to stay"
            subtitle="A coached week, a week on a single fin, or a stay you build yourself."
          />

          <p className="text-house-muted mt-6 text-base leading-relaxed text-pretty">
            Every one of them is the same house, the same bay and the same
            coaches. What changes is how much of the week is decided before you
            arrive.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((entry, index) => (
            <PackageCard
              key={entry.slug}
              package={entry}
              ground="shell"
              className={
                index === PACKAGES.length - 1
                  ? "sm:col-span-2 lg:col-span-1"
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
