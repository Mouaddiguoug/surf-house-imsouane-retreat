import { PackageDay } from "@/features/packages/components/package-day";
import { PackageFeature } from "@/features/packages/components/package-feature";
import { PackageHero } from "@/features/packages/components/package-hero";
import { PackageInclusions } from "@/features/packages/components/package-inclusions";
import { packageBySlug } from "@/features/packages/data/packages";
import type { Locale } from "@/lib/i18n/locale";

/**
 * Every word on the page, in both languages, from the house's own copy for
 * The Original Stay. The French keeps some lines in English — the section
 * titles, "Your stay. Your choices. Your flow." — because the house wrote it
 * that way, and this follows the house.
 *
 * The lists under "included" come from the house's booking copy rather than
 * its website copy: the website says what the stay feels like, the booking
 * copy says exactly what it contains, and the list is where exactness wins.
 */
const COPY = {
  en: {
    lede: "Some people come for the waves. Others come to slow down. And some keep coming back simply because this place feels like home. You choose your accommodation, we take care of breakfast and dinner, and the rest of your day is yours.",
    room: {
      eyebrow: "Included · Your room",
      title: "Your place. Our house.",
      body: [
        "Early morning surf? A slow breakfast? A walk through the village? Or absolutely no plans at all? That's the beauty of staying in Imsouane.",
        "Choose a bed in our shared dormitory or a room that suits you, depending on availability. Whether you're travelling solo, as a couple or with friends, there's room to enjoy Imsouane your own way. And after a day outside, there's always the pleasure of coming back to the house.",
      ],
      alt: "A private room at the house: a made double bed, a painted mural along one wall, and light coming through the curtains from the sea-facing window.",
    },
    tea: {
      eyebrow: "Every day · Sunset Tea",
      title: "Little moments, good memories.",
      body: [
        "Every afternoon, we come together for our Sunset Tea: a cup of tea and a little homemade-style treat, offered by the house, and a chance to slow down as the day comes to an end. Share your surf stories, meet someone new, or simply enjoy the moment.",
        "And when evening comes, there's often something happening around the house. A movie, some music, a shared meal, or a conversation that carries on into the night. Nothing compulsory. Join in whenever you feel like it.",
      ],
      alt: "The rooftop terrace at dusk: low seating and rugs around a table, the village rooftops and the bay stretching out beyond.",
    },
    included: {
      heading: "The good things are included.",
      intro: [
        "Your first included meal is dinner on arrival day, and your last is breakfast on departure day. A four-night stay includes four breakfasts and four dinners per person.",
        "No compulsory surf lessons. No fixed schedule.",
      ],
      groups: [
        {
          title: "Your stay includes",
          items: [
            {
              term: "Accommodation",
              detail: "your selected dormitory bed or room, every night",
            },
            { term: "Breakfast", detail: "one per person, per night booked" },
            { term: "Dinner", detail: "one per person, per night booked" },
            {
              term: "Daily Sunset Tea",
              detail: "complimentary tea and a small cake or sweet treat",
            },
          ],
        },
        {
          title: "Make it yours",
          optional: true,
          items: [
            "Group surf lesson with Imsouane Surf Academy, 2 hours",
            "Private surf coaching, 2 hours",
            "Surfboard rental, by the day",
            "Wetsuit rental, by the day",
            "Morning or evening yoga",
            "Surfskate sessions",
          ],
        },
      ],
      notes: [
        {
          title: "Not included",
          body: "Lunch, drinks not specifically included, surf lessons and coaching, independent board and wetsuit rental, yoga, surfskate and airport transfers. Transfers can be requested separately, subject to availability and price confirmation.",
        },
        {
          title: "About the extras",
          body: "Every extra is optional, charged separately and subject to availability. Surf equipment is provided during booked lessons, and activities take place on the full days between arrival and departure.",
        },
        {
          title: "Good to know",
          body: "Minimum stay three nights, with flexible arrival days subject to availability. Booking requests are subject to confirmation. Not available during the exclusive Classic Longboard weeks.",
        },
      ],
    },
    surf: {
      eyebrow: "Optional · The ocean",
      title: "Surf if you feel like it.",
      body: [
        "Already comfortable in the water? Rent a board or wetsuit and enjoy your own sessions. Want to learn or improve? Imsouane Surf Academy offers group lessons and private coaching. You can add yoga or surfskate to your stay, too.",
        "All of it is optional, at an additional cost and subject to availability. And if you'd rather spend the day enjoying Imsouane without watching the clock, that's perfectly fine too. Your stay. Your choices. Your flow.",
      ],
      alt: "A surfer riding a peeling right at dusk while another sits out on the shoulder, watching.",
    },
    week: {
      heading: "Every day has its own story.",
      intro:
        "We like to give each day a little character, while leaving everyone free to enjoy their stay their own way.",
      entries: [
        {
          time: "Mon–Tue",
          title: "Healthy & Focus",
          body: "Days inspired by wellbeing, balance and finding your focus. A chance to slow down, reconnect and take care of yourself.",
        },
        {
          time: "Wed",
          title: "Let's Cook Together",
          body: "Join our cooking class, a moment to discover, prepare and share food together. It replaces the regular Wednesday dinner, at no additional charge.",
        },
        {
          time: "Thu–Fri",
          title: "Unleash Your Potential",
          body: "Days inspired by personal growth, curiosity and the willingness to try something new, at your own pace.",
        },
        {
          time: "Fri",
          title: "Couscous Night",
          body: "Friday dinner means couscous at the house: a meal to enjoy together around the table.",
        },
        {
          time: "Sat",
          title: "Movie & Music Night",
          body: "A movie night or live music, depending on what's planned at the house.",
        },
        {
          time: "Sun",
          title: "Local Gourmet",
          body: "A dinner inspired by local flavours, shared around our table.",
        },
      ],
      note: "Our Sunset Tea is offered daily. Evening activities may vary, and participation is always optional. Healthy & Focus and Unleash Your Potential are themes rather than guaranteed workshops.",
    },
    guests: {
      eyebrow: "The house · Since 2012",
      title: "More than guests.",
      body: [
        "Since 2012 we've welcomed surfers, travellers and friends from around the world. Some stay a few nights. Others return year after year, meet old friends, make new ones and pick up conversations where they left off. That's something we really value.",
        "We want you to feel comfortable being yourself, whether you're joining everyone for dinner or enjoying a quiet moment on your own. For us, that's part of the Surf & Soul spirit.",
      ],
      alt: "The common room in morning sun: cushioned seating under the windows, a long wooden table with benches, surfboards against the wall and a painted ceiling.",
    },
  },
  fr: {
    lede: "Il y a ceux qui viennent pour les vagues. Ceux qui viennent pour ralentir un peu. Et ceux qui reviennent simplement parce qu'ici, ils se sentent chez eux. Tu choisis ton hébergement, on s'occupe des petits-déjeuners et des dîners, et tu profites d'Imsouane à ta manière.",
    room: {
      eyebrow: "Inclus · Ta chambre",
      title: "Your place. Our house.",
      body: [
        "Tu voyages seul, à deux ou entre amis ? Choisis ton lit en dortoir ou ta chambre parmi les hébergements disponibles.",
        "Ton séjour comprend l'hébergement, un petit-déjeuner et un dîner par personne pour chaque nuit réservée, ainsi que notre Sunset Tea quotidien. Le dîner commence dès ton arrivée et le petit-déjeuner est servi jusqu'au matin du départ.",
      ],
      alt: "Une chambre privée de la maison : un grand lit fait, une fresque peinte sur un mur et la lumière qui filtre par les rideaux de la fenêtre côté mer.",
    },
    tea: {
      eyebrow: "Chaque jour · Sunset Tea",
      title: "The little things that bring us together.",
      body: [
        "Chaque jour, nous aimons retrouver nos invités autour du Sunset Tea. Un thé, un petit gâteau offert par la maison, et un moment pour se poser après la journée.",
        "On raconte sa session de surf, on échange des idées pour le lendemain, on rencontre les nouveaux arrivants. Pas besoin d'une occasion particulière pour partager un bon moment. Et quand vient le soir, la maison change doucement d'ambiance.",
      ],
      alt: "Le toit-terrasse au crépuscule : banquettes basses et tapis autour d'une table, les toits du village et la baie au-delà.",
    },
    included: {
      heading: "What's included",
      intro: [
        "Le premier dîner est inclus le jour d'arrivée et le dernier petit-déjeuner le jour du départ.",
        "Pas de surf camp obligatoire. Pas de programme imposé.",
      ],
      groups: [
        {
          title: "Ton séjour comprend",
          items: [
            {
              term: "Hébergement",
              detail: "dans la catégorie réservée, pour toutes les nuits",
            },
            { term: "Petit-déjeuner", detail: "1 par personne et par nuit" },
            { term: "Dîner", detail: "1 par personne et par nuit" },
            {
              term: "Sunset Tea",
              detail: "thé et petit gâteau offerts chaque jour",
            },
          ],
        },
        {
          title: "Make it yours",
          optional: true,
          items: [
            "Cours collectif de surf, 2 heures, équipement inclus",
            "Coaching privé, 2 heures, équipement inclus",
            "Location de planche à la journée",
            "Location de combinaison à la journée",
            "Yoga du matin ou du soir",
            "Surfskate",
          ],
        },
      ],
      notes: [
        {
          title: "Non inclus",
          body: "Déjeuners, boissons non expressément comprises, cours de surf, location indépendante de matériel, yoga, surfskate et transferts aéroport.",
        },
        {
          title: "Les options",
          body: "Toutes les options sont payantes et soumises aux disponibilités. Les activités optionnelles sont proposées les jours intermédiaires du séjour.",
        },
        {
          title: "Good to know",
          body: "Séjour minimum : 3 nuits. Arrivée flexible selon les disponibilités. Demande de réservation soumise à confirmation. Offre indisponible pendant les éditions exclusives Classic Longboard.",
        },
      ],
    },
    surf: {
      eyebrow: "En option · L'océan",
      title: "Surf if you feel like it.",
      body: [
        "À Imsouane, l'océan fait partie de nos journées. Mais personne n'est obligé de surfer pour se sentir à sa place ici. Si tu es autonome, tu peux louer une planche ou une combinaison. Si tu souhaites apprendre ou progresser, Imsouane Surf Academy propose des cours collectifs et du coaching privé.",
        "Le yoga et le surfskate peuvent également compléter ton séjour. Ces prestations sont facultatives, payantes et proposées selon les disponibilités. Your stay. Your choices. Your flow.",
      ],
      alt: "Un surfeur sur une droite qui déroule au crépuscule, pendant qu'un autre attend sur l'épaule.",
    },
    week: {
      heading: "Every day has its own story.",
      intro:
        "Nous aimons donner une couleur différente aux journées et aux soirées, sans jamais obliger personne à participer.",
      entries: [
        {
          time: "Lun–Mar",
          title: "Healthy & Focus",
          body: "Deux journées placées sous le signe du bien-être, de l'équilibre et de la concentration. Une invitation à prendre soin de soi et à profiter pleinement de son temps.",
        },
        {
          time: "Mer",
          title: "Let's Cook Together",
          body: "Le mercredi, on se retrouve autour de notre Cooking Class : un moment pour cuisiner, apprendre et partager un repas autrement. L'atelier remplace le dîner habituel du mercredi, sans supplément.",
        },
        {
          time: "Jeu–Ven",
          title: "Unleash Your Potential",
          body: "Deux journées autour d'une idée simple : découvrir ce dont on est capable, oser essayer et progresser à son rythme.",
        },
        {
          time: "Ven",
          title: "Couscous Night",
          body: "Le vendredi, le couscous est au menu du dîner. Un repas à partager ensemble à la maison.",
        },
        {
          time: "Sam",
          title: "Movie & Music Night",
          body: "Cinéma, film partagé ou musique avec un groupe, selon la programmation du moment.",
        },
        {
          time: "Dim",
          title: "Local Gourmet",
          body: "Un dîner inspiré des saveurs locales, pour découvrir la cuisine de notre région autour de la table.",
        },
      ],
      note: "Le Sunset Tea est offert chaque jour. Les animations et rendez-vous collectifs suivent le programme de la maison ; leur participation reste libre.",
    },
    guests: {
      eyebrow: "La maison · Depuis 2012",
      title: "More than guests.",
      body: [
        "Depuis 2012, la maison accueille des voyageurs, des surfeurs et des amis de passage. Certains restent quelques nuits, d'autres reviennent année après année. Ce qui nous plaît, c'est de voir ces chemins se croiser autour d'une table, d'un thé ou d'une conversation.",
        "Ce qu'on aime le plus, c'est quand les gens se sentent assez à l'aise pour être eux-mêmes : venir prendre un thé, participer à une soirée ou simplement profiter d'un moment tranquille.",
      ],
      alt: "La salle commune au soleil du matin : banquettes sous les fenêtres, une longue table en bois avec des bancs, des planches contre le mur et un plafond peint.",
    },
  },
} as const satisfies Record<Locale, unknown>;

