"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import { OptionalQuestion } from "@/features/home/components/optional-question";
import { localizeHref } from "@/lib/i18n/locale";
import { useLocale } from "@/lib/i18n/use-locale";

const linkClass =
  "mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold tracking-[0.14em] uppercase underline-offset-4 hover:underline";

/**
 * Both questions in both languages. Legends and options are the V1.5
 * microcopy (MICROCOPY_FR_EN.csv); the notes are written to match it.
 *
 * Level notes are orientation only: no level is certified, no product is
 * chosen for the reader, and Custom Surf stays one tap away whatever the
 * answer. Longboard is a discipline, so it is not a level here.
 */
const COPY = {
  en: {
    level: {
      legend: "What is your surf level? (optional)",
      options: {
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced",
        unsure: "Not sure",
      },
      notes: {
        beginner:
          "Group lessons with Imsouane Surf Academy are where most people start, and you can add them to your stay with Custom Surf.",
        intermediate:
          "Group sessions or private coaching can be added to your stay, to work on what comes next.",
        advanced:
          "Rent a board and surf on your own, or add private coaching when you want an outside eye.",
        unsure: "That's a perfectly good answer.",
      },
      shared:
        "Your level helps start the conversation; the team will confirm the right approach.",
      link: "Explore Custom Surf",
    },
    booked: {
      legend: "Already booked? (optional)",
      options: { yes: "Yes", no: "No", unsure: "Not sure" },
      yes: "Add activities to your stay. Your accommodation will not be sold again.",
      yesLink: "Add activities only",
      no: "Start with The Original Stay: your room and half-board.",
      noLink: "Explore your stay",
      unsure:
        "Your confirmation email will say. Or write to us and we'll look it up with you.",
      unsureLink: "Ask on WhatsApp",
    },
    reset: "Reset answer",
    cleared: "Answer cleared.",
    newTab: "(opens in a new tab)",
  },
  fr: {
    level: {
      legend: "Quel est ton niveau de surf ? (facultatif)",
      options: {
        beginner: "Débutant",
        intermediate: "Intermédiaire",
        advanced: "Confirmé",
        unsure: "Je ne sais pas",
      },
      notes: {
        beginner:
          "La plupart commencent par les cours collectifs d'Imsouane Surf Academy, que tu peux ajouter à ton séjour avec Custom Surf.",
        intermediate:
          "Des séances collectives ou du coaching privé peuvent s'ajouter à ton séjour, pour travailler la suite.",
        advanced:
          "Loue une planche et surfe en autonomie, ou ajoute du coaching privé quand tu veux un regard extérieur.",
        unsure: "C'est une réponse tout à fait valable.",
      },
      shared:
        "Ton niveau aide à ouvrir la discussion ; l'équipe confirmera l'approche adaptée.",
      link: "Découvrir Custom Surf",
    },
    booked: {
      legend: "Tu as déjà réservé ? (facultatif)",
      options: { yes: "Oui", no: "Non", unsure: "Je ne sais pas" },
      yes: "Ajoute des activités à ton séjour. Ton hébergement ne sera pas revendu.",
      yesLink: "Ajouter uniquement des activités",
      no: "Commence par The Original Stay : ta chambre et la demi-pension.",
      noLink: "Découvrir ton séjour",
      unsure:
        "Ton e-mail de confirmation te le dira. Sinon, écris-nous et on vérifie avec toi.",
      unsureLink: "Demander sur WhatsApp",
    },
    reset: "Effacer la réponse",
    cleared: "Réponse effacée.",
    newTab: "(s'ouvre dans un nouvel onglet)",
  },
} as const;

export function LevelQuestion({ className }: { className?: string }) {
  const locale = useLocale();
  const t = COPY[locale];
  const level = t.level;

  return (
    <OptionalQuestion
      className={className}
      name="surf-level"
      legend={level.legend}
      resetLabel={t.reset}
      clearedLabel={t.cleared}
      options={(
        ["beginner", "intermediate", "advanced", "unsure"] as const
      ).map((value) => ({ value, label: level.options[value] }))}
      renderResult={(value) => (
        <>
          <p className="text-pretty">
            {level.notes[value as keyof typeof level.notes]} {level.shared}
          </p>
          <Link
            href={localizeHref("/custom-surf", locale)}
            className={linkClass}
          >
            {level.link}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </>
      )}
    />
  );
}

/**
 * For guests who may already have a room. "Yes" leads only to adding
 * activities, with the promise that the room is not sold twice; "No" leads
 * to the stay; "Not sure" offers a person, not a purchase.
 */
export function BookedQuestion({ className }: { className?: string }) {
  const locale = useLocale();
  const t = COPY[locale];
  const booked = t.booked;

  return (
    <OptionalQuestion
      className={className}
      name="already-booked"
      legend={booked.legend}
      resetLabel={t.reset}
      clearedLabel={t.cleared}
      options={(["yes", "no", "unsure"] as const).map((value) => ({
        value,
        label: booked.options[value],
      }))}
      renderResult={(value) =>
        value === "yes" ? (
          <>
            <p>{booked.yes}</p>
            <Link href={localizeHref("/upgrade", locale)} className={linkClass}>
              {booked.yesLink}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </>
        ) : value === "no" ? (
          <>
            <p>{booked.no}</p>
            <Link
              href={localizeHref("/original-stay", locale)}
              className={linkClass}
            >
              {booked.noLink}
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </>
        ) : (
          <>
            <p className="text-pretty">{booked.unsure}</p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              {booked.unsureLink}
              <ArrowRight aria-hidden className="size-4" />
              <span className="sr-only"> {t.newTab}</span>
            </a>
          </>
        )
      }
    />
  );
}
