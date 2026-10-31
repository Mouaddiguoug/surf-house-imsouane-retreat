import { cva, type VariantProps } from "class-variance-authority";
import { Check, Plus } from "lucide-react";

import { cn } from "@/lib/utils/cn";

export type InclusionItem = string | { term: string; detail: string };

export type InclusionGroup = {
  title: string;
  items: InclusionItem[];
  /**
   * Things you can add rather than things you get. They take a plus, not a
   * tick: a tick beside a paid extra reads as a promise that it is included.
   */
  optional?: boolean;
};

export type InclusionNote = { title: string; body: string };

const sectionVariants = cva("px-6 py-20 sm:px-10 sm:py-28", {
  variants: {
    tone: {
      cream: "bg-background",
      sand: "bg-house-sand text-house-ink",
    },
  },
  defaultVariants: { tone: "cream" },
});

const quietVariants = cva("", {
  variants: {
    tone: {
      cream: "text-muted-foreground",
      sand: "text-house-muted",
    },
  },
  defaultVariants: { tone: "cream" },
});

const ruleVariants = cva("", {
  variants: {
    tone: {
      cream: "border-border",
      sand: "border-house-ink/15",
    },
  },
  defaultVariants: { tone: "cream" },
});

type PackageInclusionsProps = {
  id: string;
  heading: string;
  /** What the price covers and how the stay is shaped, beside the lists. */
  intro?: string[];
  groups: InclusionGroup[];
  /** The small print that is worth reading: extras, companions, limits. */
  notes?: InclusionNote[];
} & VariantProps<typeof sectionVariants>;

/**
 * What the stay includes, in lists rather than paragraphs.
 *
 * This is the part of a package page a reader comes back to with a card in
 * their hand, checking one line against another, so it is laid out to be
 * scanned: the heading and the shape of the stay pinned on the left, the
 * lists on the right, each line ticked. No cards — the lists are the
 * content, and boxing them would make the page a grid of rectangles at the
 * moment it should be at its plainest.
 *
 * The notes close the column on a hairline each. They are the questions a
 * guest emails about — the extras, a partner who does not surf, what the
 * week is not — answered where the reader is already looking.
 */
export function PackageInclusions({
  id,
  heading,
  intro,
  groups,
  notes,
  tone,
}: PackageInclusionsProps) {
  return (
    <section id={id} className={sectionVariants({ tone })}>
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl">
            {heading}
          </h2>
          {intro?.map((paragraph) => (
            <p
              key={paragraph}
              className={cn(
                quietVariants({ tone }),
                "mt-4 max-w-md text-base leading-relaxed text-pretty first-of-type:mt-5",
              )}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {groups.map((group) => (
              <div key={group.title}>
                <h3 className="font-display text-xl leading-snug">
                  {group.title}
                </h3>
                <ul
                  className={cn(ruleVariants({ tone }), "mt-4 divide-y")}
                  role="list"
                >
                  {group.items.map((item) => {
                    const key = typeof item === "string" ? item : item.term;
                    return (
                      <li
                        key={key}
                        className={cn(
                          ruleVariants({ tone }),
                          "flex gap-3 py-3 text-sm leading-relaxed first:pt-0",
                        )}
                      >
                        {group.optional ? (
                          <Plus
                            aria-hidden
                            className={cn(
                              quietVariants({ tone }),
                              "mt-1 size-3.5 shrink-0",
                            )}
                          />
                        ) : (
                          <Check
                            aria-hidden
                            className="text-house-tide mt-1 size-3.5 shrink-0"
                          />
                        )}
                        {typeof item === "string" ? (
                          <span>{item}</span>
                        ) : (
                          <span>
                            <span className="font-medium">{item.term}</span>
                            <span className={quietVariants({ tone })}>
                              {" "}
                              — {item.detail}
                            </span>
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {notes && notes.length > 0 && (
            <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {notes.map((note) => (
                <div
                  key={note.title}
                  className={cn(ruleVariants({ tone }), "border-t pt-6")}
                >
                  <h3 className="font-display text-lg leading-snug">
                    {note.title}
                  </h3>
                  <p
                    className={cn(
                      quietVariants({ tone }),
                      "mt-2 text-sm leading-relaxed text-pretty",
                    )}
                  >
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
