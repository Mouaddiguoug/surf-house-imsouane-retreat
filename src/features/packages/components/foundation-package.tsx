import { PackageDay } from "@/features/packages/components/package-day";
import { PackageFeature } from "@/features/packages/components/package-feature";
import { PackageHero } from "@/features/packages/components/package-hero";
import { packageBySlug } from "@/features/packages/data/packages";

const PACKAGE = packageBySlug("the-foundation");

/**
 * The week, as it is actually run — as the strip beside the day.
 *
 * Five beats rather than seven: Saturday is an arrival day and nothing is
 * promised on it, so putting it in the list would be padding.
 */
const WEEK = [
  {
    label: "Sunday",
    title: "The integration dinner: coaches, your goal, the level groups",
  },
  {
    label: "Mon & Tue",
    title: "Foundations: assessment, then your own program",
  },
  {
    label: "Wednesday",
    title: "The break: active rest, so Thursday starts uninjured",
  },
  {
    label: "Thursday",
    title: "Refining: precision work, and the video review after dinner",
  },
  {
    label: "Friday",
    title: "Validation: assisted free surf against Sunday's goal",
  },
];

/**
 * A coached day, hour by hour. Sessions follow the tide, so the surfing
 * moves; everything around it holds.
 */
const DAY = [
  {
    time: "07:30",
    title: "Dynamic yoga on the rooftop",
    body: "The morning practice that switches the body on — shoulders, hips, the paddling muscles — over the bay before it is busy.",
  },
  {
    time: "08:30",
    title: "Surf-Fuel breakfast",
    body: "Built for the water: slow carbohydrates, local protein, fruit. Eaten on the terrace with the day's first look at the waves.",
  },
  {
    time: "09:30",
    title: "The briefing",
    body: "The coaches read the bay and say which of the two waves suits your group today, and what the one thing to work on is.",
  },
  {
    time: "10:00",
    title: "Coached session, in the water",
    body: "Small groups sorted by level. The coach paddles out with you — positioning, wave selection, the timing of the take-off — and the beach camera runs the whole time.",
  },
  {
    time: "13:00",
    title: "Lunch",
    body: "Full board, back at the house. The afternoon is slower on purpose; the body files away the morning.",
  },
  {
    time: "15:00",
    title: "The village, or nothing at all",
    body: "Tuesday it is the fish auction with the chef. Other days a hammock, the point at golden hour, or a second surf if the tide says so.",
  },
  {
    time: "18:00",
    title: "Yin yoga",
    body: "Restorative, for the shoulders and lower back. The hour that lets you paddle out again tomorrow.",
  },
  {
    time: "20:00",
    title: "Dinner, then your clips on the screen",
    body: "You watch yourself surf and fix the things you cannot feel from the inside — style, stance, the moment you look down.",
  },
];

/**
 * Package 01, as the body of its own page.
 *
 * It used to be a single block with a single heading, which is what a section
 * is — the week and the inclusions sat inside it as anonymous lists, and a
 * reader scanning the page had one signpost for the whole thing. Each part now
 * opens with its own heading and its own ground, so the page can be skimmed
 * the way a page is: the offer, a day of it hour by hour with the week
 * beside it, then the three things it comes with — each given a photograph
 * and a section of its own, because "three cards in a row" was the size of
 * the layout, not the size of what they were.
 */
export function FoundationPackage() {
  return (
    <>
      <PackageHero
        package={PACKAGE}
        id="the-foundation"
        tone="cream"
        lede="More than a surf school. Five coached days on the ISA method that change how you read the ocean, held up by the village around you and by enough recovery to paddle out again tomorrow."
      />

      <PackageDay
        id="a-typical-day"
        tone="sand"
        heading="What a day looks like"
        intro="Five of these, with Wednesday off in the middle. The surfing moves with the tide; the rest of the day holds still around it."
        entries={DAY}
        arc={{ label: "The week", entries: WEEK }}
        note="Session times are set the evening before, once the coaches have read the next day's tide. The clock here is a typical one, not a promise."
      />

      <PackageFeature
        id="the-yoga"
        tone="cream"
        side="left"
        eyebrow="Included · Yoga"
        title="Five sessions, two kinds"
        body="Dynamic in the morning, on the rooftop over the bay before it is busy: the practice that switches the body on — shoulders, hips, the paddling muscles. Restorative Yin in the evening, for the shoulders and lower back. The first is what gets you into the water; the second is what lets you paddle out again tomorrow."
        facts={[
          "Five sessions across the week",
          "Dynamic, 07:30, rooftop",
          "Yin, 18:00, after the surfing",
        ]}
        frames={[
          {
            src: "/assets/yoga_session.jpg",
            alt: "A morning yoga class on the rooftop — five people seated on mats, facing the sea, the sun low over the bay behind them.",
          },
        ]}
      />

      <PackageFeature
        id="surf-fuel"
        tone="sand"
        side="right"
        eyebrow="Included · Surf-Fuel"
        title="Full board, built for the water"
        body="Three meals a day, every day, built around performance and recovery rather than around a menu: local protein, slow carbohydrates, and the superfoods that grow here. Breakfast is eaten on the terrace with the day's first look at the waves; dinner is eaten together, with the day's clips on the screen after."
        facts={[
          "Breakfast, lunch and dinner",
          "Local protein, slow carbs",
          "Eaten together, at the long table",
        ]}
        frames={[
          {
            src: "/assets/surf_fuel.jpg",
            alt: "Guests at the long table inside the house, mid-meal, a surfboard leaning in the foreground and the house dog underfoot.",
          },
        ]}
      />

      <PackageFeature
        id="the-village"
        tone="cream"
        layout="bleed"
        side="left"
        eyebrow="Included · The village"
        title="The village, not the postcard"
        body="Tuesday you walk to the auction with the chef to haggle for the evening's fish. Wednesday is a Berber souk in the hills, or argan and a tagine with the women of the village. None of it is a tour: it is how the house already does its week, and you come along."
        facts={[
          "Tuesday: the fish auction",
          "Wednesday: the souk, or argan and a tagine",
          "On foot, with the people who live here",
        ]}
        note="Add on: sandboarding the Timlaline dunes at sunset, or the cliffs on horseback or by quad."
        frames={[
          {
            src: "/assets/auction_1.jpg",
            alt: "The stone steps down the cliff to the beach at Imsouane, the bay curving away below and the village on the headland beyond.",
          },
          {
            src: "/assets/auction_2.jpg",
            alt: "The point at Imsouane from the cliff path, the village and the harbour wall on the far headland across grey water.",
          },
        ]}
      />
    </>
  );
}
