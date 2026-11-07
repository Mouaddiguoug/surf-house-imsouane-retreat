import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

import { WHATSAPP_HREF } from "@/components/shared/contact-channels";
import { buttonVariants } from "@/components/ui/button";
import { SITE } from "@/lib/constants/site";
import { localizeHref, type Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

/**
 * Every word on the page, in both languages. The headline and lede are the
 * V1.5 handoff's own (PAGES_CTA_SEO_EN.md, MICROCOPY_FR_EN.csv).
 *
 * The steps are the house's process as it actually runs today. The V1.5
 * journey ends in a secure online check of an existing booking; that does
 * not exist yet, so the verified route is a person, and the page says so
 * rather than showing a form that pretends to check anything.
 */
const COPY = {
  en: {
    label: "Already booked",
    title: "Add activities to your stay",
    lede: "Your accommodation is already booked. Add activities without booking it again.",
    whatsapp: "Message us on WhatsApp",
    email: "Email us",
    subject: "Adding activities to my booking",
    newStay: "Planning a new stay instead?",
    newStayLink: "Start with Custom Surf",
    how: "How it works",
    steps: [
      {
        title: "Tell us about your booking",
        body: "Send us the name and dates on your booking, on WhatsApp or by email.",
      },
      {
        title: "We check what's included",
        body: "We look up your stay and what it already includes, so nothing you have paid for is offered again.",
      },
      {
        title: "Choose your activities",
        body: "Pick from the activities free on your dates — only ones that are not already part of your stay.",
      },
      {
        title: "Pay only for what's new",
        body: "You see and pay for the added activities alone. Your room and your meals are never charged again.",
      },
    ],
    add: "What you can add",
    activities: [
      "Group surf lesson with Imsouane Surf Academy, 2 hours",
      "Private surf coaching, 2 hours",
      "Surfboard or wetsuit rental, by the day",
      "Morning or evening yoga",
      "Surfskate sessions",
    ],
    terms:
      "Every activity is optional, charged separately at its public price and subject to availability. Activities take place on the full days between arrival and departure.",
    policy: "Cancellation & refund policy",
    newTab: "(opens in a new tab)",
  },
  fr: {
    label: "Déjà réservé",
    title: "Ajouter des activités à ton séjour",
    lede: "Ton hébergement est déjà réservé. Ajoute des activités sans le réserver à nouveau.",
    whatsapp: "Nous écrire sur WhatsApp",
    email: "Nous écrire par e-mail",
    subject: "Ajouter des activités à ma réservation",
    newStay: "Tu prépares plutôt un nouveau séjour ?",
    newStayLink: "Commence par Custom Surf",
    how: "Comment ça marche",
    steps: [
      {
        title: "Parle-nous de ta réservation",
        body: "Envoie-nous le nom et les dates de ta réservation, sur WhatsApp ou par e-mail.",
      },
      {
        title: "On vérifie ce qui est inclus",
        body: "On retrouve ton séjour et ce qu'il comprend déjà, pour que rien de ce que tu as payé ne te soit proposé une seconde fois.",
      },
      {
        title: "Choisis tes activités",
        body: "Parmi les activités disponibles à tes dates — uniquement celles qui ne font pas déjà partie de ton séjour.",
      },
      {
        title: "Ne paie que ce qui est nouveau",
        body: "Tu vois et tu paies uniquement les activités ajoutées. Ta chambre et tes repas ne sont jamais facturés à nouveau.",
      },
    ],
    add: "Ce que tu peux ajouter",
    activities: [
      "Cours collectif de surf avec Imsouane Surf Academy, 2 heures",
      "Coaching privé de surf, 2 heures",
      "Location de planche ou de combinaison à la journée",
      "Yoga du matin ou du soir",
      "Séances de surfskate",
    ],
    terms:
      "Chaque activité est facultative, facturée séparément à son tarif public et selon les disponibilités. Les activités ont lieu les jours pleins entre l'arrivée et le départ.",
    policy: "Politique d'annulation et de remboursement",
    newTab: "(s'ouvre dans un nouvel onglet)",
  },
} as const satisfies Record<Locale, unknown>;

/**
 * Already booked: add activities without booking the room again.
 *
 * Not a product, so it does not use the product hero. A plain editorial page
 * in the site's grid: the promise and the way to act on the left, the steps
 * and what can be added on the right. The one guarantee this page exists to
 * make — the room is not sold twice — is said in the lede and again in the
 * last step, where the reader is deciding.
 */
export function UpgradePage({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];

  return (
    <section className="page-section pt-28 sm:pt-32 min-[900px]:pt-40">
      <div className="page-wrap grid gap-12 min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] min-[900px]:gap-16">
        <div className="min-[900px]:sticky min-[900px]:top-28 min-[900px]:self-start">
          <p className="text-house-muted text-sm font-semibold tracking-[0.16em]">
            {t.label}
          </p>
          <h1 className="font-display mt-5 text-[clamp(2.375rem,5vw,4.5rem)] leading-[1] tracking-[-0.025em] text-balance">
            {t.title}
          </h1>
          <p className="text-house-muted mt-6 max-w-[36ch] text-lg leading-relaxed text-pretty">
            {t.lede}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "clay" }),
                "h-12 gap-2 px-6 text-xs",
              )}
            >
              <MessageCircle aria-hidden className="size-4" />
              {t.whatsapp}
              <span className="sr-only"> {t.newTab}</span>
            </a>
            <a
              href={`mailto:${SITE.contact.email}?subject=${encodeURIComponent(t.subject)}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-house-ink h-12 gap-2 rounded-xl px-6 text-xs font-semibold tracking-[0.14em] uppercase",
              )}
            >
              <Mail aria-hidden className="size-4" />
              {t.email}
            </a>
          </div>

          <p className="text-house-muted mt-8 text-sm leading-relaxed text-pretty">
            {t.newStay}{" "}
            <Link
              href={localizeHref("/custom-surf", locale)}
              className="text-house-ink underline underline-offset-4"
            >
              {t.newStayLink}
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="font-display text-3xl leading-tight">{t.how}</h2>
          <ol className="border-house-ink mt-6 border-t">
            {t.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-house-ink/20 grid grid-cols-[3rem_minmax(0,1fr)] gap-4 border-b py-6 sm:grid-cols-[4.5rem_minmax(0,1fr)]"
              >
                <span
                  aria-hidden
                  className="font-display text-house-terracotta text-4xl leading-none"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-house-muted mt-2 text-base leading-relaxed text-pretty">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="font-display mt-14 text-3xl leading-tight">{t.add}</h2>
          <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {t.activities.map((activity) => (
              <li
                key={activity}
                className="border-house-ink/20 border-b py-3 text-base"
              >
                {activity}
              </li>
            ))}
          </ul>
          <p className="text-house-muted mt-6 text-sm leading-relaxed text-pretty">
            {t.terms}
          </p>

          <Link
            href={localizeHref("/legal/refunds", locale)}
            className="text-house-ink mt-8 inline-flex min-h-11 items-center gap-1.5 text-sm underline underline-offset-4"
          >
            {t.policy}
          </Link>
        </div>
      </div>
    </section>
  );
}
