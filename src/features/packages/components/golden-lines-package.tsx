import { PackageFeature } from "@/features/packages/components/package-feature";
import { PackageHero } from "@/features/packages/components/package-hero";
import { packageBySlug } from "@/features/packages/data/packages";
import type { Locale } from "@/lib/i18n/locale";

/**
 * The moves the programme is built around, in the order they are learned.
 * Surf vocabulary, the same in both languages.
 */
const GOALS = ["Trim", "Cross-step", "Hang five", "Hang ten"];

const COPY = {
  en: {
    lede: "Imsouane is a long, patient right — the wave the log was designed for. Golden Lines is the House's longboard programme in the making: grace over power, the walk to the nose, and the flow that holds a whole ride together. Longboard is a discipline, not a level.",
    style: {
      eyebrow: "The idea · Style",
      title: "Style you can see",
      body: "On a log, style is the whole point, and style cannot be corrected from the inside — you have to see it. The stance, the trim, the moment you look down, the step that came half a beat late: watching your own rides is how the programme is meant to work on them.",
      alt: "A longboarder trimming along the face of a green wave at Imsouane, with the rest of the group waiting in the line-up behind.",
    },
    footwork: {
      eyebrow: "The idea · Footwork",
      title: "The footwork, on dry land",
      body: "On a surf skate a movement can be repeated a hundred times in an hour, and the ocean is not deciding when you get another go. Trim, then the cross-step, then the walk — so the dance is already in the legs by the time you carry the board down to the point.",
      alt: "A surfer cross-stepping along a surf skate on a concrete ramp outside the house, watched by the rest of the group.",
    },
    board: {
      eyebrow: "The idea · The board",
      title: "Where the longboard came from",
      body: "What a single fin actually does, and how an outline dictates the way a board behaves under you. Not history for its own sake: knowing why the board wants what it wants is what turns a lucky nose ride into one you can repeat.",
      alt: "The group on the sand with their longboards before a session, listening to a coach read the bay.",
    },
    closing: {
      heading: "Interested in Golden Lines?",
      body: "The programme's details and editions are still being confirmed. Write to us and we'll tell you where things stand.",
    },
  },
  fr: {
    lede: "Imsouane est une droite longue et patiente — la vague pour laquelle le longboard a été dessiné. Golden Lines est le programme longboard de la House en préparation : la grâce plutôt que la puissance, la marche jusqu'au nose, et le flow qui tient toute une vague. Le longboard est une discipline, pas un niveau.",
    style: {
      eyebrow: "L'idée · Le style",
      title: "Un style qui se voit",
      body: "En longboard, le style est tout, et le style ne se corrige pas de l'intérieur — il faut le voir. La posture, le trim, le moment où tu baisses les yeux, le pas qui arrive une demi-seconde trop tard : regarder tes propres vagues, c'est ainsi que le programme veut les travailler.",
      alt: "Un longboarder en trim sur la face d'une vague verte à Imsouane, le reste du groupe attendant au line-up derrière.",
    },
    footwork: {
      eyebrow: "L'idée · Les pieds",
      title: "Le jeu de pieds, sur la terre ferme",
      body: "Sur un surfskate, un mouvement se répète cent fois en une heure, et ce n'est pas l'océan qui décide quand tu as droit à un nouvel essai. Le trim, puis le cross-step, puis la marche — pour que la danse soit déjà dans les jambes quand tu descends la planche jusqu'à la pointe.",
      alt: "Un surfeur en cross-step sur un surfskate, sur une rampe en béton devant la maison, sous le regard du groupe.",
    },
    board: {
      eyebrow: "L'idée · La planche",
      title: "D'où vient le longboard",
      body: "Ce que fait réellement une simple dérive, et comment un outline dicte le comportement d'une planche sous tes pieds. Pas de l'histoire pour l'histoire : comprendre ce que veut la planche, c'est ce qui transforme un nose ride chanceux en un nose ride que tu peux refaire.",
      alt: "Le groupe sur le sable avec ses longboards avant une session, à l'écoute d'un coach qui lit la baie.",
    },
    closing: {
      heading: "Golden Lines t'intéresse ?",
      body: "Les modalités et les éditions du programme restent à confirmer. Écris-nous et on te dira où on en est.",
    },
  },
} as const satisfies Record<Locale, unknown>;

/** The closing strip's lines, which the route renders. */
export function goldenLinesClosing(locale: Locale) {
  return COPY[locale].closing;
}

/**
 * Golden Lines, the House's longboard concept, as the body of its own page.
 *
 * It grew out of the Classic Longboard week, and keeps that page's three
 * ideas — see your style, drill the footwork on land, know your board — but
 * not its timetable: the programme's details and editions are still being
 * confirmed, so nothing here is a schedule, a coaching commitment or a date.
 * The words describe what the programme is about, not what a booking buys.
 */
export function GoldenLinesPackage({ locale = "en" }: { locale?: Locale }) {
  const pkg = packageBySlug("golden-lines", locale);
  const t = COPY[locale];

  return (
    <>
      <PackageHero
        package={pkg}
        id="golden-lines"
        tone="cream"
        lede={t.lede}
        locale={locale}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {GOALS.map((goal) => (
            <li
              key={goal}
              className="border-house-ink text-house-ink rounded-sm border px-3 py-1 text-label font-semibold tracking-[0.16em] uppercase"
            >
              {goal}
            </li>
          ))}
        </ul>
      </PackageHero>

      <PackageFeature
        id="style"
        tone="sand"
        side="left"
        eyebrow={t.style.eyebrow}
        title={t.style.title}
        body={t.style.body}
        frames={[{ src: "/assets/video_analysis.JPG", alt: t.style.alt }]}
      />

      <PackageFeature
        id="footwork"
        tone="cream"
        side="right"
        eyebrow={t.footwork.eyebrow}
        title={t.footwork.title}
        body={t.footwork.body}
        frames={[{ src: "/assets/skateboard.JPG", alt: t.footwork.alt }]}
      />

      <PackageFeature
        id="the-board"
        tone="sand"
        side="left"
        eyebrow={t.board.eyebrow}
        title={t.board.title}
        body={t.board.body}
        frames={[{ src: "/assets/evening_theory.jpg", alt: t.board.alt }]}
      />
    </>
  );
}
