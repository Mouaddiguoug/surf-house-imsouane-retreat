import { PackageDay } from "@/features/packages/components/package-day";
import { PackageFeature } from "@/features/packages/components/package-feature";
import { PackageHero } from "@/features/packages/components/package-hero";
import { PackageInclusions } from "@/features/packages/components/package-inclusions";
import { packageBySlug } from "@/features/packages/data/packages";
import type { Locale } from "@/lib/i18n/locale";

/**
 * Every word on the page, in both languages, from the house's own copy
 * for The Foundation. The two versions are not translations of each other
 * line for line — the French was written separately — so each keeps its own
 * phrasing rather than being forced into the other's shape.
 */
const COPY = {
  en: {
    lede: "Ever caught a wave and wondered why that one worked when the others didn't? The Foundation is seven nights of structured surf coaching, personalised attention, yoga and surfskate, with the warmth and everyday life of the house around you.",
    groups: {
      eyebrow: "Coaching · Two groups",
      title: "Your level. Your group. Your progress.",
      body: [
        "We all learn differently, and someone catching their first wave doesn't need the same guidance as a surfer who's already comfortable in the water. So The Foundation runs two separate learning groups, each with its own objectives and personalised coaching feedback.",
        "Beginners build the right foundations from day one: how waves work, getting comfortable with your equipment, and the essentials of paddling, positioning, balance and take-off. Step by step, with time to ask questions and no pressure to keep up with more experienced surfers.",
        "Intermediate surfers work out what comes next. Taking off a little late, missing the right position, turns that don't quite work the way you imagined: we look closely at what's happening in the water, refine your technique, and you leave with a clearer idea of what to practise.",
      ],
      alt: "A surfer standing up on a small, wind-textured wave at Imsouane while two others paddle back out behind.",
    },
    method: {
      eyebrow: "Coaching · The method",
      title: "Every session has a purpose",
      body: [
        "A good surf instructor doesn't simply show you what to do. They help you understand why. Imsouane Surf Academy teaches to a structured approach: clear objectives, practical experience, observation and personalised feedback.",
        "We don't measure a successful week by counting the waves you caught. What matters is what you understood along the way. Less guessing. More understanding. Stronger foundations.",
        "Understanding the ocean also means learning to respect it. Reading conditions, spotting hazards, respecting other surfers and knowing your limits are taught alongside technique. Surfing carries risks no lesson can remove, and knowing when not to paddle out matters as much as knowing how.",
      ],
      alt: "A surfer riding a peeling right at dusk while another sits out on the shoulder, watching.",
    },
    reset: {
      eyebrow: "Included · Surf, yoga, surfskate",
      title: "Surf. Move. Reset.",
      body: [
        "Learning doesn't stop when you leave the water. Five guided surf sessions give you ten hours of coaching across the week: time to practise, ask questions, get feedback and connect what you learned in one session to the next.",
        "Four yoga sessions work on mobility, breathing, body awareness and recovery. One surfskate session takes balance, coordination and surfing movements onto dry land.",
        "And between all of it? Rest. Take a walk. Read a book. Watch the waves, or simply do nothing for a while. After all, you're on holiday too.",
      ],
      alt: "A yoga class on the rooftop: five people seated on mats facing the sea, the sun low over the bay behind them.",
    },
    tea: {
      eyebrow: "Every day · Sunset Tea",
      title: "Sunset Tea, our little daily ritual",
      body: [
        "As the sun starts to go down and everyone returns from their day, we gather for tea. Every day, we invite you to our complimentary Sunset Tea, served with a little homemade cake.",
        "Some share stories from their surf session. Others listen, chat or simply enjoy the last light of the day. No ceremony, no complicated schedule: just tea, something sweet and a little time together. It's often in these simple moments that new friendships begin.",
      ],
      alt: "The rooftop terrace at dusk: low seating and rugs around a table, the village rooftops and the bay stretching out beyond.",
    },
    rhythm: {
      heading: "Every day has its own story",
      intro:
        "No two days at the house feel exactly the same. There are moments to learn, focus, cook, laugh, share, and simply enjoy being together.",
      entries: [
        {
          time: "Mon–Tue",
          title: "Good habits, good energy",
          body: "A little extra attention to movement, learning and concentration: balanced meals, surf sessions, and time to absorb what you've been discovering. Building your foundations without rushing.",
        },
        {
          time: "Wed",
          title: "Let's get cooking",
          body: "The kitchen becomes a place to meet. Our cooking gathering is an invitation to discover recipes, explore the flavours of our kitchen and prepare something together, away from boards and waves.",
        },
        {
          time: "Thu",
          title: "Let the good energy flow",
          body: "More confidence, more shared stories, and time to enjoy the atmosphere of the house. The pleasure of learning and being together stays at the heart of the week.",
        },
        {
          time: "Fri",
          title: "Couscous Friday",
          body: "A meal to share around the table, and a moment to look back on the week's waves, small achievements and favourite memories.",
        },
        {
          time: "Sat",
          title: "Movie night or live music",
          body: "Depending on the house program: a screening, a relaxed cinema night or live music. Carry on the conversations, or simply soak up the atmosphere.",
        },
        {
          time: "Sun",
          title: "A taste of local cuisine",
          body: "A shared meal inspired by the cooking of our region, bringing everyone together around the table.",
        },
      ],
      note: "Sunset Tea is complimentary every day. House gatherings, themed meals and evening activities follow the weekly program and may vary from one stay to another.",
    },
    roots: {
      eyebrow: "Roots · The village",
      title: "Imsouane, beyond the waves",
      body: [
        "Imsouane is more than a surf spot. It's a coastal village with its own rhythm, people, food and everyday relationship with the ocean.",
        "Walk through the village, discover the harbour, enjoy local flavours, or find a place to sit and watch life unfold. There's no need to turn every moment into an organised activity. Sometimes the best memories happen naturally.",
      ],
      alts: [
        "The stone steps down the cliff to the beach at Imsouane, the bay curving away below and the village on the headland beyond.",
        "The point at Imsouane from the cliff path, the village and the harbour wall on the far headland across grey water.",
      ],
    },
    home: {
      eyebrow: "The house · Since 2012",
      title: "Your home by the ocean",
      body: [
        "We've been welcoming surfers and travellers since 2012, and the things we love most are still simple. Breakfast before heading out. Stories after a session. Tea at sunset. Dinner around the table.",
        "Some guests arrive alone, others with friends. Some love long conversations; others prefer watching the ocean in silence. There's room for different personalities and different rhythms. Come as a guest. Feel at home.",
      ],
      alt: "Guests at the long table inside the house, mid-meal, a surfboard leaning in the foreground and the house dog underfoot.",
    },
    included: {
      heading: "What's included in your seven nights",
      intro: [
        "Arrive on Saturday and leave the following Saturday, or arrive on Sunday and leave the following Sunday. Seven nights either way.",
        "From €590 in a shared dormitory. Private rooms are priced by category and occupancy; dates, availability and your final price are shown during booking.",
      ],
      groups: [
        {
          title: "Accommodation & meals",
          items: [
            "7 nights in your selected accommodation",
            "7 breakfasts",
            "7 dinners",
            "Complimentary daily Sunset Tea with a little cake",
          ],
        },
        {
          title: "Imsouane Surf Academy",
          items: [
            "5 guided surf sessions of 2 hours each — 10 hours planned",
            "Separate beginner and intermediate groups",
            "Learning objectives adapted to your level",
            "Personalised instructor feedback",
            "Ocean awareness and responsible surfing",
            "Program surfboards on scheduled activity days",
          ],
        },
        {
          title: "Movement & recovery",
          items: ["4 yoga sessions", "1 surfskate session"],
        },
        {
          title: "Life at the house",
          items: [
            "Shared meals and a welcoming community",
            "Weekly house gatherings, following the program during your stay",
            "Free time to discover Imsouane at your own pace",
          ],
        },
      ],
      notes: [
        {
          title: "Make it your own",
          body: "Private surf coaching, extra yoga, extra surfskate sessions and airport transfers can be arranged at an additional cost, subject to availability. Lunches are not included in the half-board package.",
        },
        {
          title: "Travelling with someone who doesn't surf?",
          body: "They're welcome too, in one of our eligible private rooms. Companion stays are arranged personally rather than through online booking, so message us on WhatsApp or by email and we'll find the right arrangement together.",
        },
        {
          title: "Good to know",
          body: "Up to 16 guests in total, surfers and companions included. Coaching is delivered by Imsouane Surf Academy.",
        },
      ],
    },
  },
  fr: {
    lede: "Vous est-il déjà arrivé de prendre une vague sans vraiment comprendre pourquoi celle-ci a fonctionné et pas les autres ? The Foundation est un programme de sept nuits qui associe un apprentissage structuré du surf, un accompagnement personnalisé, du yoga et du surfskate à la vie chaleureuse de la maison.",
    groups: {
      eyebrow: "Coaching · Deux groupes",
      title: "Votre niveau. Votre groupe. Votre progression.",
      body: [
        "Nous n'apprenons pas tous de la même manière. Un débutant n'a pas les mêmes besoins qu'un surfeur qui prend déjà des vagues. C'est pourquoi The Foundation propose deux groupes distincts, chacun avec ses objectifs pédagogiques et son suivi personnalisé.",
        "Débutants : découvrez comment fonctionnent les vagues, familiarisez-vous avec votre matériel et apprenez les gestes essentiels — la rame, le placement, l'équilibre et le take-off. Vous avancez étape par étape, avec le temps de poser vos questions, sans avoir à suivre le rythme des surfeurs expérimentés.",
        "Intermédiaires : vous partez un peu trop tard, votre placement n'est pas toujours le bon ou vos virages ne se passent pas comme prévu ? Nous vous aidons à comprendre ce qui se passe dans l'eau, à affiner votre technique et à identifier ce que vous devez travailler.",
      ],
      alt: "Un surfeur debout sur une petite vague ridée par le vent à Imsouane, deux autres repartant à la rame derrière lui.",
    },
    method: {
      eyebrow: "Coaching · La méthode",
      title: "Chaque séance a un objectif",
      body: [
        "Un bon moniteur ne se contente pas de vous montrer quoi faire. Il vous aide à comprendre pourquoi. L'enseignement d'Imsouane Surf Academy repose sur une progression structurée, associant objectifs pédagogiques, pratique, observation et retours personnalisés.",
        "Nous ne mesurons pas la réussite d'une semaine au nombre de vagues prises. Ce qui nous intéresse, c'est ce que vous avez compris en chemin. Moins de hasard. Plus de compréhension. Des bases plus solides.",
        "Apprendre à connaître l'océan, c'est aussi apprendre à le respecter : comprendre les conditions, identifier les dangers, respecter les autres surfeurs et reconnaître ses limites. Le surf comporte des risques qu'aucun cours ne peut faire disparaître, et savoir quand ne pas entrer à l'eau est aussi important que savoir surfer.",
      ],
      alt: "Un surfeur sur une droite qui déroule au crépuscule, pendant qu'un autre attend sur l'épaule.",
    },
    reset: {
      eyebrow: "Inclus · Surf, yoga, surfskate",
      title: "Surfer. Bouger. Se ressourcer.",
      body: [
        "L'apprentissage ne s'arrête pas lorsqu'on sort de l'eau. Cinq séances accompagnées par nos moniteurs, soit dix heures de coaching prévues : le temps de pratiquer, de poser des questions, de recevoir des conseils et de faire le lien d'une séance à l'autre.",
        "Quatre séances de yoga pour la mobilité, la respiration, la conscience du corps et la récupération. Une séance de surfskate pour explorer l'équilibre, la coordination et les mouvements du surf sur la terre ferme.",
        "Et entre toutes ces activités ? Se reposer. Se promener. Lire un livre. Regarder les vagues, ou tout simplement ne rien faire. Après tout, vous êtes aussi en vacances.",
      ],
      alt: "Un cours de yoga sur le toit-terrasse : cinq personnes assises sur leurs tapis face à la mer, le soleil bas sur la baie.",
    },
    tea: {
      eyebrow: "Chaque jour · Sunset Tea",
      title: "Le Sunset Tea, notre petit rendez-vous quotidien",
      body: [
        "Lorsque le soleil commence à descendre et que chacun revient de sa journée, on se retrouve autour d'un thé. Chaque jour, nous vous offrons le Sunset Tea, accompagné d'un petit gâteau.",
        "Certains racontent leur session de surf. D'autres écoutent, discutent ou profitent tranquillement de la fin de journée. Pas de cérémonie ni de programme compliqué : juste un thé, quelque chose de bon à partager et un peu de temps ensemble. C'est souvent là que les rencontres commencent.",
      ],
      alt: "Le toit-terrasse au crépuscule : banquettes basses et tapis autour d'une table, les toits du village et la baie au-delà.",
    },
    rhythm: {
      heading: "Chaque jour a son histoire",
      intro:
        "À la maison, les journées ne se ressemblent pas toutes. Il y a des moments pour apprendre, se concentrer, cuisiner, rire ou simplement profiter d'être ensemble.",
      entries: [
        {
          time: "Lun–Mar",
          title: "Prendre de bonnes habitudes",
          body: "Une attention particulière au corps, à l'apprentissage et à la concentration : des repas équilibrés, du surf, du mouvement et du temps pour assimiler. On construit ses bases, sans se précipiter.",
        },
        {
          time: "Mer",
          title: "Autour de la cuisine",
          body: "La cuisine devient un lieu de rencontre. Notre rendez-vous culinaire invite à découvrir, préparer et partager des recettes et des saveurs de la maison, loin des planches et des vagues.",
        },
        {
          time: "Jeu",
          title: "Laisser place à l'énergie",
          body: "On prend confiance, on partage davantage et on profite de l'ambiance de la maison. L'esprit est simple : garder le plaisir au cœur de la semaine.",
        },
        {
          time: "Ven",
          title: "Le couscous du vendredi",
          body: "Un repas à partager autour de la table, et le moment de raconter les vagues de la semaine, les petites réussites et les bons souvenirs.",
        },
        {
          time: "Sam",
          title: "Cinéma ou musique",
          body: "Selon la programmation : cinéma, projection collective ou musique live. L'occasion de prolonger les discussions ou simplement de profiter de l'ambiance.",
        },
        {
          time: "Dim",
          title: "Les saveurs d'ici",
          body: "Un repas qui met la cuisine locale à l'honneur, pour découvrir les saveurs de notre région autour de la table.",
        },
      ],
      note: "Le Sunset Tea est offert chaque jour. Les rencontres, les repas et les animations suivent le rythme de la maison ; leur déroulement peut varier selon la semaine.",
    },
    roots: {
      eyebrow: "Roots · Le village",
      title: "Imsouane, au-delà des vagues",
      body: [
        "Imsouane, ce n'est pas seulement son spot de surf. C'est un village côtier, avec son rythme, ses habitants, sa cuisine et sa relation quotidienne avec l'océan.",
        "Promenez-vous dans le village, découvrez le port, goûtez aux saveurs locales ou installez-vous pour regarder la vie passer. Pas besoin de transformer chaque instant en activité organisée. Parfois, les meilleurs souvenirs arrivent naturellement.",
      ],
      alts: [
        "Les marches de pierre qui descendent la falaise vers la plage d'Imsouane, la baie en contrebas et le village sur le promontoire.",
        "La pointe d'Imsouane depuis le chemin de la falaise, le village et la digue du port de l'autre côté d'une eau grise.",
      ],
    },
    home: {
      eyebrow: "La maison · Depuis 2012",
      title: "Votre maison au bord de l'océan",
      body: [
        "Nous accueillons des voyageurs et des surfeurs depuis 2012, et ce que nous aimons le plus reste simple. Le petit-déjeuner avant le surf. Les histoires au retour de l'eau. Le thé au coucher du soleil. Les dîners autour de la table.",
        "Certains arrivent seuls, d'autres entre amis. Certains aiment les grandes discussions, d'autres préfèrent regarder l'océan en silence. Il y a de la place pour toutes les personnalités et tous les rythmes. Vous arrivez comme un invité. Vous vous sentez comme chez vous.",
      ],
      alt: "Des invités à la grande table de la maison, en plein repas, une planche de surf au premier plan et le chien de la maison sous la table.",
    },
    included: {
      heading: "Ce qui est inclus dans vos 7 nuits",
      intro: [
        "Arrivée le samedi, départ le samedi suivant. Ou arrivée le dimanche, départ le dimanche suivant. Sept nuits dans les deux cas.",
        "À partir de 590 € en dortoir partagé. Les chambres privées sont proposées selon la catégorie et l'occupation ; dates, disponibilités et prix définitifs s'affichent pendant la réservation.",
      ],
      groups: [
        {
          title: "Hébergement et repas",
          items: [
            "7 nuits dans l'hébergement choisi",
            "7 petits-déjeuners",
            "7 dîners en demi-pension",
            "Sunset Tea quotidien avec un petit gâteau, offert",
          ],
        },
        {
          title: "Imsouane Surf Academy",
          items: [
            "5 séances de surf encadrées de 2 heures — 10 heures prévues",
            "Deux groupes distincts : débutants et intermédiaires",
            "Objectifs pédagogiques adaptés au niveau",
            "Suivi et retours personnalisés",
            "Sécurité et connaissance de l'océan",
            "Planches du programme les jours d'activité prévus",
          ],
        },
        {
          title: "Mouvement et récupération",
          items: ["4 séances de yoga", "1 séance de surfskate"],
        },
        {
          title: "Vie à la maison",
          items: [
            "Repas partagés et rendez-vous conviviaux",
            "Programme hebdomadaire de la maison pendant votre séjour",
            "Temps libre pour profiter d'Imsouane à votre rythme",
          ],
        },
      ],
      notes: [
        {
          title: "Personnalisez votre séjour",
          body: "Cours particuliers de surf, yoga ou surfskate supplémentaires et transferts aéroport peuvent être organisés en supplément, selon les disponibilités. Les déjeuners ne sont pas compris dans la demi-pension.",
        },
        {
          title: "Vous venez avec quelqu'un qui ne surfe pas ?",
          body: "Il est le bienvenu, dans l'une de nos catégories d'hébergement privé éligibles. Ces séjours s'organisent personnellement et ne sont pas réservables en ligne : écrivez-nous par WhatsApp ou par e-mail et nous trouverons ensemble la formule adaptée.",
        },
        {
          title: "Informations pratiques",
          body: "16 personnes au maximum, surfeurs et accompagnants compris. Enseignement assuré par Imsouane Surf Academy.",
        },
      ],
    },
  },
} as const satisfies Record<Locale, unknown>;

