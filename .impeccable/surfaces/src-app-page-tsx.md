---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Home and product pages — V1.5 redesign

Scope: the whole marketing site (home, Original Stay, Custom Surf, Upgrade, Foundation, Golden Lines, Imsouane, House, Coaching, FR product pages). Mode: Persuade.

Source of truth: ~/Downloads/IMSOUANE_WEBSITE_V1_5_DEVELOPER_HANDOFF_R2 (WEB-UX-002 V1.5 R2, PROPOSED). Owner decisions on top of it (2026-11-07): new structure but keep selling (Original Stay and Custom Surf keep the Bookinglayer shop link and the €45 / 3 nights price; Foundation and Golden Lines are editorial, no price or booking); Fraunces + Manrope; only the new palette and the Terracotta A logo from the handoff, every other asset stays the site's own; verified reviews from docs/reviews.md stay.

Audience: international travellers choosing a stay by the bay; learners choosing surf. Job: understand the place, the Academy and the House, then take one of three paths: Stay, Surf, Already Booked.

## Direction contract
THESIS: An editorial chaptered book of a place, three coloured chapter bands (IMSOUANE terracotta, SURF ocean, HOUSE sage) dividing eight numbered sections. It refuses the surf-camp default of a full-bleed video hero with white type and a card grid of packages.
OWN-WORLD: Sand #FDFBF7 ground, charcoal #1C1C1C type and buttons, terracotta/ocean/sage only as surfaces and large type. Fraunces display (soft, optical-size), Manrope text. Near-square corners, 1px charcoal rules, no shadows, no glass. Chapter words set huge in sand on their colour.
STORY: The visitor meets the place first, then learns surf is a choice not a requirement, sees the House and its half-board stay, feels its life, reads real guests, and leaves through one of three clear paths.
FIRST VIEWPORT: 5:7 grid. Left: number 01, H1 "The Atlantic Home for Wave Seekers" in Fraunces at clamp(38px,5.5vw,80px), one sentence, three buttons Stay (solid charcoal) / Surf / Already Booked (outlined). Right: the real bay footage in a square-cornered frame, no text on it.
FORM: Editorial chaptered long-read, pinned by the brief (position 1 of 1; no seed, the handoff fixes the structure).
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
Brand name display (site says Surf House Imsouane, handoff and logo say Imsouane Surf House). New Bookinglayer product links. Legal pages still describe old rate plans. FR homepage not built (FR copy supplied in the handoff).
