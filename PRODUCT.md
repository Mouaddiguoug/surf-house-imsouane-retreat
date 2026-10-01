# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: learners.** Beginner and intermediate surfers who want coached progression, not just a bed near a wave. They are international travellers, mostly booking from Europe and paying in euros, planning a surf trip to Morocco and comparing Imsouane stays before committing a week. The package that serves them directly is The Foundation (an ISA-method academy week), so they come first when trade-offs arise.

**Secondary:** longboarders who already read a green wave (The Masterclass, a classic single-fin week), and independent surfers who want the house and the boards without a timetable (The Custom Retreat).

Reviews say guests are mostly solo travellers, friends and couples, and they value a calm atmosphere over a party one.

## Product Purpose

The marketing and booking site for Surf House Imsouane, a surf and yoga retreat house in Imsouane, Morocco. It explains what a week at the house is, helps a visitor choose between three packages and a rate plan, and hands that choice to the booking engine.

**Success = bookings completed through Bookinglayer.** A visitor picks a package and rate plan (non-refundable or semi-flexible) on this site and is deep-linked into the Bookinglayer shop, where dates, availability and payment are handled.

## Positioning

The house makes three claims that together a neighbouring camp could not truthfully copy:

1. **The wave.** Imsouane's long, patient right-hander is the reason to come. The site currently phrases it as "Morocco's longest right-hand wave" (`src/lib/constants/site.ts`). The owner also frames it as the longest right in Africa. Use the stronger wording only once it is verified.
2. **A real coaching method.** An ISA-method academy week for learners, and a dedicated classic-longboard week, with video analysis and evening theory. This is coached progression, not board rental with a lesson attached.
3. **Location on the bay.** About 30 m from the water, with both spots visible from the rooftop. Guest reviews name this more often than anything else.

## Operating Context

- Three packages, each with its own page under `/packages/*`: **The Foundation** (7 nights, fixed dates, Sat/Sun arrival, beginner & intermediate), **The Masterclass** (7 nights, Sunday–Friday rhythm, single fin, for surfers who already read a green wave), **The Custom Retreat** (bed, breakfast & board from two nights, arrive any day).
- Two rate plans per package: non-refundable and semi-flexible. Weeks are priced per stay and the Custom Retreat per night. Prices are "from" figures for the premium-dorm bed, and private rooms cost more.
- Booking runs on Bookinglayer (`src/features/booking/bookinglayer.ts`). Nothing of Bookinglayer runs on this site. What a guest is buying and what happens if they cancel is explained here, in the house's own words, before the handoff.
- Other routes: `/imsouane` (the village and wave), `/house`, `/coaching`, and the legal pages `/legal/{privacy,terms,refunds}`. There is also an enquiry form posting to `/api/enquiry` (SMTP mail).
- There is no content backend yet. Content lives as typed data in `src/lib/data` and in the feature folders.

## Capabilities and Constraints

- Next.js 16 (App Router), React 19, Tailwind v4, shadcn on Base UI, Redux Toolkit + RTK Query, MapLibre map. See README and AGENTS.md.
- Prices are shown in EUR (`src/lib/constants/currency.ts`).
- House facts (name, address, phone, coordinates, Google Business Profile) live in one place, `src/lib/constants/site.ts`, and must match the Business Profile to the letter.
- **Undecided:** whether enquiries and WhatsApp messages count as conversions alongside bookings; the localisation plan (currently English only); whether a payment provider's site review is a formal constraint.

## Brand Commitments

- Name: **Surf House Imsouane**. Tagline in use: "A surf and yoga retreat on Morocco's longest right-hand wave."
- Logos: `public/assets/logo.png`, `public/assets/logo_white.png`.
- Voice as it exists in the code: plain, specific and a little wry. It makes no claim that isn't backed further down the page (see the header comment in `src/features/packages/data/packages.ts`).
- Abdellah, the host, is named across the reviews and in existing copy.

## Evidence on Hand

- **Guest reviews** (`docs/reviews.md`, pulled 6 Sep 2026, quoted verbatim): Google 4.7/5 (138), Booking.com 8.4/10 with location 9.4 (382), TripAdvisor 4.6/5 (9). Recurring themes: location, Abdellah and staff, cleanliness, a calm family atmosphere, the rooftop, breakfast and the quiver. The recurring weak spots are also recorded there. Quote only from that file, and keep the quotes verbatim.
- **Photography and video** (`public/assets/`): surf, rooftop, bedrooms, living room, yoga, video analysis, evening theory, food, a hero video with poster, and book-a-stay galleries.
- **Absent, must not be fabricated:** coach names and credentials beyond what the coaching copy states, certifications, guest counts, press coverage, and any testimonial that isn't in `docs/reviews.md`.

## Product Principles

1. **Learners first.** When a choice has to be made, favour the beginner or intermediate surfer deciding on a coached week.
2. **Say what the week is before asking for the card.** Package contents, rate-plan differences and cancellation terms must be clear on this site before the Bookinglayer handoff.
3. **Every claim is earned.** Prices, inclusions and superlatives must trace to a source: package data, reviews or verified fact. If it can't be backed, leave it out.
4. **The wave, the method, the bay.** These three differentiators lead. Generic surf-camp promises (vibes, sunsets, "unforgettable") do not.
5. **One source per fact.** House details, prices and package facts live in one file each, and pages read from them.
