import { PackageDay } from "@/features/packages/components/package-day";
import { PackageFeature } from "@/features/packages/components/package-feature";
import { PackageHero } from "@/features/packages/components/package-hero";
import { PackageInclusions } from "@/features/packages/components/package-inclusions";
import { packageBySlug } from "@/features/packages/data/packages";
import type { Locale } from "@/lib/i18n/locale";

/**
 * Every word on the page, in both languages. The English follows the V1.5
 * journey and the house's own copy for the extras; the French follows the
 * handoff's French product lines where they exist (PAGES_CTA_SEO_EN.md) and
 * is written to match them, in "tu", where they do not.
 */
const COPY = {
  en: {
    lede: "Start with The Original Stay — your room, breakfast and dinner, and the daily Sunset Tea — then add the surf you want with Imsouane Surf Academy. Nothing is chosen for you, and every activity is charged at its public price.",
    academy: {
      eyebrow: "Optional · Imsouane Surf Academy",
      title: "Surf if you feel like it",
      body: [
        "Want to learn or improve? Imsouane Surf Academy offers two-hour group lessons and two-hour private coaching, with equipment provided during the lessons you book.",
        "Already comfortable in the water? Rent a board or wetsuit by the day and surf on your own. Yoga and surfskate sessions can be added too.",
        "All of it is optional and subject to availability, and activities take place on the full days between arrival and departure.",
      ],
      alt: "A surfer riding a peeling right at dusk while another sits out on the shoulder, watching.",
    },
    how: {
      heading: "Your stay, and the surf you add",
      intro: [
        "The stay is the same Original Stay any guest books. The surf is added on top, one activity at a time.",
        "From €45 per person for the minimum three-night stay, in a shared dormitory. Activities are priced separately.",
      ],
      stayTitle: "The stay includes",
      stay: [
        {
          term: "Accommodation",
          detail: "your dormitory bed or room, every night",
        },
        { term: "Breakfast", detail: "one per person, per night booked" },
        { term: "Dinner", detail: "one per person, per night booked" },
        {
          term: "Daily Sunset Tea",
          detail: "complimentary tea and a small cake or sweet treat",
        },
      ],
      surfTitle: "Surf you can add",
      surf: [
        "Group surf lesson with Imsouane Surf Academy, 2 hours",
        "Private surf coaching, 2 hours",
        "Surfboard rental, by the day",
        "Wetsuit rental, by the day",
        "Morning or evening yoga",
        "Surfskate sessions",
      ],
      notes: [
        {
          title: "How it is billed",
          body: "Academy activities are billed separately from the stay, at the same public price any guest pays. There is no Custom Surf discount, and nothing is charged twice.",
        },
        {
          title: "Your level",
          body: "Telling us your level helps start the conversation. It does not certify your level, guarantee a course or choose a paid activity for you.",
        },
        {
          title: "Good to know",
          body: "Minimum stay three nights, with flexible arrival days subject to availability. Booking requests are subject to confirmation.",
        },
      ],
    },
    steps: {
      heading: "How booking works",
      intro:
        "Five steps, in this order. The stay comes first; the surf is added to it.",
      entries: [
        {
          time: "1",
          title: "The Original Stay",
          body: "Begin with accommodation and half-board: your room, breakfast and dinner, and the daily Sunset Tea.",
        },
        {
          time: "2",
          title: "Dates and guests",
          body: "Choose your arrival, departure and who is travelling. Three nights is the minimum stay.",
        },
        {
          time: "3",
          title: "Your room",
          body: "Pick from the dormitory beds and rooms actually free on your dates.",
        },
        {
          time: "4",
          title: "Your surf",
          body: "Add only the activities you want. Nothing is selected for you, and each is charged at the public activity price.",
        },
        {
          time: "5",
          title: "Review",
          body: "Check the stay and each activity before you confirm. An activity already included is never charged twice.",
        },
      ],
      note: "Dates, rooms and activities are shown as they are actually available. Nothing is booked until you confirm.",
    },
    closing: {
      heading: "Your stay. Your choices. Your flow.",
      body: "Choose your dates and your room, then add the surf you want. Questions about lessons, levels or transfers? Ask us first.",
      whatsapp: "Chat with us on WhatsApp",
    },
  },
  fr: {
    lede: "Pars de The Original Stay — ta chambre, le petit-déjeuner et le dîner, et le Sunset Tea quotidien — puis ajoute le surf que tu veux avec Imsouane Surf Academy. Rien n'est choisi à ta place, et chaque activité est facturée à son tarif public.",
    academy: {
      eyebrow: "En option · Imsouane Surf Academy",
      title: "Surf if you feel like it",
      body: [
        "Envie d'apprendre ou de progresser ? Imsouane Surf Academy propose des cours collectifs de deux heures et du coaching privé de deux heures, matériel fourni pendant les cours réservés.",
        "Déjà à l'aise dans l'eau ? Loue une planche ou une combinaison à la journée et surfe en autonomie. Le yoga et le surfskate peuvent aussi s'ajouter.",
        "Tout est facultatif et selon les disponibilités, et les activités ont lieu les jours pleins entre l'arrivée et le départ.",
      ],
      alt: "Un surfeur sur une droite qui déroule au crépuscule, pendant qu'un autre attend sur l'épaule.",
    },
    how: {
      heading: "Ton séjour, et le surf que tu ajoutes",
      intro: [
        "Le séjour est le même Original Stay que réserve tout invité. Le surf s'ajoute par-dessus, une activité à la fois.",
        "À partir de 45 € par personne pour le séjour minimum de trois nuits, en dortoir partagé. Les activités sont facturées à part.",
      ],
      stayTitle: "Le séjour comprend",
      stay: [
        {
          term: "Hébergement",
          detail: "ton lit en dortoir ou ta chambre, chaque nuit",
        },
        { term: "Petit-déjeuner", detail: "1 par personne et par nuit" },
        { term: "Dîner", detail: "1 par personne et par nuit" },
        {
          term: "Sunset Tea",
          detail: "thé et petit gâteau offerts chaque jour",
        },
      ],
      surfTitle: "Le surf que tu peux ajouter",
      surf: [
        "Cours collectif de surf avec Imsouane Surf Academy, 2 heures",
        "Coaching privé de surf, 2 heures",
        "Location de planche à la journée",
        "Location de combinaison à la journée",
        "Yoga du matin ou du soir",
        "Séances de surfskate",
      ],
      notes: [
        {
          title: "Facturation",
          body: "Les activités Academy sont facturées séparément du séjour, au même tarif public que pour tout invité. Pas de remise Custom Surf, et rien n'est facturé deux fois.",
        },
        {
          title: "Ton niveau",
          body: "Indiquer ton niveau aide à ouvrir la discussion. Cela ne certifie pas ton niveau, ne garantit pas un cours et ne choisit aucune activité payante à ta place.",
        },
        {
          title: "Bon à savoir",
          body: "Séjour minimum de trois nuits, arrivée flexible selon les disponibilités. Demande de réservation soumise à confirmation.",
        },
      ],
    },
    steps: {
      heading: "Comment réserver",
      intro:
        "Cinq étapes, dans cet ordre. Le séjour d'abord ; le surf s'y ajoute.",
      entries: [
        {
          time: "1",
          title: "The Original Stay",
          body: "Commence par l'hébergement et la demi-pension : ta chambre, le petit-déjeuner, le dîner et le Sunset Tea quotidien.",
        },
        {
          time: "2",
          title: "Dates et voyageurs",
          body: "Choisis ton arrivée, ton départ et qui voyage. Le séjour minimum est de trois nuits.",
        },
        {
          time: "3",
          title: "Ta chambre",
          body: "Choisis parmi les lits en dortoir et les chambres réellement libres à tes dates.",
        },
        {
          time: "4",
          title: "Ton surf",
          body: "Ajoute uniquement les activités que tu veux. Rien n'est présélectionné, et chacune est facturée au tarif public.",
        },
        {
          time: "5",
          title: "Vérification",
          body: "Vérifie le séjour et chaque activité avant de confirmer. Une activité déjà incluse n'est jamais facturée deux fois.",
        },
      ],
      note: "Les dates, chambres et activités s'affichent selon leur disponibilité réelle. Rien n'est réservé avant ta confirmation.",
    },
    closing: {
      heading: "Your stay. Your choices. Your flow.",
      body: "Choisis tes dates et ta chambre, puis ajoute le surf que tu veux. Une question sur les cours, ton niveau ou les transferts ? Demande-nous d'abord.",
      whatsapp: "Discuter avec nous sur WhatsApp",
    },
  },
} as const satisfies Record<Locale, unknown>;