/** The strip at the foot of the page, which the route renders. */
export const FOUNDATION_CLOSING = {
  en: {
    heading: "Come for the waves. Take something more home.",
    body: [
      "Maybe it's a wave you finally understand, a movement that suddenly makes sense, or a conversation over Sunset Tea.",
      "We won't promise to turn you into an expert in seven nights. What we offer is a thoughtful approach to learning, personal attention and a welcoming place to call home.",
    ],
    whatsapp: "Questions? WhatsApp us",
  },
  fr: {
    heading: "Venez pour les vagues. Repartez avec bien plus.",
    body: [
      "Peut-être une vague que vous aurez enfin comprise, un mouvement qui devient évident, ou une conversation autour d'un thé au coucher du soleil.",
      "Nous ne vous promettons pas de devenir expert en sept nuits. Ce que nous vous proposons, c'est une manière réfléchie d'apprendre, une attention personnelle et une maison où vous vous sentirez bien.",
    ],
    whatsapp: "Une question ? WhatsApp",
  },
} as const satisfies Record<Locale, unknown>;

/**
 * The Foundation, as the body of its own page — in either language.
 *
 * The order follows the house's copy: who the week is for and how it is
 * taught first, then what a day holds around the surfing, then the village
 * and the house, and only then the list of what is included, once the
 * reader knows what the list is a list of.
 */
