import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { contactChannels } from "@/components/shared/contact-channels";
import {
  HeroVideo,
  type HeroVideoSource,
} from "@/components/shared/hero-video";
import { buttonVariants } from "@/components/ui/button";
import {
  BookedQuestion,
  LevelQuestion,
} from "@/features/home/components/home-questions";
import { FAQ } from "@/features/home/data/faq";
import {
  PACKAGE_UI,
  euros,
  perLabel,
} from "@/features/packages/data/package-ui";
import { packageBySlug } from "@/features/packages/data/packages";
import { ReviewTrack } from "@/features/reviews/components/review-track";
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
      tags: ["A stay by the ocean", "Surf, if you choose"],
      place: ["Imsouane Bay", "Morocco"],
      lead: "A house in Imsouane. A stay by the ocean, with surf experiences you can choose.",
    },
    place: {
      band: "The place comes first.",
      title: "The Place. The People. The Ocean.",
      lead: "Discover Imsouane through its coastline, its village and the people who call it home.",
      link: "Discover the place",
      alt: "The point at Imsouane from the cliff path, the village and the harbour wall on the far headland across grey water.",
      waveAlt:
        "A surfer riding the long right-hander at Imsouane at dusk while another sits on a board waiting, the water flat and silver in front.",
      peopleAlt:
        "A girl in a pink skirt riding a skateboard down a concrete ramp in the village while friends and neighbours stand and watch.",
      oceanAlt:
        "The Atlantic from above: green water breaking into white foam as it runs up the dark sand.",
      words: ["The Place.", "The People.", "The Ocean."],
    },
    surf: {
      band: "A conversation with the ocean.",
      bandParts: ["A ", "conversation", " with the ocean."],
      // The home cards' own photographs; each package page keeps its own.
      photos: {
        "custom-surf":
          "Two surfers walking across the wet sand with their boards under their arms, a hazy headland behind them and another surfer at the water's edge.",
        foundation:
          "A group of surfers sitting on their boards in the water at sunset, the sky streaked pink and orange above them.",
        "golden-lines":
          "A surfer in a black wetsuit riding a small wave at Imsouane, the village houses stacked along the cliff behind.",
      },
    },
    house: {
      band: "A house to come back to.",
      lead: "Accommodation and half-board at the House. Academy activities are optional and billed separately.",
      perPerson: "per person",
      button: "Explore your stay",
      livingAlt:
        "An apartment living room: a grey corner sofa and wooden coffee table, a dining table and chairs, a woven palm pendant lamp, and the bedroom visible through a wide arch.",
      location: "Location",
      locationSr:
        "Booking.com location score: 9.4 out of 10 (opens in a new tab)",
    },
    life: {
      title: "A little more life together",
      lead: "Shared meals, conversations and time to unwind.",
      leadMore:
        "Between sessions the house is where the day slows down: a living room with boards on the walls, a rooftop over the bay, and a long table for the evening.",
      introAlt:
        "The house's common room in morning light: red rugs and low sofas, surfboards on the walls and a bright row of windows.",
      note: "Breakfast and dinner are part of every stay at the House.",
      noteLink: "Explore your stay",
      moments: [
        {
          title: "Coffee and a surf check",
          body: "The bay is about thirty metres from the door. Take your coffee down, watch a few sets roll through, and decide whether the morning is for surfing or for taking it slow.",
          src: "/assets/auction_1.jpg",
          alt: "The stone steps down the cliff to the beach at Imsouane, the bay curving away below and the village on the headland beyond.",
        },
        {
          title: "Breakfast at the table",
          body: "Breakfast is included and served at a set time, so the house sits down together. It is the easiest way to meet the people you will share the water with.",
          src: "/assets/book-a-stay/6.jpg",
          alt: "The common room with its dining tables set by the windows, rugs on the floor and surfboards propped against the walls.",
        },
        {
          title: "A rooftop over both spots",
          body: "From the roof you can see both surf spots. There are mats and a few weights up there for a stretch, a session of your own, or a class when one is on.",
          src: "/assets/yoga_session.jpg",
          alt: "A small group sitting cross-legged on mats on the rooftop, facing a teacher, the sea bright behind the railing.",
        },
        {
          title: "Sunset Tea",
          body: "Every afternoon, a cup of tea and a little homemade-style treat, offered by the house, as the day comes to an end. Share your surf stories, meet someone new, or simply enjoy the moment.",
          src: "/assets/rooftop.JPG",
          alt: "The rooftop terrace at dusk: low seating and rugs around a table, the village rooftops and the bay stretching out beyond.",
        },
        {
          title: "Dinner, together",
          body: "Half-board means the evening ends where the morning started: around the long table, with dinner from the house and the day's waves still being talked over.",
          src: "/assets/surf_fuel.jpg",
          alt: "Guests at the long table inside the house, mid-meal, a surfboard leaning in the foreground and the house dog underfoot.",
        },
      ],
    },
    people: {
      title: "Real people. Clear answers.",
      guests: "From our guests",
      guestsNote:
        "Quoted word for word from the platforms they were left on. Every score links to its source.",
      reviewsSr: "reviews (opens in a new tab)",
      track: {
        region: "Guest reviews, scroll sideways for more",
        previous: "Previous review",
        next: "Next review",
        from: "on",
        newTab: "(opens in a new tab)",
      },
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
      tags: ["Un séjour près de l'océan", "Le surf, si tu veux"],
      place: ["Baie d'Imsouane", "Maroc"],
      lead: "Une maison à Imsouane. Un séjour près de l'océan, avec les expériences surf que tu choisis.",
    },
    place: {
      band: "Le lieu d'abord.",
      title: "Le lieu. Les gens. L'océan.",
      lead: "Découvre Imsouane à travers son littoral, son village et celles et ceux qui y vivent.",
      link: "Découvrir le lieu",
      alt: "La pointe d'Imsouane depuis le chemin de la falaise, le village et la digue du port de l'autre côté d'une eau grise.",
      waveAlt:
        "Un surfeur sur la longue droite d'Imsouane au crépuscule, un autre assis sur sa planche qui attend, l'eau plate et argentée au premier plan.",
      peopleAlt:
        "Une fille en jupe rose descend une rampe en béton en skateboard dans le village, sous le regard d'amis et de voisins.",
      oceanAlt:
        "L'Atlantique vu d'en haut : une eau verte qui se brise en écume blanche en remontant sur le sable sombre.",
      words: ["Le lieu.", "Les gens.", "L'océan."],
    },
    surf: {
      band: "Une conversation avec l'océan.",
      bandParts: ["Une ", "conversation", " avec l'océan."],
      photos: {
        "custom-surf":
          "Deux surfeurs traversent le sable mouillé, planche sous le bras, un promontoire dans la brume derrière eux et un autre surfeur au bord de l'eau.",
        foundation:
          "Un groupe de surfeurs assis sur leur planche dans l'eau au coucher du soleil, le ciel strié de rose et d'orange au-dessus d'eux.",
        "golden-lines":
          "Un surfeur en combinaison noire sur une petite vague à Imsouane, les maisons du village accrochées à la falaise derrière.",
      },
    },
    house: {
      band: "Une maison où revenir.",
      lead: "L'hébergement et la demi-pension à la House. Les activités Academy sont facultatives et facturées séparément.",
      perPerson: "par personne",
      button: "Découvrir ton séjour",
      livingAlt:
        "Le salon d'un appartement : un canapé d'angle gris et une table basse en bois, une table à manger et des chaises, une suspension en palmier tressé, et la chambre visible par une large arche.",
      location: "Emplacement",
      locationSr:
        "Note d'emplacement sur Booking.com : 9,4 sur 10 (s'ouvre dans un nouvel onglet)",
    },
    life: {
      title: "Un peu plus de vie ensemble",
      lead: "Des repas partagés, des conversations et le temps de souffler.",
      leadMore:
        "Entre deux sessions, la maison est l'endroit où la journée ralentit : un salon aux planches accrochées aux murs, un toit au-dessus de la baie, et une grande table pour le soir.",
      introAlt:
        "La salle commune de la maison dans la lumière du matin : tapis rouges et banquettes basses, planches de surf aux murs et une rangée de fenêtres lumineuses.",
      note: "Le petit-déjeuner et le dîner font partie de chaque séjour à la House.",
      noteLink: "Découvrir ton séjour",
      moments: [
        {
          title: "Café et check des vagues",
          body: "La baie est à une trentaine de mètres de la porte. Descends avec ton café, regarde passer quelques séries, et décide si la matinée sera pour surfer ou pour prendre ton temps.",
          src: "/assets/auction_1.jpg",
          alt: "Les marches de pierre qui descendent la falaise vers la plage d'Imsouane, la baie en contrebas et le village sur le promontoire.",
        },
        {
          title: "Le petit-déjeuner à table",
          body: "Le petit-déjeuner est inclus et servi à heure fixe : toute la maison s'attable en même temps. C'est la façon la plus simple de rencontrer celles et ceux avec qui tu partageras l'eau.",
          src: "/assets/book-a-stay/6.jpg",
          alt: "La salle commune avec ses tables près des fenêtres, des tapis au sol et des planches de surf appuyées contre les murs.",
        },
        {
          title: "Un toit face aux deux spots",
          body: "Depuis le toit, on voit les deux spots. Des tapis et quelques poids t'y attendent pour t'étirer, faire ta propre séance, ou suivre un cours quand il y en a un.",
          src: "/assets/yoga_session.jpg",
          alt: "Un petit groupe assis en tailleur sur des tapis sur le toit, face à une enseignante, la mer lumineuse derrière la rambarde.",
        },
        {
          title: "Sunset Tea",
          body: "Chaque après-midi, un thé et une petite douceur maison, offerts par la maison, au moment où la journée se termine. Raconte ta session, rencontre quelqu'un de nouveau ou profite simplement du moment.",
          src: "/assets/rooftop.JPG",
          alt: "Le toit-terrasse au crépuscule : banquettes basses et tapis autour d'une table, les toits du village et la baie au-delà.",
        },
        {
          title: "Le dîner, ensemble",
          body: "Avec la demi-pension, la soirée finit là où la matinée a commencé : autour de la grande table, avec le dîner de la maison et les vagues du jour qu'on refait encore.",
          src: "/assets/surf_fuel.jpg",
          alt: "Des invités à la grande table de la maison, en plein repas, une planche de surf au premier plan et le chien de la maison sous la table.",
        },
      ],
    },
    people: {
      title: "Des personnes. Des réponses claires.",
      guests: "Ce que disent nos voyageurs",
      guestsNote:
        "Cités mot pour mot, dans la langue où ils ont été écrits, depuis les plateformes où ils ont été laissés. Chaque note renvoie à sa source.",
      reviewsSr: "avis (s'ouvre dans un nouvel onglet)",
      track: {
        region: "Avis de voyageurs, fais défiler sur le côté pour en lire plus",
        previous: "Avis précédent",
        next: "Avis suivant",
        from: "sur",
        newTab: "(s'ouvre dans un nouvel onglet)",
      },
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

const textLink =
  "inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase underline-offset-4 hover:underline";

/** The 7:5 grid every chapter body uses from 900px. */
const SEVEN_FIVE =
  "grid gap-10 min-[900px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] min-[900px]:gap-16";

/** The three paths every visitor is offered, in the hero and at the close. */
const PATH_HREFS = ["/original-stay", "/custom-surf", "/upgrade"] as const;

type ChapterProps = { locale: Locale };

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
    <section
      id="hero"
      className="hero-pinned sticky top-0 isolate flex h-svh min-h-[34rem] flex-col justify-end overflow-hidden bg-house-deep text-house-shell"
    >
      {/* The bay, full bleed and behind everything. The navbar floats over
          it transparent until the page is scrolled. */}
      <HeroVideo
        sources={sources}
        poster={poster}
        className="hero-footage absolute inset-0 -z-20 size-full object-cover"
      />
      {/* Two scrims from Deep Night: a short one under the navbar, and a
          longer one rising from the foot, so the labels and the wordmark
          hold contrast when the frame turns to foam. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--color-house-deep)_55%,transparent)_0%,transparent_22%,transparent_45%,color-mix(in_srgb,var(--color-house-deep)_60%,transparent)_100%)]"
      />

      {/* Deepens as the page rises over the hero (hero-dusk in globals.css),
          so the sand edge lands on a darkening frame. Clear at rest. */}
      <div
        aria-hidden
        className="hero-dusk absolute inset-0 -z-10 bg-house-deep opacity-0"
      />

      <div className="hero-copy page-wrap pb-[clamp(0.75rem,2vw,1.75rem)]">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 text-[clamp(0.9375rem,1.35vw,1.25rem)] leading-tight font-medium [text-shadow:0_1px_12px_color-mix(in_srgb,var(--color-house-deep)_45%,transparent)]">
          <p className="flex flex-wrap gap-x-[1.1em]">
            {t.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </p>
          <p className="flex flex-wrap gap-x-[1.1em]">
            {t.place.map((part) => (
              <span key={part}>{part}</span>
            ))}
          </p>
        </div>

        {/* The wordmark is sized against its own column (cqi), so it runs
            edge to edge of the page wrap at every width. */}
        <h1 className="hero-wordmark mt-[clamp(0.25rem,1vw,0.75rem)] @container">
          <span aria-hidden className="block overflow-hidden pb-[0.02em]">
            <span className="hero-wordmark-text block font-display">
              Surf House
            </span>
          </span>
          <span className="sr-only">Imsouane Surf House — {t.title}</span>
        </h1>
      </div>
    </section>
  );
}