/** The closing strip's lines, which the route renders. */
export function customSurfClosing(locale: Locale) {
  return COPY[locale].closing;
}

/**
 * Custom Surf, as the body of its own page: The Original Stay with the surf
 * a guest chooses on top. The page says what the base is, what can be added,
 * how the two are billed, and the order a booking goes in — in that order,
 * because a reader deciding whether to add surf needs the base settled first.
 */
export function CustomSurfPackage({ locale = "en" }: { locale?: Locale }) {
  const pkg = packageBySlug("custom-surf", locale);
  const t = COPY[locale];

  return (
    <>
      <PackageHero
        package={pkg}
        id="custom-surf"
        tone="cream"
        lede={t.lede}
        locale={locale}
      />

      <PackageFeature
        id="the-academy"
        tone="sand"
        side="left"
        eyebrow={t.academy.eyebrow}
        title={t.academy.title}
        body={[...t.academy.body]}
        frames={[{ src: "/assets/imsouane_hero.jpg", alt: t.academy.alt }]}
      />

      <PackageInclusions
        id="how-it-works"
        tone="cream"
        heading={t.how.heading}
        intro={[...t.how.intro]}
        groups={[
          { title: t.how.stayTitle, items: [...t.how.stay] },
          { title: t.how.surfTitle, optional: true, items: [...t.how.surf] },
        ]}
        notes={[...t.how.notes]}
      />

      <PackageDay
        id="how-booking-works"
        locale={locale}
        heading={t.steps.heading}
        intro={t.steps.intro}
        entries={[...t.steps.entries]}
        note={t.steps.note}
      />
    </>
  );
}