/** The strip at the foot of the page, which the route renders. */
export const ORIGINAL_STAY_CLOSING = {
  en: {
    heading: "Come as you are.",
    body: [
      "Choose your dates, find your place in the house and add the activities that interest you.",
      "A special request, or a question about your room, surf lessons or transfers? Send us a message on WhatsApp or drop us an email. You're part of the family here.",
    ],
    whatsapp: "Chat with us on WhatsApp",
  },
  fr: {
    heading: "You're part of the family here.",
    body: [
      "Une question ? Une envie particulière ? Besoin d'un conseil pour ton arrivée, ta chambre ou tes activités ?",
      "Écris-nous par WhatsApp ou par e-mail. Feel free to ask, share or simply say hello.",
    ],
    whatsapp: "Discuter avec nous sur WhatsApp",
  },
} as const satisfies Record<Locale, unknown>;

/**
 * The Original Stay, as the body of its own page — in either language.
 *
 * The house's copy for this stay is about how it feels before it is about
 * what it contains, so the page runs the same way: the room and the daily
 * tea first, then the list, then the ocean as something you may or may not
 * want, then the week's rhythm and the people.
 */
export function OriginalStayPackage({ locale = "en" }: { locale?: Locale }) {
  const pkg = packageBySlug("original-stay", locale);
  const copy = COPY[locale];

  return (
    <>
      <PackageHero
        package={pkg}
        id="the-original-stay"
        tone="sand"
        lede={copy.lede}
        locale={locale}
      />

      <PackageFeature
        id="your-room"
        tone="cream"
        side="left"
        eyebrow={copy.room.eyebrow}
        title={copy.room.title}
        body={[...copy.room.body]}
        frames={[{ src: "/assets/book_a_stay_1.JPG", alt: copy.room.alt }]}
      />

      <PackageFeature
        id="sunset-tea"
        tone="sand"
        side="right"
        eyebrow={copy.tea.eyebrow}
        title={copy.tea.title}
        body={[...copy.tea.body]}
        frames={[{ src: "/assets/rooftop.JPG", alt: copy.tea.alt }]}
      />

      <PackageInclusions
        id="whats-included"
        tone="cream"
        heading={copy.included.heading}
        intro={[...copy.included.intro]}
        groups={copy.included.groups.map((group) => ({
          title: group.title,
          items: [...group.items],
          optional: "optional" in group && group.optional,
        }))}
        notes={[...copy.included.notes]}
      />

      <PackageFeature
        id="surf-if-you-feel-like-it"
        tone="sand"
        side="left"
        eyebrow={copy.surf.eyebrow}
        title={copy.surf.title}
        body={[...copy.surf.body]}
        frames={[{ src: "/assets/imsouane_hero.jpg", alt: copy.surf.alt }]}
      />

      <PackageDay
        id="every-day-has-its-own-story"
        locale={locale}
        heading={copy.week.heading}
        intro={copy.week.intro}
        entries={[...copy.week.entries]}
        note={copy.week.note}
      />

      <PackageFeature
        id="more-than-guests"
        tone="cream"
        side="right"
        eyebrow={copy.guests.eyebrow}
        title={copy.guests.title}
        body={[...copy.guests.body]}
        frames={[{ src: "/assets/book-a-stay/6.jpg", alt: copy.guests.alt }]}
      />
    </>
  );
}
