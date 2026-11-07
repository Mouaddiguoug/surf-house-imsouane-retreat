import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { contactChannels } from "@/components/shared/contact-channels";
import { HeroVideo, type HeroVideoSource } from "@/components/shared/hero-video";
import { buttonVariants } from "@/components/ui/button";
import { ChapterBand } from "@/features/home/components/chapter-band";
import { EditorialSplit } from "@/features/home/components/editorial-split";
import {
  BookedQuestion,
  LevelQuestion,
} from "@/features/home/components/home-questions";
import { FAQ } from "@/features/home/data/faq";
import { PackageCard } from "@/features/packages/components/package-card";
import { PACKAGE_UI, euros, perLabel } from "@/features/packages/data/package-ui";
import { packageBySlug } from "@/features/packages/data/packages";
import {
  PLATFORMS,
  REVIEWS_ROW_ONE,
  REVIEWS_ROW_TWO,
} from "@/features/reviews/data/reviews";
import { localizeHref, type Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

/*
 * The page's spatial rules, in one place.
 *
 * Every chapter sits on the same 1280px column (`page-wrap`) and starts at
 * its left edge; nothing is indented off it. A chapter opens with either a
 * colour band (02, 03, 05) or a number-and-heading (04, 06, 07), and the
 * content under either starts the same distance below. Inside a chapter the
 * columns are 7:5 — the photograph wide, the words narrow — so the eye
 * learns one grid and every chapter reuses it.
 */

/**
 * Every word on the page, in both languages. The French is the V1.5
 * handoff's own (HOMEPAGE_FR_EN.md and MICROCOPY_FR_EN.csv) where it supplies
 * a line, and written to match it — in "tu" — where it does not.
 */
const COPY = {
  en: {
    paths: ["Stay", "Surf", "Already Booked"],
    hero: {
      label: "01 · Imsouane, Morocco",
      title: "The Atlantic Home for Wave Seekers",
      lead: "A house in Imsouane. A stay by the ocean, with surf experiences you can choose.",
    },
    place: {
      band: "The place comes first.",
      title: "The Place. The People. The Ocean.",
      lead: "Discover Imsouane through its coastline, its village and the people who call it home.",
      link: "Discover the place",
      alt: "The point at Imsouane from the cliff path, the village and the harbour wall on the far headland across grey water.",
    },
    surf: {
      band: "A conversation with the ocean.",
      title: "More than catching waves",
      lead: "Explore your surf journey with Imsouane Surf Academy. Tell us where you are starting, if you wish.",
      link: "How we coach",
      alt: "A surfer standing up on a small, wind-textured wave at Imsouane while two others paddle back out behind.",
    },
    experiences: { title: "Choose your experience" },
    house: {
      band: "A house to come back to.",
      lead: "Accommodation and half-board at the House. Academy activities are optional and billed separately.",
      perPerson: "per person",
      button: "Explore your stay",
    },
    life: {
      title: "A little more life together",
      lead: "Shared meals, conversations and time to unwind.",
      tea: "Every afternoon, a cup of tea and a little homemade-style treat, offered by the house, as the day comes to an end. Share your surf stories, meet someone new, or simply enjoy the moment.",
      tableAlt:
        "Guests at the long table inside the house, mid-meal, a surfboard leaning in the foreground and the house dog underfoot.",
      roofAlt:
        "The rooftop terrace at dusk: low seating and rugs around a table, the village rooftops and the bay stretching out beyond.",
    },
    people: {
      title: "Real people. Clear answers.",
      guests: "From our guests",
      guestsNote:
        "Quoted word for word from the platforms they were left on. Every score links to its source.",
      reviewsSr: "reviews (opens in a new tab)",
      questions: "Questions",
      questionsNote: "The ones that usually arrive by email before a booking.",
    },
    final: {
      label: "08 · The Atlantic is calling",
      title: "Come find your flow",
      lead: "Choose your stay, explore surf, or add activities to a booking you already have.",
      ask: "Anything else? Just ask.",
      askNote:
        "Questions about your room, surf lessons or transfers: send us a message on WhatsApp or drop us an email.",
      newTab: "(opens in a new tab)",
    },
  },
  fr: {
    paths: ["Séjourner", "Surfer", "Déjà réservé"],
    hero: {
      label: "01 · Imsouane, Maroc",
      title: "Ta maison atlantique au rythme des vagues",
      lead: "Une maison à Imsouane. Un séjour près de l'océan, avec les expériences surf que tu choisis.",
    },
    place: {
      band: "Le lieu d'abord.",
      title: "Le lieu. Les gens. L'océan.",
      lead: "Découvre Imsouane à travers son littoral, son village et celles et ceux qui y vivent.",
      link: "Découvrir le lieu",
      alt: "La pointe d'Imsouane depuis le chemin de la falaise, le village et la digue du port de l'autre côté d'une eau grise.",
    },
    surf: {
      band: "Une conversation avec l'océan.",
      title: "Bien plus que prendre des vagues",
      lead: "Explore ton parcours avec Imsouane Surf Academy. Si tu le souhaites, indique ton point de départ.",
      link: "Notre méthode",
      alt: "Un surfeur debout sur une petite vague ridée par le vent à Imsouane, deux autres repartant à la rame derrière lui.",
    },
    experiences: { title: "Choisis ton expérience" },
    house: {
      band: "Une maison où revenir.",
      lead: "L'hébergement et la demi-pension à la House. Les activités Academy sont facultatives et facturées séparément.",
      perPerson: "par personne",
      button: "Découvrir ton séjour",
    },
    life: {
      title: "Un peu plus de vie ensemble",
      lead: "Des repas partagés, des conversations et le temps de souffler.",
      tea: "Chaque après-midi, un thé et une petite douceur maison, offerts par la maison, au moment où la journée se termine. Raconte ta session, rencontre quelqu'un de nouveau ou profite simplement du moment.",
      tableAlt:
        "Des invités à la grande table de la maison, en plein repas, une planche de surf au premier plan et le chien de la maison sous la table.",
      roofAlt:
        "Le toit-terrasse au crépuscule : banquettes basses et tapis autour d'une table, les toits du village et la baie au-delà.",
    },
    people: {
      title: "Des personnes. Des réponses claires.",
      guests: "Ce que disent nos voyageurs",
      guestsNote:
        "Cités mot pour mot, dans la langue où ils ont été écrits, depuis les plateformes où ils ont été laissés. Chaque note renvoie à sa source.",
      reviewsSr: "avis (s'ouvre dans un nouvel onglet)",
      questions: "Questions",
      questionsNote:
        "Celles qui arrivent souvent par e-mail avant une réservation.",
    },
    final: {
      label: "08 · L'Atlantique t'appelle",
      title: "Viens trouver ton rythme",
      lead: "Choisis ton séjour, explore le surf ou ajoute des activités à une réservation existante.",
      ask: "Une question ? Demande-nous.",
      askNote:
        "Ta chambre, les cours de surf, les transferts : envoie-nous un message sur WhatsApp ou un e-mail.",
      newTab: "(s'ouvre dans un nouvel onglet)",
    },
  },
} as const;

/** Heading or band → the content under it. */
const OPENING_GAP = "mt-10 min-[900px]:mt-16";

const H2 =
  "font-display text-[clamp(2.125rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em] text-balance";

const LEAD = "text-house-muted mt-5 text-lg leading-relaxed text-pretty";

const LABEL =
  "text-house-muted text-sm font-semibold tracking-[0.16em] tabular-nums";

const textLink =
  "inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase underline-offset-4 hover:underline";

/** The 7:5 grid every chapter body uses from 900px. */
const SEVEN_FIVE =
  "grid gap-10 min-[900px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[900px]:gap-16";

/** The three paths every visitor is offered, in the hero and at the close. */
const PATH_HREFS = ["/original-stay", "/custom-surf", "/upgrade"] as const;

type ChapterProps = { locale: Locale };

/**
 * A section's number and heading, for the chapters without a colour band.
 * The number sits directly above the heading on the same left edge as
 * everything else; it is information, not decoration — the brief fixes
 * eight numbered sections in a set order.
 */
function ChapterHeading({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-house-ink border-t pt-6">
      <p className={LABEL}>{number}</p>
      <h2 className={cn(H2, "mt-4 max-w-[18ch]")}>{children}</h2>
    </div>
  );
}

function PathButtons({
  locale,
  className,
  onDark = false,
}: {
  locale: Locale;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {PATH_HREFS.map((href, index) => (
        <Link
          key={href}
          href={localizeHref(href, locale)}
          className={cn(
            buttonVariants({
              variant: onDark
                ? index === 0
                  ? "sand"
                  : "shellOutline"
                : index === 0
                  ? "clay"
                  : "outline",
            }),
            "h-12 min-w-[7.5rem] px-6 text-xs",
            !onDark &&
              index > 0 &&
              "border-house-ink rounded-xl font-semibold tracking-[0.14em] uppercase",
          )}
        >
          {COPY[locale].paths[index]}
        </Link>
      ))}
    </div>
  );
}

/* 01 ------------------------------------------------------------------ */

export function HomeHero({
  locale,
  sources,
  poster,
}: ChapterProps & {
  sources: HeroVideoSource[];
  poster: string;
}) {
  const t = COPY[locale].hero;

  return (
    <section id="hero" className="page-section pt-28 sm:pt-32 min-[900px]:pt-36">
      {/* 5:7, the hero's own proportion: words first and narrow, the bay
          wide. Both columns end on one line, so the buttons and the foot of
          the frame share a baseline. */}
      <div className="page-wrap grid gap-10 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:items-end min-[900px]:gap-16">
        <div>
          <p className={LABEL}>{t.label}</p>
          <h1 className="font-display mt-5 text-[clamp(2.375rem,5.5vw,5rem)] leading-[1] tracking-[-0.025em] text-balance">
            {t.title}
          </h1>
          <p className={cn(LEAD, "mt-6 max-w-[36ch]")}>{t.lead}</p>
          <PathButtons locale={locale} className="mt-10" />
        </div>

        {/* The bay itself, in a frame beside the words rather than behind
            them: nothing is set on the footage, so it never has to be
            darkened to carry type. */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm min-[900px]:aspect-auto min-[900px]:h-[min(36rem,calc(100dvh-12rem))] min-[900px]:min-h-[32.5rem]">
          <HeroVideo
            sources={sources}
            poster={poster}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

/* 02 ------------------------------------------------------------------ */

export function PlaceChapter({ locale }: ChapterProps) {
  const t = COPY[locale].place;

  return (
    <section id="imsouane" className="page-section">
      <div className="page-wrap">
        <ChapterBand
          tone="terracotta"
          word="IMSOUANE"
          number="02"
          heading={t.band}
          composition="place"
        />

        <EditorialSplit
          className={OPENING_GAP}
          image={{ src: "/assets/auction_2.jpg", alt: t.alt }}
        >
          <h2 className={H2}>{t.title}</h2>
          <p className={LEAD}>{t.lead}</p>
          <Link
            href={localizeHref("/imsouane", locale)}
            className={cn(textLink, "mt-6")}
          >
            {t.link}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </EditorialSplit>
      </div>
    </section>
  );
}

/* 03 ------------------------------------------------------------------ */

export function SurfChapter({ locale }: ChapterProps) {
  const t = COPY[locale].surf;

  return (
    <section id="surf" className="page-section">
      <div className="page-wrap">
        <ChapterBand
          tone="ocean"
          word="SURF"
          number="03"
          heading={t.band}
          composition="surf"
        />

        {/* The level question belongs to the Academy's story, so it sits in
            the same column, straight after it — not floated off on its own
            under the photograph. */}
        <EditorialSplit
          reverse
          aspect="portrait"
          className={OPENING_GAP}
          image={{ src: "/assets/video_analysis.JPG", alt: t.alt }}
        >
          <h2 className={H2}>{t.title}</h2>
          <p className={LEAD}>{t.lead}</p>
          <Link
            href={localizeHref("/coaching", locale)}
            className={cn(textLink, "mt-6")}
          >
            {t.link}
            <ArrowRight aria-hidden className="size-4" />
          </Link>

          <LevelQuestion className="mt-10" />
        </EditorialSplit>
      </div>
    </section>
  );
}

/* 04 ------------------------------------------------------------------ */

export function ExperiencesChapter({ locale }: ChapterProps) {
  return (
    <section id="experiences" className="page-section">
      <div className="page-wrap">
        <ChapterHeading number="04">
          {COPY[locale].experiences.title}
        </ChapterHeading>

        {/* Three equal columns. The V1.5 spec proposed a 5:4:3 rhythm; the
            founder chose equal widths, so the three read as peers and the
            row is one even measure. The photographs share one height, so
            the rules, kinds and titles line up across it. */}
        <div
          className={cn(
            OPENING_GAP,
            "grid gap-14 min-[900px]:grid-cols-3 min-[900px]:gap-8",
          )}
        >
          {(["custom-surf", "foundation", "golden-lines"] as const).map(
            (slug) => (
              <PackageCard
                key={slug}
                package={packageBySlug(slug, locale)}
                locale={locale}
                aspect="row"
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* 05 ------------------------------------------------------------------ */

export function HouseChapter({ locale }: ChapterProps) {
  const t = COPY[locale].house;
  const stay = packageBySlug("original-stay", locale);

  return (
    <section id="house" className="page-section">
      <div className="page-wrap">
        <ChapterBand
          tone="sage"
          word="HOUSE"
          number="05"
          heading={t.band}
          composition="house"
        />

        <EditorialSplit
          className={OPENING_GAP}
          image={{ src: stay.image, alt: stay.imageAlt }}
        >
          <h2 className={H2}>The Original Stay</h2>
          <p className={LEAD}>{t.lead}</p>
          {stay.rates && (
            <p className="border-house-ink/20 mt-8 border-t pt-5 text-base">
              <span className="text-xs font-semibold tracking-[0.16em] uppercase">
                {PACKAGE_UI[locale].from}
              </span>{" "}
              <span className="font-display text-3xl">
                {euros(stay.rates.from, locale)}
              </span>{" "}
              <span className="text-house-muted">
                / {perLabel(stay, locale)}, {t.perPerson}
              </span>
            </p>
          )}
          <Link
            href={stay.href}
            className={cn(
              buttonVariants({ variant: "clay" }),
              "mt-6 h-12 px-6 text-xs",
            )}
          >
            {t.button}
          </Link>
        </EditorialSplit>
      </div>
    </section>
  );
}

/* 06 ------------------------------------------------------------------ */

export function HouseLifeChapter({ locale }: ChapterProps) {
  const t = COPY[locale].life;

  return (
    <section id="house-life" className="page-section">
      <div className="page-wrap">
        <ChapterHeading number="06">{t.title}</ChapterHeading>

        {/* Two columns, 7:5, top to bottom: the long table with the story
            of the house's evenings under it, the rooftop with the booked
            question under it. Each pair shares a column edge, so the words
            are visibly about the picture above them. */}
        <div className={cn(OPENING_GAP, SEVEN_FIVE)}>
          <div>
            <div className="relative aspect-4/3 overflow-hidden rounded-sm">
              <Image
                src="/assets/surf_fuel.jpg"
                alt={t.tableAlt}
                fill
                sizes="(min-width: 900px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-8 max-w-[34rem]">
              <p className="text-lg leading-relaxed text-pretty">{t.lead}</p>
              <h3 className="font-display mt-8 text-2xl">Sunset Tea</h3>
              <p className="text-house-muted mt-3 text-base leading-relaxed text-pretty">
                {t.tea}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm">
              <Image
                src="/assets/rooftop.JPG"
                alt={t.roofAlt}
                fill
                sizes="(min-width: 900px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <BookedQuestion />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 07 ------------------------------------------------------------------ */

export function PeopleChapter({ locale }: ChapterProps) {
  const t = COPY[locale].people;
  const quotes = [...REVIEWS_ROW_ONE.slice(0, 2), REVIEWS_ROW_TWO[0]];

  return (
    <section id="people" className="page-section">
      <div className="page-wrap">
        <ChapterHeading number="07">{t.title}</ChapterHeading>

        {/* Two parts, one after the other: what guests said, then what
            people ask. Each is introduced by a small label on the left
            column of the 5:7 grid, the content on the right — the same
            grid as the hero, read the other way. */}
        <div
          className={cn(
            OPENING_GAP,
            "grid gap-6 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-16",
          )}
        >
          <div>
            <h3 className="font-display text-2xl">{t.guests}</h3>
            <p className="text-house-muted mt-3 max-w-[30ch] text-base leading-relaxed text-pretty">
              {t.guestsNote}
            </p>
          </div>

          <div>
            <ul className="border-house-ink grid border-y sm:grid-cols-3">
              {PLATFORMS.map((platform) => (
                <li
                  key={platform.name}
                  className="border-house-ink/20 border-b py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0"
                >
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <span className="font-display block text-3xl">
                      {platform.score}
                    </span>
                    <span className="text-house-muted mt-1 inline-flex items-center gap-1.5 text-sm group-hover:underline">
                      {platform.name} · {platform.count}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </span>
                    <span className="sr-only"> {t.reviewsSr}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* The quotes stay in the language they were written in — they
                are verbatim, and a translation would no longer be a quote.
                `lang` tells a screen reader to switch voice for them. */}
            <ul className="mt-10 flex flex-col gap-10">
              {quotes.map((review) => (
                <li key={review.name + review.quote.slice(0, 12)}>
                  <figure>
                    <blockquote
                      lang="en"
                      className="font-display text-xl leading-snug text-pretty sm:text-2xl"
                    >
                      “{review.quote}”
                    </blockquote>
                    <figcaption className="text-house-muted mt-3 text-sm">
                      {review.name}
                      {review.origin ? `, ${review.origin}` : ""} ·{" "}
                      {review.platform} {review.score}/{review.outOf}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-[900px]:mt-20">
            <h3 className="font-display text-2xl">{t.questions}</h3>
            <p className="text-house-muted mt-3 max-w-[30ch] text-base leading-relaxed text-pretty">
              {t.questionsNote}
            </p>
          </div>

          <div className="border-house-ink border-t min-[900px]:mt-20">
            {FAQ[locale].map((item) => (
              <details
                key={item.question}
                className="details-reveal group border-house-ink/20 border-b"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    aria-hidden
                    className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <p className="text-house-muted max-w-[62ch] pb-6 text-base leading-relaxed text-pretty">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 08 ------------------------------------------------------------------ */

export function FinalChapter({ locale }: ChapterProps) {
  const t = COPY[locale].final;

  return (
    <section
      id="final"
      className="bg-house-ink text-house-shell py-20 min-[900px]:py-28"
    >
      <div className={cn("page-wrap min-[900px]:items-end", SEVEN_FIVE)}>
        <div>
          <p className="text-house-shell/75 text-sm font-semibold tracking-[0.16em] tabular-nums">
            {t.label}
          </p>
          <h2 className="font-display mt-5 text-[clamp(2.75rem,7vw,6rem)] leading-[0.98] tracking-[-0.025em] text-balance">
            {t.title}
          </h2>
          <p className="text-house-shell/80 mt-6 max-w-[36ch] text-lg leading-relaxed text-pretty">
            {t.lead}
          </p>
          <PathButtons locale={locale} onDark className="mt-10" />
        </div>

        <div
          id="contact"
          className="border-house-shell/30 border-t pt-8 min-[900px]:border-t-0 min-[900px]:border-l min-[900px]:pt-0 min-[900px]:pl-10"
        >
          <p className="font-display text-2xl">{t.ask}</p>
          <p className="text-house-shell/75 mt-2 text-base leading-relaxed text-pretty">
            {t.askNote}
          </p>
          <ul className="mt-5 flex flex-col">
            {contactChannels(locale).map(
              ({ icon: Icon, prefix, label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-house-shell inline-flex min-h-11 items-center gap-3 text-base underline-offset-4 hover:underline"
                  >
                    <Icon aria-hidden className="size-4 shrink-0" />
                    <span className="sr-only">{prefix}: </span>
                    {label}
                    {external && (
                      <span className="sr-only"> {t.newTab}</span>
                    )}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
