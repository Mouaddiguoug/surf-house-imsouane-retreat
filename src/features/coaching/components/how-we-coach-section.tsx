import type { Locale } from "@/lib/i18n/locale";

/**
 * The method, in the order a guest meets it — from the questionnaire before
 * the flight to the folder of clips after it. Chronology rather than a list
 * of features, because "how we coach" is a question about what happens.
 */
const COPY = {
  en: {
    label: "The week, step by step",
    title: "Six things happen, in this order",
    intro:
      "From the questionnaire before you fly to the folder of clips you leave with — chronology rather than a list of features, because “how we coach” is a question about what actually happens.",
    steps: [
      {
        title: "It starts before you fly",
        body: "A short questionnaire — where you have surfed, what you can do on a wave, what you want to be able to do — and a prep pack of drills and reading so the first morning is not spent finding out.",
      },
      {
        title: "One goal, set at the Sunday dinner",
        body: "You tell the coaches what a good week would look like: a first green wave, a take-off that repeats, speed down the line, a first cutback, the walk to the nose. That sentence is the syllabus.",
      },
      {
        title: "Small groups, sorted by level",
        body: "Levels are drawn up over the same table, so nobody is held back by the group or thrown in ahead of it. The coach knows your name, your goal, and which of the two waves suits you today.",
      },
      {
        title: "Coached in the water, not shouted from the sand",
        body: "The coach paddles out with you: positioning in the line-up, wave selection, the timing of the take-off. Corrections arrive one at a time, while the last wave is still fresh.",
      },
      {
        title: "Filmed from the beach, reviewed after dinner",
        body: "Every session is filmed. In the evening your clips go up on the screen and you watch yourself surf — and fix the things you cannot feel from the inside. Style, stance, the moment you look down.",
      },
      {
        title: "Theory in the evenings, progress you take home",
        body: "Short sessions on reading the forecast, choosing a board, and the etiquette of a crowded point. On Friday your progress is read back against Sunday's goal, and your clips and notes leave with you.",
      },
    ],
  },
  fr: {
    label: "La semaine, étape par étape",
    title: "Six étapes, dans cet ordre",
    intro:
      "Du questionnaire avant ton départ au dossier de vidéos que tu emportes — une chronologie plutôt qu'une liste de prestations, parce que « notre méthode », c'est ce qui se passe vraiment.",
    steps: [
      {
        title: "Tout commence avant ton départ",
        body: "Un court questionnaire — où tu as surfé, ce que tu sais faire sur une vague, ce que tu veux savoir faire — et un kit de préparation avec exercices et lectures, pour ne pas passer la première matinée à découvrir.",
      },
      {
        title: "Un objectif, fixé au dîner du dimanche",
        body: "Tu dis aux coachs à quoi ressemblerait une bonne semaine : une première vague verte, un take-off qui se répète, de la vitesse sur la vague, un premier cutback, la marche jusqu'au nose. Cette phrase, c'est le programme.",
      },
      {
        title: "Des petits groupes, par niveau",
        body: "Les niveaux se décident autour de la même table : personne n'est freiné par le groupe ni lancé trop tôt. Le coach connaît ton prénom, ton objectif et la vague qui te convient aujourd'hui.",
      },
      {
        title: "Coaché dans l'eau, pas depuis le sable",
        body: "Le coach rame avec toi : le placement au line-up, le choix de la vague, le timing du take-off. Les corrections arrivent une à une, tant que la dernière vague est encore fraîche.",
      },
      {
        title: "Filmé depuis la plage, revu après le dîner",
        body: "Chaque séance est filmée. Le soir, tes vidéos passent à l'écran et tu te regardes surfer — pour corriger ce que tu ne sens pas de l'intérieur. Le style, la posture, le moment où tu baisses les yeux.",
      },
      {
        title: "De la théorie le soir, des progrès à emporter",
        body: "De courtes séances sur la lecture des prévisions, le choix d'une planche et l'étiquette sur une pointe fréquentée. Le vendredi, tes progrès sont relus au regard de l'objectif du dimanche, et tes vidéos et tes notes repartent avec toi.",
      },
    ],
  },
} as const satisfies Record<Locale, unknown>;

/**
 * The week, step by step — the body of the coaching page.
 *
 * Cream under the hero's dusk gradient, so the page steps from dark to
 * light exactly where the claim gives way to the detail. The heading and
 * the three numbers live in the hero above; this section is the six steps
 * and nothing else, and the numerals do the visual work.
 */
export function HowWeCoachSection({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <section
      id="how-we-coach"
      className="bg-background text-foreground px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-house-muted text-xs font-semibold tracking-[0.16em] uppercase">
            {t.label}
          </p>
          <h2 className="font-display mt-4 text-3xl leading-[1.1] text-balance sm:text-4xl">
            {t.title}
          </h2>
          <p className="text-muted-foreground mt-4 text-base leading-relaxed text-pretty">
            {t.intro}
          </p>
        </div>

        <ol className="border-border mt-14 grid gap-x-16 gap-y-12 border-t pt-12 md:grid-cols-2">
          {t.steps.map((step, index) => (
            <li key={step.title} className="flex gap-5">
              {/* A real numeral in the tree, so the order survives a
                  screen reader and a copy-paste. */}
              <span
                aria-hidden
                className="text-house-clay font-mono text-sm tracking-[0.18em] tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl leading-snug text-balance">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