/* 02 ------------------------------------------------------------------ */

export function PlaceChapter({ locale }: ChapterProps) {
  const t = COPY[locale].place;
  const windows = [
    { src: "/assets/auction_2.jpg", alt: t.alt, word: t.words[0] },
    { src: "/assets/skateboard.JPG", alt: t.peopleAlt, word: t.words[1] },
    { src: "/assets/package_day_bg.jpg", alt: t.oceanAlt, word: t.words[2] },
  ];

  return (
    <section id="imsouane" className="page-section">
      {/* Imsouane as a run of windows, after surfmaroc.com's spot pages:
          full-bleed panels, each a clipped view onto a photograph pinned to
          the viewport, so the pictures hold still while the panel edges
          slide past them (place-window in globals.css). The first carries
          the section's heading; the next three spell out its title, one
          word to a window. */}
      <div className="place-window flex items-center justify-center text-center">
        <div aria-hidden className="place-window-media">
          <Image
            src="/assets/imsouane_hero.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-house-deep/45" />
        </div>
        <div className="page-wrap relative text-house-shell">
          <h2 className="font-display mx-auto max-w-[14ch] text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance">
            {t.band}
          </h2>
          <p className="mx-auto mt-6 max-w-[34ch] text-[clamp(1.125rem,1.8vw,1.5rem)] leading-snug text-pretty">
            {t.lead}
          </p>
          <Link
            href={localizeHref("/imsouane", locale)}
            className={cn(
              buttonVariants({ variant: "shellOutline" }),
              "mt-8 h-12 gap-2 border px-6 text-xs",
            )}
          >
            {t.link}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <span className="sr-only">{t.waveAlt}</span>
        </div>
      </div>

      {windows.map((w) => (
        <div key={w.src} className="place-window flex items-end">
          <div className="place-window-media">
            <Image
              src={w.src}
              alt={w.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-house-deep)_65%,transparent),transparent_50%)]"
            />
          </div>
          <p className="page-wrap font-display relative pb-[clamp(1.5rem,5vh,3.5rem)] text-[clamp(2.75rem,9vw,7.5rem)] leading-none tracking-[-0.03em] text-house-shell">
            {w.word}
          </p>
        </div>
      ))}
    </section>
  );
}

