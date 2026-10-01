---
name: Surf House Imsouane
description: A surf and yoga retreat on Morocco's longest right-hand wave.
colors:
  ink: "#141414"
  deep-night: "#0a0a0a"
  driftwood: "#483d36"
  weathered-stone: "#6d5f56"
  bleached-drift: "#a3978e"
  shell: "#fdfaf3"
  sand: "#f6eedd"
  wet-sand-line: "#e7dcc4"
  card-white: "#ffffff"
  clay: "#d72f23"
  sky: "#56cbf9"
  tide: "#1183b4"
  ember-error: "#a91b12"
  hairline: "rgba(20, 20, 20, 0.1)"
typography:
  display:
    fontFamily: "Sora, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 7vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Bricolage Grotesque, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "Bricolage Grotesque, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.15
  subtitle:
    fontFamily: "Bricolage Grotesque, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Karla, Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    letterSpacing: "0.18em"
  label-small:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.7rem"
    fontWeight: 400
    letterSpacing: "0.18em"
rounded:
  sm: "7.2px"
  md: "9.6px"
  lg: "12px"
  xl: "16.8px"
  2xl: "21.6px"
  3xl: "26.4px"
  full: "9999px"
spacing:
  gutter: "24px"
  gutter-sm: "40px"
  section: "96px"
  section-sm: "128px"
  container: "72rem"
components:
  button-clay:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.shell}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    height: "48px"
    padding: "0 24px"
  button-clay-hover:
    backgroundColor: "color-mix(in oklch, #d72f23, black 12%)"
  button-shell-outline:
    backgroundColor: "transparent"
    textColor: "{colors.shell}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    height: "48px"
    padding: "0 20px 0 24px"
  button-shell-outline-hover:
    backgroundColor: "rgba(253, 250, 243, 0.12)"
  button-sand-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.xl}"
    height: "48px"
    padding: "0 24px"
  button-sand-outline-hover:
    backgroundColor: "{colors.sand}"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    height: "48px"
    padding: "4px 10px"
  package-card:
    backgroundColor: "{colors.deep-night}"
    textColor: "{colors.shell}"
    rounded: "{rounded.3xl}"
    padding: "24px"
  price-pill:
    backgroundColor: "rgba(10, 10, 10, 0.65)"
    textColor: "{colors.shell}"
    rounded: "{rounded.full}"
    padding: "8px 14px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "44px"
    padding: "0 16px"
---

# Design System: Surf House Imsouane

## Overview

**Creative North Star: "The Bay at Dusk"**

The site reads like the bay at the end of a session. The top of the sky has gone near-black, cold blue lingers low on one side and clay red on the other, and under it the warm sand of the house. Every page lives between those poles. **Shell and sand** grounds carry the reading. **Ink bands** carry the moments that should feel like evening, such as booking, the living room and the day's rhythm. **Clay** is the ember that marks what to do next. Photography and footage do the persuading, and the interface stays out of their way.

The feel is **warm and tactile**. Corners are generous (up to 26px on photographs), shadows are ink-tinted rather than black, and photographs sit in rounded frames that push in slowly under the pointer. Type is quietly characterful. Bricolage Grotesque's slightly hand-cut forms carry the headings, a narrow Karla carries the body, and uppercase Geist Mono labels give the facts (level, format, "From €485") the air of a coach's clipboard. Motion is driven by scrolling rather than by timers: the page rises over the pinned hero, and rows rise into place as they arrive. Every motion effect has a reduced-motion fallback.

This world rejects two things by name. It is **not a generic surf camp**: no tie-dye, no hand-drawn waves, no tropical gradients, no backpacker-party energy. It is **not a SaaS page**: no purple gradients, no rows of icon cards, no glassy-dashboard chrome.

