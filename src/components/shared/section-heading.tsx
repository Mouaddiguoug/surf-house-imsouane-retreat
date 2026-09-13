import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

/**
 * The eyebrow / title / subtitle stack every long-form section opens with.
 *
 * `tone` exists because two of the three sections sit on ink rather than on a
 * themed surface, where `text-muted-foreground` would be unreadable. The title
 * itself carries no colour class at all — it inherits from the section, so the
 * same component reads correctly on shell, on sand and on ink.
 */
const eyebrowVariants = cva("font-mono text-xs tracking-[0.18em] uppercase", {
  variants: {
    tone: {
      light: "text-house-clay",
      dark: "text-house-sky",
    },
  },
  defaultVariants: { tone: "light" },
});

const subtitleVariants = cva("font-display text-lg sm:text-xl", {
  variants: {
    tone: {
      light: "text-muted-foreground",
      dark: "text-house-sand/70",
    },
  },
  defaultVariants: { tone: "light" },
});

type SectionHeadingProps = {
  /** The small line above the title — "Package 01 · 7 nights". */
  eyebrow: string;
  title: string;
  subtitle: string;
  /**
   * The heading level. `h2` everywhere a section is one of several on a page,
   * which is nearly everywhere — and `h1` on the package pages, where the
   * section *is* the page and there is no hero above it to carry one. Changes
   * nothing about how it looks; the size is in the classes, not the tag.
   */
  as?: "h1" | "h2";
  className?: string;
} & VariantProps<typeof eyebrowVariants>;

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div data-slot="section-heading" className={cn("flex flex-col", className)}>
      <Heading className="font-display mt-4 text-3xl leading-[1.1] text-balance sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      <p className={cn(subtitleVariants({ tone }), "mt-3")}>{subtitle}</p>
    </div>
  );
}

export { SectionHeading, eyebrowVariants, subtitleVariants };
