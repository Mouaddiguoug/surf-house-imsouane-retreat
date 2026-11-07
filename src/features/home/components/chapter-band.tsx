import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const bandVariants = cva(
  "@container grid min-h-[18rem] grid-rows-[auto_auto] content-between gap-8 overflow-hidden rounded-sm p-5 sm:p-8 min-[900px]:min-h-[24rem] min-[900px]:p-10",
  {
    variants: {
      tone: {
        terracotta: "bg-house-terracotta",
        ocean: "bg-house-ocean",
        sage: "bg-house-sage",
      },
    },
  },
);

type ChapterBandProps = {
  /** The chapter word, set in sand at display size: IMSOUANE, SURF, HOUSE. */
  word: string;
  /** "02" — the section's place in the eight. */
  number: string;
  /** The line on the sand panel. */
  heading: string;
  tone: "terracotta" | "ocean" | "sage";
  /**
   * Which corners the word and the panel take. The three bands share one
   * structure — two rows, the word and the panel in opposite corners — and
   * differ only in which corners, so they read as a set rather than three
   * improvisations, and never as one composition repeated (DS rule).
   *
   * `place`: panel top right, word bottom left.
   * `surf`: word top right, panel bottom left — the mirror of `place`.
   * `house`: word top left, panel bottom right.
   */
  composition: "place" | "surf" | "house";
  className?: string;
};

/**
 * A chapter divider: one of the three brand colours as a surface, the
 * chapter's name across it in sand, and a sand panel carrying the number and
 * a line of charcoal text.
 *
 * The word and the panel sit in separate rows, so however wide the word
 * grows it can never run under the panel. Its size is a share of the band's
 * own width (container units), the same share in every band — IMSOUANE,
 * SURF and HOUSE are one size of letter, which is what makes three bands of
 * different words look like one system.
 *
 * The word is large text by any measure, which is what lets it be sand on a
 * brand colour at all: sand clears the 3:1 large-text bar on all three
 * (terracotta 4.5, ocean 3.6, sage 4.2) and fails the 4.5:1 ordinary-text
 * bar on two, so nothing smaller than display size is set on the colour.
 * The panel is where reading happens. The word is `aria-hidden` because the
 * section's heading already says it.
 */
export function ChapterBand({
  word,
  number,
  heading,
  tone,
  composition,
  className,
}: ChapterBandProps) {
  const panelFirst = composition === "place";
  const wordRight = composition === "surf";
  const panelRight = composition !== "surf";

  const panel = (
    <div
      className={cn(
        "bg-house-shell text-house-ink w-full max-w-[22rem] rounded-sm p-5 sm:p-6",
        panelRight && "justify-self-end",
      )}
    >
      <p className="text-xs font-semibold tracking-[0.16em] tabular-nums">
        {number} / {word}
      </p>
      <p className="font-display mt-2 text-2xl leading-tight text-balance">
        {heading}
      </p>
    </div>
  );

  const letters = (
    <p
      aria-hidden
      className={cn(
        "font-display text-house-shell -mb-[0.12em] text-[15cqi] leading-[0.85] tracking-[-0.03em] select-none min-[900px]:text-[13cqi]",
        wordRight && "text-right",
      )}
    >
      {word}
    </p>
  );

  return (
    <div
      data-slot="chapter-band"
      className={cn(bandVariants({ tone }), className)}
    >
      {panelFirst ? panel : letters}
      {panelFirst ? letters : panel}
    </div>
  );
}
