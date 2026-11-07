import type { Locale } from "@/lib/i18n/locale";

/**
 * The home page's questions, answered once, in both languages.
 *
 * The first five are the V1.5 handoff's own, adjusted only where the
 * founder's decisions changed the answer (the Original Stay and Custom Surf
 * are bookable; the programmes are not yet). The rest are the questions that
 * already arrived by email before a booking, kept from the previous site
 * where the answer is still true. Anything here that changes on the ground
 * should change here first — in both languages.
 */
export const FAQ: Record<Locale, { question: string; answer: string }[]> = {
  en: [
    {
      question: "What is The Original Stay?",
      answer:
        "Accommodation and half-board at the House: breakfast and dinner for every night booked, and the daily Sunset Tea. Academy activities are optional and billed separately. The minimum stay is three nights.",
    },
    {
      question: "Can I add surf to my stay?",
      answer:
        "Yes. Custom Surf starts with The Original Stay and adds the eligible surf activities you choose, at the public activity price. No activity is selected by default.",
    },
    {
      question: "I already booked a room. Do I need to book it again?",
      answer:
        "No. Adding activities to an existing booking is for activities only; your accommodation is not charged again. Write to us with your booking and we will add what you would like.",
    },
    {
      question: "Is Longboard a surf level?",
      answer:
        "No. Longboard is a discipline. Beginner, Intermediate and Advanced describe levels, and Not sure is a perfectly good answer.",
    },
    {
      question: "Can I book Foundation or Golden Lines?",
      answer:
        "Not yet. Both programmes are being finalised, and their details and opening are subject to confirmation. Write to us if you would like to hear when they open.",
    },
    {
      question: "Do I need my own board or wetsuit?",
      answer:
        "No. Boards and wetsuits can be rented by the day, and equipment comes with any lesson you book. Bring your own board if you love it.",
    },
    {
      question: "When is the best time to come?",
      answer:
        "Autumn through spring brings the most consistent swell, and the bay works at almost any size. Summer is smaller and warmer, which suits first waves.",
    },
    {
      question: "What is not included?",
      answer:
        "Lunch, drinks not specifically included, surf lessons and coaching, equipment rental, yoga, surfskate and airport transfers. Transfers can be requested separately, subject to availability and price confirmation.",
    },
  ],
  fr: [
    {
      question: "Qu'est-ce que The Original Stay ?",
      answer:
        "L'hébergement et la demi-pension à la House : un petit-déjeuner et un dîner pour chaque nuit réservée, et le Sunset Tea quotidien. Les activités Academy sont facultatives et facturées séparément. Le séjour minimum est de trois nuits.",
    },
    {
      question: "Je peux ajouter du surf à mon séjour ?",
      answer:
        "Oui. Custom Surf part de The Original Stay et ajoute les activités surf éligibles que tu choisis, au tarif public de l'activité. Aucune activité n'est sélectionnée par défaut.",
    },
    {
      question: "J'ai déjà réservé une chambre. Dois-je la réserver à nouveau ?",
      answer:
        "Non. L'ajout à une réservation existante concerne uniquement les activités ; ton hébergement n'est pas facturé une seconde fois. Écris-nous avec ta réservation et on ajoute ce que tu souhaites.",
    },
    {
      question: "Le longboard, c'est un niveau ?",
      answer:
        "Non. Le longboard est une discipline. Débutant, Intermédiaire et Confirmé décrivent des niveaux, et « Je ne sais pas » est une réponse tout à fait valable.",
    },
    {
      question: "Je peux réserver Foundation ou Golden Lines ?",
      answer:
        "Pas encore. Les deux programmes sont en cours de finalisation, et leurs modalités comme leur ouverture restent à confirmer. Écris-nous si tu veux être prévenu de leur ouverture.",
    },
    {
      question: "Ai-je besoin de ma propre planche ou combinaison ?",
      answer:
        "Non. Planches et combinaisons se louent à la journée, et le matériel est fourni pendant les cours réservés. Apporte ta planche si tu y tiens.",
    },
    {
      question: "Quelle est la meilleure période pour venir ?",
      answer:
        "De l'automne au printemps, la houle est la plus régulière, et la baie fonctionne à presque toutes les tailles. L'été est plus petit et plus chaud, idéal pour les premières vagues.",
    },
    {
      question: "Qu'est-ce qui n'est pas inclus ?",
      answer:
        "Le déjeuner, les boissons non expressément comprises, les cours et le coaching de surf, la location de matériel, le yoga, le surfskate et les transferts aéroport. Les transferts peuvent être demandés à part, selon les disponibilités et après confirmation du prix.",
    },
  ],
};
