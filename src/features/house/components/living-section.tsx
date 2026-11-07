import { Coffee, Laptop, Sofa } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SectionHeading } from "@/components/shared/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import { localizeHref, type Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

const COPY = {
  en: {
    space: [
      {
        title: "Somewhere to collapse",
        body: "A corner sofa and a low table, an arch away from the bed. The obvious place to be while your shoulders remember the morning.",
      },
      {
        title: "A table you can work at",
        body: "A proper desk height table and chairs, not a laptop balanced on your knees. The Wi-Fi holds a call.",
      },
      {
        title: "Your own kitchen corner",
        body: "Hob, sink and counter for breakfast before dawn patrol, or for the nights you would rather not be sociable.",
      },
    ],
    title: "The living space",
    subtitle: "Room to land, for the stays that run longer than a week.",
    body: "Each apartment opens into its own living room — sofa, table, kitchen corner — with the bedroom through the arch. It is the part of the house that makes a fortnight work as easily as a weekend, and the reason the Original Stay suits people who stay a little longer than they planned.",
    alt: "An apartment living room: a grey corner sofa and wooden coffee table, a dining table and chairs, a woven palm pendant lamp, and the bedroom visible through a wide arch.",
    book: "Book a stay",
  },
  fr: {
    space: [
      {
        title: "De quoi s'effondrer",
        body: "Un canapé d'angle et une table basse, à une arche du lit. L'endroit idéal pendant que tes épaules se souviennent de la matinée.",
      },
      {
        title: "Une vraie table pour travailler",
        body: "Une table à hauteur de bureau et des chaises, pas un ordinateur en équilibre sur les genoux. Le Wi-Fi tient un appel.",
      },
      {
        title: "Ton coin cuisine",
        body: "Plaque, évier et plan de travail pour le petit-déjeuner avant la dawn patrol, ou pour les soirs où tu préfères rester tranquille.",
      },
    ],
    title: "L'espace de vie",
    subtitle: "De la place pour se poser, pour les séjours qui durent plus d'une semaine.",
    body: "Chaque appartement s'ouvre sur son propre salon — canapé, table, coin cuisine — avec la chambre derrière l'arche. C'est la partie de la maison qui rend une quinzaine aussi simple qu'un week-end, et la raison pour laquelle The Original Stay convient à ceux qui restent un peu plus longtemps que prévu.",
    alt: "Le salon d'un appartement : un canapé d'angle gris et une table basse en bois, une table à manger et des chaises, une suspension en palmier tressé, et la chambre visible par une large arche.",
    book: "Réserver un séjour",
  },
} as const satisfies Record<Locale, unknown>;

const ICONS = [Sofa, Laptop, Coffee];

/**
 * House 03.
 *
 * Ink, to close the house group the way the Masterclass closes the fixed
 * weeks — but with the photograph on the right and the three points laid
 * across the foot rather than stacked in the column, so the two dark bands
 * read as different sections rather than one template.
 */
export function LivingSection({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <section
      id="the-living-space"
      className="bg-house-ink text-house-sand px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              tone="dark"
              title={t.title}
              subtitle={t.subtitle}
            />

            <p className="text-house-shell/80 mt-6 text-base leading-relaxed text-pretty">
              {t.body}
            </p>
          </div>

          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl">
            <Image
              src="/assets/living_room.JPG"
              alt={t.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {t.space.map(({ title, body }, index) => {
            const Icon = ICONS[index];
            return (
            <div key={title} className="border-house-sand/20 border-t pt-5">
              <Icon aria-hidden className="text-house-sky size-5" />
              <h3 className="font-display mt-3 text-lg">{title}</h3>
              <p className="text-house-sand/70 mt-2 text-sm leading-relaxed">
                {body}
              </p>
            </div>
            );
          })}
        </div>

        {/* The only call to action in the house group. Three sections of
            rooms with a "Book a stay" under each would read as a pitch; one
            at the end, where the reader has seen the whole house, does not. */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <BookButton
            variant="sand"
            className="h-12 w-full px-6 text-xs sm:w-auto"
          >
            {t.book}
          </BookButton>
          <Link
            href={localizeHref("/original-stay", locale)}
            className={cn(
              buttonVariants({ variant: "shellOutline" }),
              "h-12 w-full px-6 text-xs sm:w-auto",
            )}
          >
            The Original Stay
          </Link>
        </div>
      </div>
    </section>
  );
}
