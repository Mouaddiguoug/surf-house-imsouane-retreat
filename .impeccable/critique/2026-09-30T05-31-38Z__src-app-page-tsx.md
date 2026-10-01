---
target: critique src/app/page.tsx
total_score: 24
max_score: 36
na_heuristics: 7
p0_count: 1
p1_count: 2
target_identity: "file:/Users/gk/Downloads/surf-house-imsouane-retreat/src/app/page.tsx"
target_fingerprint: "sha256:b2622c0659264b5bd19f2b0a637c23b5dd4cbbf92095cda7d931bb72b33cbe84"
target_path: /Users/gk/Downloads/surf-house-imsouane-retreat/src/app/page.tsx
timestamp: 2026-09-30T05-31-38Z
slug: src-app-page-tsx
---
# Critique — home page (src/app/page.tsx)
Method: dual-agent (A: design review · B: detector + browser)

## Design Health Score — 24/36 (Acceptable, 67%); H7 n/a
1 Visibility 3 · 2 Real world 2 (two names per package, cents prices) · 3 Control 3 (marquee hover-only pause) · 4 Consistency 2 (€485 vs €435.60; dialog button styles) · 5 Error prevention 2 (non-refundable is clay primary; unfiltered terms) · 6 Recognition 3 · 7 n/a (Persuade) · 8 Aesthetic 3 · 9 Recovery 3 · 10 Help 3

## Specificity
Components authored (package cards, surf-level cards, Think twice list, rate dialog); page structure is category template. Wave / ISA method / bay have no section; H1 is generic. Detector: 18 advisory design-system-font-size (15 documented mono labels; undocumented: page.tsx:70 2rem, button.tsx:33 0.8rem, masterclass-package.tsx:84 0.7rem). Browser: 69 flags — real: 34 undersized-ui-text (9.6–10.4px), repeated "Bed, breakfast & board", FAQ kicker; false positives: ai-color-palette (brand sky/tide), cream-palette (Shell), image-hover-transform (documented), buried-raster (scroll timing).

## Priority Issues
- [P0] Price contradiction: hero "from €485" (page.tsx:94-95) vs cards/dialog "From €435.60"; cents read as computed. Fix: derive hero figure from PACKAGES; decide rounding/display of non-refundable. → clarify
- [P1] Order & story: Packages → Reviews → Book → Surf level → Trip fit → Contact asks before qualifying; no wave/method/bay section; generic H1. Fix: Hero → Packages → Surf level (with mapping) → proof strip → Reviews → Fit/FAQ → Book finale → Contact; rewrite H1. → layout, clarify
- [P1] Booking dialog: non-refundable is clay primary (book-stay-dialog.tsx:260); all plan.windows rendered unfiltered (line 206) so Foundation shows Custom Retreat's 10-day window; outline button type mismatch. Fix: equal weight or semi-flexible default for weeks; filter windows; match type. → harden
- [P2] Clay overuse (stars, checks, chevrons, contact icons, dialog names) breaks One Ember rule. Fix: stars driftwood, icons muted/tide, clay only on book buttons. → quieter
- [P2] 34 labels 9.6–10.4px. Fix: floor label step at ≥0.7rem, add to DESIGN.md ramp. → typeset

## Persona red flags
Jordan: two package names; €485 vs €435.60; "Surf" nav scrolls to hero; "semi-flexible" jargon. Riley: level 02 link promises two weeks, links one; book-stay-section.tsx:68 "write to us… by hand" contradicts online booking; "calendar" link goes to a section. Casey: top-corner CTAs on 12,061px page, no sticky bottom CTA; marquee moves under thumb; ~570px cards; dialog step-2 semi-flexible CTA below fold. Beginner persona: level check after ask; no ISA/ratio/coached day; 200 m swim requirement buried; reviews don't mention progress.

## Minor
Dead eyebrow prop in section-heading.tsx (+ stale mt-4) — clean up, don't restore; DESIGN.md wrongly says clay marks eyebrows. "Room" copy vs weeks. Desktop hero empty middle + right-aligned pitch. Reviews meta-subtitle in display face. Placeholder contrast (house-dim). Stale IA comments.

## Questions
Level check on the cards? A hero true only of this house? Should first-timers be steered to non-refundable?
