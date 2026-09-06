/**
 * Guest reviews, as they appear on the platforms.
 *
 * Pulled on 6 September 2026 — see `docs/reviews.md` for the full set and the
 * source links. Quotes are verbatim, typos included; where a long review is
 * cut to a card-sized passage the cut is marked with an ellipsis, and nothing
 * inside the quotation marks has been reworded. `score` is on the platform's
 * own scale so the card can show it honestly next to the stars.
 */
export type Platform = "Google" | "Booking.com" | "TripAdvisor";

export type Review = {
  name: string;
  /** Country as the platform shows it; empty when the platform hides it. */
  origin: string;
  platform: Platform;
  /** The platform's score for this review. */
  score: number;
  /** Top of the platform's scale — 5 for Google and TripAdvisor, 10 for Booking.com. */
  outOf: 5 | 10;
  quote: string;
};

/** Where the scores come from, for the strip under the heading. */
export const PLATFORMS: {
  name: Platform;
  score: string;
  count: number;
  href: string;
}[] = [
  {
    name: "Google",
    score: "4.7 / 5",
    count: 138,
    href: "https://www.google.com/travel/hotels/entity/CgsIzpnj0LWT-IvsARAB/reviews?hl=en",
  },
  {
    name: "Booking.com",
    score: "8.4 / 10",
    count: 382,
    href: "https://www.booking.com/hotel/ma/imsouane-surf-house-imsouane2.en-gb.html",
  },
  {
    name: "TripAdvisor",
    score: "4.6 / 5",
    count: 9,
    href: "https://www.tripadvisor.com/Hotel_Review-g293731-d6542517-Reviews-Imsouane_Surf_house-Agadir_Souss_Massa.html",
  },
];

/** The first row of the wall. */
export const REVIEWS_ROW_ONE: Review[] = [
  {
    name: "Ethan",
    origin: "",
    platform: "Google",
    score: 5,
    outOf: 5,
    quote:
      "I have never stayed in a hostel that was so well organized and clean. The owner and staff were meticulous and consistent everyday about breakfast, cleaning, check-in/check-out…",
  },
  {
    name: "Audrey",
    origin: "France",
    platform: "Booking.com",
    score: 10,
    outOf: 10,
    quote:
      "Location is amazing, 1st line! Abdellah is the soul of this surf house… It's not about fancy: it's warm & cosy, there is a family atmosphere.",
  },
  {
    name: "Ahmed",
    origin: "",
    platform: "Google",
    score: 5,
    outOf: 5,
    quote:
      "The communal area is perfect for chilling out after a day in the water… and the best thing is its proximity to the beach means you can be in the water within 1/2 minutes.",
  },
  {
    name: "Hélène",
    origin: "Belgium",
    platform: "Booking.com",
    score: 10,
    outOf: 10,
    quote:
      "You can just walk 30 meters, coffee in your hand, to watch how the waves are and decide if you want to go in or not.",
  },
  {
    name: "Louis",
    origin: "",
    platform: "Google",
    score: 5,
    outOf: 5,
    quote:
      "Simply the best hotel you can fin in Imsouane. Top longboards to rent for the best prize in town. Wonderful host, super chill atmosphere, quiet and simple !!",
  },
  {
    name: "Angela",
    origin: "United Kingdom",
    platform: "Booking.com",
    score: 10,
    outOf: 10,
    quote:
      "The location is perfect, 5 minutes away from the beach. The staff is so kind. I stayed for 3 days only and it felt like home.",
  },
  {
    name: "Carlotta",
    origin: "Germany",
    platform: "Booking.com",
    score: 10,
    outOf: 10,
    quote:
      "Very clean and nice hostel! Super nice staff that helps with every question and always up for a talk :) the location is perfect, just a little down the hill and you can jump in the waves…",
  },
  {
    name: "Daniele",
    origin: "",
    platform: "Google",
    score: 5,
    outOf: 5,
    quote:
      "A place where I immediately felt home… The location is perfect to check waves during day, not far from the bay. Beds and rooms are clean and the breakfast is perfect, just before surfing.",
  },
  {
    name: "Subedi",
    origin: "United Kingdom",
    platform: "Booking.com",
    score: 10,
    outOf: 10,
    quote:
      "The cleanliness, the room, the shower, rofftop and especially the reception area or living hall. It has lots of vibe to it.",
  },
];

/** The second row, drifting the other way. */
export const REVIEWS_ROW_TWO: Review[] = [
  {
    name: "Zineb",
    origin: "",
    platform: "Google",
    score: 5,
    outOf: 5,
    quote:
      "Amazing stay from start to finish. Super clean, cozy, perfect location and such a welcoming host. Highly recommend",
  },
  {
    name: "Jessica",
    origin: "Spain",
    platform: "Booking.com",
    score: 9,
    outOf: 10,
    quote:
      "Comfortable beds, clean overall, not noisy - I could rest very well! … Free breakfast and it has a shared kitchen that was spacious and good for cooking… And very nice terrace, with mats for yoga!!",
  },
  {
    name: "Manon",
    origin: "Belgium",
    platform: "Booking.com",
    score: 9,
    outOf: 10,
    quote:
      "Good location, close to the beach; everything was very nice and clean, delicious breakfast and very nice atmosphere! The hosts were very friendly…",
  },
  {
    name: "Jm S",
    origin: "",
    platform: "Google",
    score: 5,
    outOf: 5,
    quote:
      "A beautiful and cosy Surfer Hotel. The host took good care of everything and especially the guests. The rooms were really clean and smelled amazing.",
  },
  {
    name: "Abdelkarim",
    origin: "Morocco",
    platform: "Booking.com",
    score: 9,
    outOf: 10,
    quote:
      "A special thanks to Abdullah, the host, who was incredibly friendly, helpful, and always available whenever I needed anything. He really made the stay feel easy and enjoyable.",
  },
  {
    name: "Guilherme",
    origin: "Portugal",
    platform: "Booking.com",
    score: 9,
    outOf: 10,
    quote:
      "Super nice vibe with friendly staff and a cool atmosphere. It was lovely to see the beach from our room window and they have a nice rooftop for some nice time up there.",
  },
  {
    name: "Isabela",
    origin: "Brazil",
    platform: "Booking.com",
    score: 9,
    outOf: 10,
    quote:
      "The place looks exactly as the photos, the staff is super friendly, I felt everyone was in the same vibe. The breakfast was also super good.",
  },
  {
    name: "Klára",
    origin: "Czech Republic",
    platform: "Booking.com",
    score: 10,
    outOf: 10,
    quote:
      "comfy beds with sockets, spacious lockers, great rooftop terrace and well-equipped kitchen, easy to rent a board for the day for 80dh, nice outdoor terrace too, yoga mats and basic gym equipment for free use",
  },
  {
    name: "BreezeNas",
    origin: "",
    platform: "TripAdvisor",
    score: 5,
    outOf: 5,
    quote:
      "My friend and I went to Surf House, where we were welcomed by Mr Youssef, a smiling, and very sweet person whom later on became a friend.",
  },
];