/* 03 ------------------------------------------------------------------ */

/** Photographs for the home surf cards, chosen for the stack's 4:5 frame. */
const CARD_PHOTOS = {
  "custom-surf": { src: "/assets/imsouane_2.jpg", position: "30% 50%" },
  foundation: { src: "/assets/imsouan_1.jpg", position: "60% 50%" },
  "golden-lines": { src: "/assets/surf_3.jpg", position: "52% 50%" },
} as const;

export function SurfChapter({ locale }: ChapterProps) {
  const t = COPY[locale].surf;
  const ui = PACKAGE_UI[locale];
  const [before, word, after] = t.bandParts;

  const rows: {
    key: string;
    title: string;
    meta: ReactNode;
    image: { src: string; alt: string; position?: string };
    body: string;
    link: { href: string; label: string };
  }[] = [
    ...(["custom-surf", "foundation", "golden-lines"] as const).map((slug) => {
      const entry = packageBySlug(slug, locale);
      return {
        key: slug,
        title: entry.title,
        meta: entry.rates ? (
          <>
            <span className="text-xs font-semibold tracking-[0.16em] uppercase">
              {ui.from}
            </span>{" "}
            <span className="font-display text-2xl">
              {euros(entry.rates.from, locale)}
            </span>{" "}
            <span className="text-house-muted">
              / {perLabel(entry, locale)}
            </span>
          </>
        ) : null,
        image: { ...CARD_PHOTOS[slug], alt: t.photos[slug] },
        body: entry.summary,
        link: { href: entry.href, label: entry.cta },
      };
    }),
  ];

  return (
    <section id="surf" className="page-section">
      {/* After Eagle's Nest's "all-inclusive" list. From 900px the title
          pins under the navbar and each row pins under the title, so the
          next row slides up over the one before it like a card laid on a
          stack (surf-stack in globals.css). The stack is its own block, so
          the title and the rows let go together once the last row is in.
          Below 900px the rows simply follow one another. */}
      <div className="surf-stack page-wrap">
        <div className="surf-head bg-background border-house-ink flex items-end justify-center border-b">
          <h2 className="surf-title font-display text-center tracking-[-0.03em]">
            {before}
            <span className="surf-highlight">{word}</span>
            {after}
          </h2>
        </div>

        {rows.map((row, index) => (
          <article
            key={row.key}
            className={cn(
              "surf-row bg-background grid gap-6 py-8 min-[900px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[900px]:gap-10 min-[900px]:pt-10 min-[900px]:pb-14",
              index > 0 && "border-house-ink border-t",
            )}
          >
            <div>
              <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-balance">
                {row.title}
              </h3>
              {row.meta && <p className="mt-4 text-base">{row.meta}</p>}
            </div>

            <div className="surf-photo relative aspect-4/5 overflow-hidden rounded-sm">
              <Image
                src={row.image.src}
                alt={row.image.alt}
                fill
                sizes="(min-width: 900px) 30vw, 100vw"
                style={{ objectPosition: row.image.position ?? "50% 50%" }}
                className="object-cover"
              />
            </div>

            <div className="min-[900px]:max-w-[26rem] min-[900px]:justify-self-end">
              <p className="text-lg leading-relaxed text-pretty">{row.body}</p>
              <Link href={row.link.href} className={cn(textLink, "mt-6")}>
                {row.link.label}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* The level question closes the section: once the stack has shown
          what there is, the reader can say where they are starting. */}
      <div className="page-wrap border-house-ink border-t pt-10 min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        <LevelQuestion className="min-[900px]:col-start-2" />
      </div>
    </section>
  );
}

/* 05 ------------------------------------------------------------------ */

export function HouseChapter({ locale }: ChapterProps) {
  const t = COPY[locale].house;
  const stay = packageBySlug("original-stay", locale);
  const booking = PLATFORMS.find((p) => p.name === "Booking.com");

  return (
    <section id="house" className="page-section">
      <div className="page-wrap">
        {/* The first thing after the hero is the House. The title huge and
            short, the sentence under it large: the two carry the section,
            so nothing else sits above the photographs. */}
        <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance">
          {t.band}
        </h2>
        <p className="mt-4 max-w-[32ch] text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] font-medium tracking-[-0.025em] text-pretty min-[900px]:mt-6">
          {t.lead}
        </p>

        {/* Three columns from 900px, 3:6:3 on the page's twelve: a small
            landscape at the top left, the tall portrait in the middle, and
            the words at the foot of the right column, level with the
            portrait's lower edge. Below 900px they stack, portrait first. */}
        <div className="mt-12 grid gap-8 min-[900px]:mt-16 min-[900px]:grid-cols-12 min-[900px]:gap-6">
          <div className="parallax-frame relative order-2 aspect-3/2 overflow-hidden rounded-sm max-[899px]:mt-16 min-[900px]:order-none min-[900px]:col-span-3 min-[900px]:self-start">
            <Image
              src="/assets/living_room.JPG"
              alt={t.livingAlt}
              fill
              sizes="(min-width: 900px) 25vw, 100vw"
              className="parallax-img object-cover"
            />
          </div>

          <div className="relative order-1 min-[900px]:order-none min-[900px]:col-span-6">
            <div className="parallax-frame relative aspect-4/5 overflow-hidden rounded-sm">
              <Image
                src={stay.image}
                alt={stay.imageAlt}
                fill
                sizes="(min-width: 900px) 50vw, 100vw"
                className="parallax-img object-cover object-[62%_center]"
              />
            </div>

            {/* The guests' own score for where the house stands (30 m from
                the bay; the theme reviews name most), sitting on
                the photograph's foot. Linked to the listing it comes from. */}
            {booking && (
              <a
                href={booking.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "bg-house-terracotta text-house-shell absolute bottom-0 left-1/2 flex size-28 -translate-x-1/2 translate-y-1/2 flex-col items-center justify-center rounded-full text-center sm:size-32",
                  "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 motion-reduce:transition-none",
                  "focus-visible:ring-house-ink focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                )}
              >
                <span
                  aria-hidden
                  className="font-display text-4xl leading-none sm:text-5xl"
                >
                  9.4
                </span>
                <span
                  aria-hidden
                  className="mt-1.5 text-[0.7rem] font-semibold tracking-[0.16em] uppercase"
                >
                  {t.location}
                </span>
                <span aria-hidden className="text-[0.7rem] opacity-80">
                  Booking.com
                </span>
                <span className="sr-only">{t.locationSr}</span>
              </a>
            )}
          </div>

          {/* The offer starts at the portrait's midpoint and rides down with
              the scroll, held under the navbar, until it reaches the
              portrait's foot. The column is as tall as the row and split
              into two equal rows; the offer sits in the lower one, which is
              also what stops the sticky. */}
          <div className="order-3 min-[900px]:order-none min-[900px]:col-span-3 min-[900px]:grid min-[900px]:grid-rows-2">
            <div className="max-w-[34rem] min-[900px]:sticky min-[900px]:top-28 min-[900px]:row-start-2 min-[900px]:self-start">
              <h3 className="font-display text-2xl leading-[1.2] sm:text-[1.75rem]">
                The Original Stay
              </h3>
              {stay.rates && (
                <p className="border-house-ink/20 mt-5 border-t pt-4 text-base">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 06 ------------------------------------------------------------------ */

export function HouseLifeChapter({ locale }: ChapterProps) {
  const t = COPY[locale].life;
  const stay = packageBySlug("original-stay", locale);

  return (
    <section id="house-life" className="page-section">
      {/* After Eagle's Nest's Cacao Dance page, as one pinned stage. The
          house opens full screen under the title; as the title scrolls up
          and fades, the photograph draws in to a frame in the middle of
          the screen and stays there, and the moments of the day scroll
          past it on the left, each wiping its own photograph up into the
          frame (life-* in globals.css). */}
      <div className="life-stage text-house-shell">
        {/* The pinned frame and the note beside it. Desktop only: below
            900px every moment carries its own photograph instead. */}
        <div className="life-pin">
          <div className="life-frame">
            <div className="life-shot">
              <Image
                src="/assets/book-a-stay/7.jpg"
                alt={t.introAlt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {t.moments.map((moment, index) => (
              <div
                key={moment.src}
                className="life-shot"
                style={{ zIndex: index + 1 }}
              >
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          <div className="life-note">
            <p className="text-lg leading-snug text-pretty">{t.note}</p>
            <Link
              href={stay.href}
              className={cn(
                buttonVariants({ variant: "shellOutline" }),
                "mt-6 h-12 gap-2 border px-6 text-xs",
              )}
            >
              {t.noteLink}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </div>

        <ol className="life-moments">
          {/* The opening: title and lead over the full-screen house. It
              scrolls away like any moment and fades as it goes. On a phone
              it carries its own photograph. */}
          <li className="life-intro relative isolate">
            <div className="absolute inset-0 -z-10 min-[900px]:hidden">
              <Image
                src="/assets/book-a-stay/7.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-house-deep/50" />
            </div>
            <div className="life-intro-copy page-wrap grid gap-6 min-[900px]:grid-cols-2 min-[900px]:gap-16">
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance">
                {t.title}
              </h2>
              <p className="text-[clamp(1.25rem,2.2vw,2rem)] leading-[1.2] font-medium tracking-[-0.02em] text-pretty min-[900px]:pt-3">
                {t.lead} {t.leadMore}
              </p>
            </div>
          </li>
          {t.moments.map((moment) => (
            <li key={moment.src} className="life-moment page-wrap">
              <div className="relative mb-8 aspect-4/3 overflow-hidden rounded-sm min-[900px]:hidden">
                <Image
                  src={moment.src}
                  alt={moment.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="life-moment-title font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em]">
                {moment.title}
              </h3>
              <p className="mt-6 max-w-[30rem] text-lg leading-relaxed text-pretty min-[900px]:mt-8">
                {moment.body}
              </p>
            </li>
          ))}
          <li className="page-wrap pb-16 min-[900px]:hidden">
            <p className="text-lg leading-snug text-pretty">{t.note}</p>
            <Link
              href={stay.href}
              className={cn(
                buttonVariants({ variant: "shellOutline" }),
                "mt-6 h-12 gap-2 border px-6 text-xs",
              )}
            >
              {t.noteLink}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </li>
        </ol>
      </div>

      {/* The booked question, as before, once the day is over. */}
      <div className="page-wrap pt-12 min-[900px]:grid min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
        <BookedQuestion className="min-[900px]:col-start-2" />
      </div>
    </section>
  );
}

/* 07 ------------------------------------------------------------------ */

export function PeopleChapter({ locale }: ChapterProps) {
  const t = COPY[locale].people;
  const reviews = [...REVIEWS_ROW_ONE, ...REVIEWS_ROW_TWO];

  return (
    <section id="people" className="page-section">
      {/* After Eagle's Nest's "What people say": the title large and to the
          right, the platforms' own scores opposite it, then every verified
          quote on one sideways track (ReviewTrack). The questions follow
          on the page's usual grid. */}
      <div className="page-wrap grid gap-10 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:items-end min-[900px]:gap-16">
        <div className="order-2 min-[900px]:order-none">
          <p className="text-house-muted max-w-[34ch] text-base leading-relaxed text-pretty">
            {t.guestsNote}
          </p>
          <ul className="border-house-ink mt-6 grid grid-cols-3 border-t">
            {PLATFORMS.map((platform) => (
              <li
                key={platform.name}
                className="border-house-ink/20 border-r py-4 pr-3 not-first:pl-4 last:border-r-0"
              >
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <span className="font-display block text-2xl sm:text-3xl">
                    {platform.score}
                  </span>
                  <span className="text-house-muted mt-1 flex items-center gap-1 text-xs whitespace-nowrap group-hover:underline sm:text-sm">
                    {platform.name}
                    <ArrowUpRight aria-hidden className="size-3.5" />
                  </span>
                  <span className="text-house-muted block text-xs tabular-nums sm:text-sm">
                    {platform.count}
                  </span>
                  <span className="sr-only"> {t.reviewsSr}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="font-display order-1 text-[clamp(3rem,7.5vw,7rem)] leading-[0.92] tracking-[-0.035em] text-balance min-[900px]:order-none min-[900px]:text-right">
          {t.title}
        </h2>
      </div>

      <div className="mt-14 min-[900px]:mt-20">
        <ReviewTrack reviews={reviews} labels={t.track} />
      </div>

      <div className="page-wrap mt-20 grid gap-6 min-[900px]:mt-28 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-16">
        <div>
          <h3 className="font-display text-2xl">{t.questions}</h3>
          <p className="text-house-muted mt-3 max-w-[30ch] text-base leading-relaxed text-pretty">
            {t.questionsNote}
          </p>
        </div>

        <div className="border-house-ink border-t">
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
                    {external && <span className="sr-only"> {t.newTab}</span>}
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
