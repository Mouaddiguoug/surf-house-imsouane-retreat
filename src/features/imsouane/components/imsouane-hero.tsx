import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CaptionStrip } from "@/components/shared/caption-strip";
import { buttonVariants } from "@/components/ui/button";
import { BookButton } from "@/features/booking/components/book-button";
import { SITE } from "@/lib/constants/site";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

/**
 * The three numbers a reader wants before the paragraphs: what is there,
 * how far it is, and how small it is. They run in an ink strip under the
 * photograph rather than inside it — on a phone the hero has room for the
 * title and two buttons and nothing else before the copy climbs into the
 * pale sky where no scrim can hold it.
 */
const COPY = {
  en: {
    facts: [
      { term: "The waves", detail: "Two rights" },
      { term: "From Agadir", detail: "Two hours by road" },
      { term: "The village", detail: "About a thousand people" },
    ],
    alt: "Dawn at Imsouane: a surfer dropping into a clean, glassy right while another waits on a longboard in the flat water inside, the headland soft in the haze behind.",
    country: "Morocco",
    lede: "One road in, two waves, and the house a few hundred metres from the point.",
    book: "Book a stay",
    find: "Find the house",
  },
  fr: {
    facts: [
      { term: "Les vagues", detail: "Deux droites" },
      { term: "Depuis Agadir", detail: "Deux heures de route" },
      { term: "Le village", detail: "Environ mille habitants" },
    ],
    alt: "L'aube à Imsouane : un surfeur part sur une droite propre et lisse pendant qu'un autre attend sur un longboard dans l'eau calme, le promontoire adouci par la brume.",
    country: "Maroc",
    lede: "Une seule route, deux vagues, et la maison à quelques centaines de mètres de la pointe.",
    book: "Réserver un séjour",
    find: "Trouver la maison",
  },
} as const satisfies Record<Locale, unknown>;

/**
 * The Imsouane page's hero.
 *
 * A single photograph, full bleed, the way a trip page opens: the place is
 * the argument. The frame is pale — dawn sky over water — so the copy sits
 * along the foot where a gradient from ink can hold it, and the top of the
 * frame is left alone for the sky. The navbar is solid on this route, so
 * nothing up there needs a scrim. The facts strip below is part of the same
 * component because the two are one composition: the photo, then its caption.
 *
 * `priority` on the image: it is the largest thing above the fold on this
 * page and the one asset that should not lazy-load.
 */
export function ImsouaneHero({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <>
      <section className="bg-house-deep text-house-shell relative flex h-[min(80dvh,48rem)] min-h-[30rem] flex-col justify-end overflow-hidden">
        <Image
          src="/assets/imsouane_hero.jpg"
          alt={t.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_45%]"
        />

        {/* Heavy at the foot, gone by the middle: the lower third of this
          frame is pale water, and the copy needs ink under it. The stop sits
          higher on a phone, where the same copy takes more of the height. */}
        <div
          aria-hidden
          className="from-house-deep/90 via-house-deep/40 absolute inset-0 bg-gradient-to-t via-45% to-transparent lg:via-35%"
        />

        <div className="relative w-full px-6 pb-14 sm:px-10 sm:pb-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              <p className="text-house-sky flex items-center gap-2 font-mono text-xs tracking-[0.18em] uppercase text-shadow-sm animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-1000 motion-reduce:animate-none">
                <MapPin aria-hidden className="size-4" />
                {SITE.region} · {t.country}
              </p>
              <h1 className="font-title mt-4 text-5xl leading-none tracking-tight text-shadow-md animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-1000 sm:text-7xl lg:text-8xl motion-reduce:animate-none">
                Imsouane
              </h1>
              <p className="text-house-shell/85 mt-5 max-w-xl text-base leading-relaxed text-pretty text-shadow-sm animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-150 duration-1000 sm:text-lg motion-reduce:animate-none">
                {t.lede}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 animate-in fade-in fill-mode-both delay-300 duration-1000 motion-reduce:animate-none">
                <BookButton className="h-12 w-full px-6 text-xs sm:w-auto">
                  {t.book}
                </BookButton>
                <Link
                  href="#imsouane"
                  className={cn(
                    buttonVariants({ variant: "shellOutline" }),
                    "h-12 w-full px-6 text-xs sm:w-auto",
                  )}
                >
                  {t.find}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CaptionStrip facts={t.facts} />
    </>
  );
}