**Key Characteristics:**
- Light-first. Pages sit on shell (#fdfaf3), with sand and ink bands creating rhythm. There is no user-facing dark mode; ink sections are hand-set with a `tone="dark"` heading.
- Closed palette: five anchors (sand, clay, ink, driftwood, sky) and their tints. Nothing outside them.
- One red. Clay is reserved for the booking actions.
- Photographs as the hero material, framed in 26px corners with a warm lift.
- Uppercase, tracked mono for every label, fact term and button.
- Scroll-driven motion with feature and reduced-motion guards.

## Colors

A closed, warm-earth palette: five anchors and their tints and shades, with one cold blue kept for accessible links and focus.

### Primary
- **Clay** (#d72f23): the house's call to action. It is the "Book now" / "Book a stay" / "Book the Foundation" button, the house pin on the map, and one of the two blooms in the dusk hero gradient. On hover it darkens 12% toward black in OKLCH. It reads on cream and on video alike, so it never changes by context.

### Secondary
- **Tide** (#1183b4): the working blue. Focus rings, links, chart-1 and icons that must hold contrast on shell or sand (e.g. the enquiry-sent check).
- **Sky** (#56cbf9): the cold bloom in the dusk gradient, fact labels on ink, and icons in the ink footer. Too pale to carry text on light surfaces; use Tide there.

### Neutral
- **Ink** (#141414): body text, the primary/default button fill, the dark bands, and the tint of every shadow and scrim.
- **Deep Night** (#0a0a0a): the base of the dusk gradient, the glass tint on photographs, and the scrim under the hero footage.
- **Driftwood** (#483d36): the warm dark brown anchor, used for deep secondary text and chart-3.
- **Weathered Stone** (#6d5f56): muted foreground, i.e. subtitles, secondary copy and captions on light grounds.
- **Bleached Drift** (#a3978e): the quietest text tint, for de-emphasised metadata.
- **Shell** (#fdfaf3): the page ground and the text colour on every dark surface.
- **Sand** (#f6eedd): alternate section ground, muted and secondary fills, and hover wash on outline buttons.
- **Wet Sand Line** (#e7dcc4): input borders.
- **Card White** (#ffffff): card and popover surfaces that need to lift off shell.
- **Hairline** (rgba(20, 20, 20, 0.1)): all borders and dividers on light grounds.
- **Ember Error** (#a91b12): destructive states and form errors.

### Named Rules
**The Closed Palette Rule.** Every colour on the site is one of the five anchors or a tint, shade or `color-mix()` of them. A new hex that doesn't trace back to sand, clay, ink, driftwood or sky doesn't belong.

**The One Ember Rule.** Clay marks the next action and nothing decorative. One clay button per view region. Never clay body text, never clay backgrounds for whole sections, and never clay on stars, checks, chevrons or icons: stars take Driftwood, checks and link icons take Tide, chevrons and other icons take Weathered Stone.

**The Tide, Not Sky Rule.** Anything that must carry contrast on shell or sand (rings, links, icons) uses Tide. Sky only appears on ink or in the dusk gradient.

## Typography

**Display Font:** Sora (with Arial, sans-serif)
**Heading Font:** Bricolage Grotesque, with optical-size axis (with Arial, sans-serif)
**Body Font:** Karla (with Arial, Helvetica, sans-serif)
**Label/Mono Font:** Geist Mono (with ui-monospace)

**Character:** Bricolage brings a wonky, hand-cut warmth to every heading without the softness of a serif. Karla is narrow enough that fact tables and module lists hold more per line. Sora is geometric and a little colder, and it appears only on hero titles, where it reads as deliberate against moving footage.

### Hierarchy
- **Display** (Sora 400, clamp(2.5rem, 7vw, 4.5rem), line-height 0.95, tracking −0.025em): hero h1 on the inner pages (coaching, Imsouane). The home hero uses Sora at a smaller step (1.25rem → 2.25rem) because its two-line promise sits along the foot of the video. Always shell-coloured with a soft text shadow over footage.
- **Headline** (Bricolage 400, 1.875rem → 2.25rem → 3rem at sm/lg, line-height 1.1, `text-balance`): section titles via the shared section heading.
- **Title** (Bricolage 400, 1.5rem, line-height 1.15): card titles, form-success headings.
- **Subtitle** (Bricolage 400, 1.125rem → 1.25rem): the line under every section title, in Weathered Stone on light and sand at 70% on ink.
- **Body** (Karla 400, 1rem, line-height 1.625, `text-pretty`): all running copy. Paragraph measure stays under ~36rem (`max-w-xl`); narrow columns keep 16px instead of stepping to 18px.
- **Label** (Geist Mono 400, 0.75rem, tracking 0.18em, UPPERCASE): level names, nav links (at 0.875rem) and buttons (at 0.14em tracking).
- **Label small** (Geist Mono 400, 0.7rem, tracking 0.18em, UPPERCASE; the `text-label` token): fact terms, the "From" on price pills, review scores and disclosure labels. This is the floor: nothing on the site is set smaller.

### Named Rules
**The Three Voices Rule.** Sora speaks only in heroes, Bricolage speaks in headings, and Karla does the reading. Mono is punctuation, never prose: no mono sentences, no mono paragraphs.

**The Label Floor Rule.** The smallest type is the small label at 0.7rem (11.2px). Tracked uppercase mono below that is the first thing to go in sunlight on a phone.

**The Size Is In The Class Rule.** Heading levels are semantic (`h1` on package pages, `h2` elsewhere); visual size comes from the classes, so the same heading looks identical at either level.

## Layout

The page is a single column of full-bleed bands, each holding a centred container of **72rem** (`max-w-6xl`). Side gutters are **24px** on phones and **40px** from `sm` up, and the navbar uses the same gutters so its content aligns with the sections below. Section rhythm is **96px** vertical padding on phones and **128px** from `sm` (some bands use 80/112). The bands alternate shell, sand and ink so the scroll has a tide to it without dividers.

The home hero is a full-viewport pinned video. Its copy sits along the foot in two columns from `lg` (title left, pitch + CTAs right, sharing a baseline) and stacks left-aligned below that. The first section is a sheet that **rises over the hero**: it carries its own shell ground and an upward shadow so the edge lands as it crosses the footage.

The navbar is overlaid (a negative margin equal to its 64/80px height). It is transparent over the home hero and turns into a blurred shell bar once scrolled or on any inner page. `scroll-padding-top: 5rem` keeps hash links clear of it.

Grids are simple: 1 → 2 → 3 columns for package cards and paired form fields; no masonry. Touch targets are at least 44px, and primary CTAs are 48px.

## Elevation & Depth

A hybrid system. Most depth comes from **tonal banding** (shell ↔ sand ↔ ink) and **scrims over photography**. Shadows are reserved for things that physically sit on the page, such as cards and photographs, and they are always tinted with Ink rather than black so they stay in the warm palette.

### Shadow Vocabulary
- **Card** (`0 1px 2px color-mix(in srgb, #141414 4%, transparent), 0 12px 32px -12px color-mix(in srgb, #141414 14%, transparent)`): lifts a card off shell or sand without making it float.
- **Photo** (`0 2px 4px color-mix(in srgb, #141414 6%, transparent), 0 20px 48px -16px color-mix(in srgb, #141414 24%, transparent)`): one step deeper, because a photograph has no border to find its own edge.
- **Rise** (`0 -2rem 3rem -1.5rem color-mix(in srgb, #0a0a0a 55%, transparent)`): cast upward from the sheet that slides over the hero. It is deep because it falls on moving footage.

### Named Rules
**The Warm Shadow Rule.** Every shadow and scrim is mixed from Ink or Deep Night. Pure `rgba(0,0,0,…)` never appears.

**The Ink Glass Rule.** Text over a photograph sits on **dark** glass (Deep Night at 65%, 24px backdrop blur) above a gradient that darkens the frame from the middle down. Never use white frosted glass: it fails the moment the photo has sand or foam in the lower third. Measure contrast on the rendered pixels, not in theory.

## Shapes

The shapes are soft and generous, scaled from one **12px** base radius. Photographs and photo cards take the largest corner (**26.4px**, `rounded-3xl`), buttons and trigger chips take **16.8px** (`rounded-xl`), inputs and default controls take **12px** (`rounded-lg`), and price pills and badges are fully round. Inner panels inside a rounded card have no radius of their own. The card's clip rounds them, and a single hairline along the top is their only edge. Borders are hairlines (10% ink on light, 20% shell on glass), never heavier.

## Components

### Buttons
Warm and tactile, but disciplined: an uppercase mono label, generous height, and a 16.8px corner.
- **Shape:** gently rounded (16.8px) for house buttons; shadcn defaults keep 12px.
- **Clay (primary):** Clay fill, Shell text, Geist Mono 0.75rem with 0.14em tracking, uppercase. It is 48px tall with 24px padding in hero and section use, and 44px in the navbar. Hover darkens 12% toward black; a press nudges it down 1px.
- **Shell Outline:** for dark media only. A transparent fill with a 50% Shell border and a 2px backdrop blur. Hover lifts the border to 80% and adds a 12% Shell wash. A trailing arrow slides 2px right on hover.
- **Sand Outline:** the light-ground partner. A 15% Ink border on a transparent fill, washing to Sand on hover.
- **Focus:** a 3px Tide ring at 50%. On cards over photos, the ring is Shell at 80% with a 2px Ink offset.
- **Default/ghost/link (shadcn):** Ink-filled or ghost, used for utilitarian controls in dialogs and forms.

### Chips / Pills
- **Price pill:** Deep Night glass at 65% with a 24px blur and a 20% Shell hairline, fully rounded, pinned to the top-right of a package card. It reads "FROM" in the small label size (0.7rem), then the price in Bricolage, then "/ week" in small Karla at 70%.

### Cards / Containers
- **Package card (signature):** the photograph *is* the card. It is portrait 4:5, capped at 30rem tall, with a 26.4px corner and the Photo shadow. A Deep Night gradient darkens it from 45% down to 85%. The text sits flush along the foot on an Ink Glass panel (24px padding, 20% Shell hairline on top) with the title in Bricolage 1.5rem, a subtitle, and a mono-term fact list divided by hairlines. On hover the photo pushes in to 1.04 over 700ms and the glass deepens from 65% to 75%. The whole card is one link, so it has one tab stop.
- **Plain cards:** Card White or Sand on Shell, Card shadow, 21.6–26.4px corners, and 20–24px internal padding.

### Inputs / Fields
- **Style:** a Wet Sand Line border, transparent fill, and 12px corner. The house forms use 48px height; body text is 16px on phones (which prevents iOS zoom) and 14px from `md`.
- **Focus:** the border turns Tide, plus a 3px Tide ring at 50%.
- **Error / Disabled:** an Ember Error border with a 20% ring; disabled fields drop to 50% opacity.

### Navigation
- **Bar:** 64px on phones, 80px from `sm`, sticky and overlaid. It is transparent over the home hero with a white line-art mark, then crossfades over 300ms to a blurred 85% Shell bar with the colour mark once scrolled.
- **Links:** Geist Mono 0.875rem with 0.18em tracking, uppercase, 44px tall with 16px padding. They sit at 70–75% opacity and go to full opacity on hover, while a 1px underline scales in from the left.
- **Mobile:** a 44px bordered menu trigger (16.8px corner) opens a Base UI drawer that swipes up. The clay "Book now" stays visible in the bar at every width.

### Dusk Hero Gradient (signature)
The "Bay at Dusk" surface: Deep Night with a Sky bloom (58%) from the lower left, a Clay bloom (62%) from the lower right, and a faint Clay underglow. All blooms are centred below the frame so only their upper falloff shows, keeping the top dark enough for white display type. Check any text placed in the lower third against the rendered pixels.

### Hero Departure (signature motion)
The hero is pinned and the page rises over it. As it does, the footage drifts up 5% and scales to 1.12, and the copy lifts at exactly the speed of the rising edge and fades by 70% of half a viewport. It is driven by `animation-timeline: scroll()`, with no JavaScript. Browsers without support keep the pin alone, and so do readers who prefer reduced motion.

## Do's and Don'ts

### Do:
- **Do** set every page on Shell (#fdfaf3) and create rhythm with Sand and Ink bands instead of dividers.
- **Do** use Clay (#d72f23) for the one primary action per region, and the mono uppercase label (0.14em tracking) on every house button.
- **Do** frame photographs at the 26.4px corner with the Photo shadow, and let them push in slowly (1.04, 700ms) on hover.
- **Do** put text over photos on Ink Glass (Deep Night 65% + 24px blur + bottom gradient), and verify contrast on the rendered frame.
- **Do** mix every shadow and scrim from Ink or Deep Night.
- **Do** drive motion from the scroll timeline with the `cubic-bezier(0.32, 0.72, 0, 1)` ease, behind both an `@supports` guard and `prefers-reduced-motion: no-preference`.
- **Do** keep touch targets at least 44px and primary CTAs at 48px.

### Don't:
- **Don't** drift into a generic surf camp look: no tie-dye, hand-drawn waves, tropical or neon gradients, or party-hostel energy.
- **Don't** borrow SaaS/startup chrome: no purple gradients, rows of identical icon cards, or glassy dashboard panels.
- **Don't** use white frosted glass over photographs.
- **Don't** set text in Sky on Shell or Sand; use Tide.
- **Don't** introduce colours outside the five anchors and their tints.
- **Don't** use Sora outside hero titles, or set sentences in mono.
- **Don't** use pure black shadows or heavy borders; hairlines only.
- **Don't** put a small label (an eyebrow or kicker) above a heading; the heading carries the section.
- **Don't** set any text under 0.7rem (11.2px).
