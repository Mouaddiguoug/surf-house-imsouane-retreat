import { Sunrise, Sunset, Users } from "lucide-react";
import Image from "next/image";

import { SectionHeading } from "@/components/shared/section-heading";
import type { Locale } from "@/lib/i18n/locale";

/** What the roof is actually used for, across a day. */
const COPY = {
  en: {
    uses: [
      {
        title: "Yoga at first light",
        body: "Mats go down facing the water before the wind gets up. Dynamic in the morning, restorative once the boards are rinsed.",
      },
      {
        title: "Video review after dinner",
        body: "The screen comes out on the low benches and the day gets replayed — the take-off you rushed, the line you should have taken.",
      },
      {
        title: "The long evenings",
        body: "Mint tea on the mosaic table, the port lights coming on below, and the argument about whether tomorrow is a dawn patrol.",
      },
    ],
    alt: "The rooftop terrace at dawn: two people on yoga mats facing the bay, low cushioned benches and a mosaic tea table, with the village rooftops and the ocean beyond.",
    title: "The rooftop",
    subtitle: "Two floors above the bay, where most of the week actually happens.",
    body: "The roof looks straight over the village to the point. It is the yoga deck at seven, the shade at two, and the place everyone ends up after dinner — mats rolled back, cushions pulled round, the swell forecast open on somebody's phone.",
  },
  fr: {
    uses: [
      {
        title: "Le yoga aux premières lueurs",
        body: "Les tapis se déroulent face à l'eau avant que le vent ne se lève. Dynamique le matin, réparateur une fois les planches rincées.",
      },
      {
        title: "La vidéo après le dîner",
        body: "L'écran s'installe sur les banquettes basses et la journée repasse — le take-off précipité, la ligne que tu aurais dû prendre.",
      },
      {
        title: "Les longues soirées",
        body: "Thé à la menthe sur la table en mosaïque, les lumières du port qui s'allument en contrebas, et le débat pour savoir si demain, c'est dawn patrol.",
      },
    ],
    alt: "Le toit-terrasse à l'aube : deux personnes sur des tapis de yoga face à la baie, des banquettes basses et une table à thé en mosaïque, les toits du village et l'océan au-delà.",
    title: "Le toit-terrasse",
    subtitle: "Deux étages au-dessus de la baie, là où se passe l'essentiel de la semaine.",
    body: "Le toit donne droit sur le village et la pointe. C'est le deck de yoga à sept heures, l'ombre à quatorze heures, et l'endroit où tout le monde finit après le dîner — tapis roulés, coussins rapprochés, les prévisions de houle ouvertes sur le téléphone de quelqu'un.",
  },
} as const satisfies Record<Locale, unknown>;

const ICONS = [Sunrise, Users, Sunset];

/**
 * The first of the three house sections, and the anchor the navbar's "House"
 * link lands on.
 *
 * A full-bleed photograph with the copy on a card pulled up over its foot: the
 * three package sections above all sit inside the same 6xl measure, and after
 * three of those the page needs to change gear. The card also solves the
 * legibility problem — the roof is shot into a pale dawn sky, so text laid
 * directly over it would need a scrim heavy enough to lose the view.
 */
export function RooftopSection({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <section
      id="house"
      className="border-border bg-background border-t pb-24 sm:pb-32"
    >
      <div className="relative h-[55vh] max-h-[640px] min-h-[360px] w-full">
        <Image
          src="/assets/rooftop.JPG"
          alt={t.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Only along the foot, and only far enough to seat the card — the
            sky is the reason to run this photo full-bleed. */}
        <div
          aria-hidden
          className="from-house-deep/40 absolute inset-0 bg-gradient-to-t to-transparent to-40%"
        />
      </div>

      <div className="relative mx-auto -mt-20 w-full max-w-6xl px-6 sm:-mt-28 sm:px-10">
        <div className="border-border bg-house-shell text-house-ink shadow-card max-w-3xl rounded-3xl border p-8 sm:p-12">
          <SectionHeading
            title={t.title}
            subtitle={t.subtitle}
          />

          <p className="mt-6 text-base leading-relaxed text-pretty">
            {t.body}
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 grid w-full max-w-6xl gap-8 px-6 sm:grid-cols-3 sm:px-10">
        {t.uses.map(({ title, body }, index) => {
          const Icon = ICONS[index];
          return (
          <div key={title} className="border-border border-t pt-5">
            <Icon aria-hidden className="text-house-clay size-5" />
            <h3 className="font-display mt-3 text-lg">{title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {body}
            </p>
          </div>
          );
        })}
      </div>
    </section>
  );
}