export function FoundationPackage({ locale = "en" }: { locale?: Locale }) {
  const pkg = packageBySlug("the-foundation", locale);
  const copy = COPY[locale];

  return (
    <>
      <PackageHero
        package={pkg}
        id="the-foundation"
        tone="cream"
        lede={copy.lede}
        locale={locale}
        alternate={
          locale === "en"
            ? { href: "/fr/packages/the-foundation", hrefLang: "fr" }
            : { href: "/packages/the-foundation", hrefLang: "en" }
        }
      />

      <PackageFeature
        id="your-level"
        tone="sand"
        side="left"
        eyebrow={copy.groups.eyebrow}
        title={copy.groups.title}
        body={[...copy.groups.body]}
        frames={[{ src: "/assets/video_analysis.JPG", alt: copy.groups.alt }]}
      />

      <PackageFeature
        id="the-method"
        tone="cream"
        side="right"
        eyebrow={copy.method.eyebrow}
        title={copy.method.title}
        body={[...copy.method.body]}
        frames={[{ src: "/assets/imsouane_hero.jpg", alt: copy.method.alt }]}
      />

      <PackageFeature
        id="surf-move-reset"
        tone="sand"
        side="left"
        eyebrow={copy.reset.eyebrow}
        title={copy.reset.title}
        body={[...copy.reset.body]}
        frames={[{ src: "/assets/yoga_session.jpg", alt: copy.reset.alt }]}
      />

      <PackageFeature
        id="sunset-tea"
        tone="cream"
        side="right"
        eyebrow={copy.tea.eyebrow}
        title={copy.tea.title}
        body={[...copy.tea.body]}
        frames={[{ src: "/assets/rooftop.JPG", alt: copy.tea.alt }]}
      />

      <PackageDay
        id="the-rhythm-of-the-house"
        heading={copy.rhythm.heading}
        intro={copy.rhythm.intro}
        entries={[...copy.rhythm.entries]}
        note={copy.rhythm.note}
      />

      <PackageFeature
        id="roots"
        tone="sand"
        layout="bleed"
        side="left"
        eyebrow={copy.roots.eyebrow}
        title={copy.roots.title}
        body={[...copy.roots.body]}
        frames={[
          { src: "/assets/auction_1.jpg", alt: copy.roots.alts[0] },
          { src: "/assets/auction_2.jpg", alt: copy.roots.alts[1] },
        ]}
      />

      <PackageFeature
        id="since-2012"
        tone="cream"
        side="right"
        eyebrow={copy.home.eyebrow}
        title={copy.home.title}
        body={[...copy.home.body]}
        frames={[{ src: "/assets/surf_fuel.jpg", alt: copy.home.alt }]}
      />

      <PackageInclusions
        id="whats-included"
        tone="sand"
        heading={copy.included.heading}
        intro={[...copy.included.intro]}
        groups={copy.included.groups.map((group) => ({
          title: group.title,
          items: [...group.items],
        }))}
        notes={[...copy.included.notes]}
      />
    </>
  );
}
