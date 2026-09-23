import type * as React from "react";

import { LEGAL, isPending } from "@/features/legal/data/legal";
import { cn } from "@/lib/utils/cn";

/**
 * A fact the house still has to supply, drawn so it cannot be missed.
 *
 * The compliance note this site is being built against is explicit that a
 * reviewer must not find work-in-progress copy — so the right behaviour is
 * not to hide a gap behind plausible wording but to make it loud enough that
 * nobody deploys past it. Red, in the page's own accent, reading as an
 * editorial mark rather than as part of the policy.
 */
export function ToConfirm({ children }: { children: React.ReactNode }) {
  return (
    <mark className="bg-house-clay/10 text-house-clay ring-house-clay/30 rounded px-1.5 py-0.5 font-mono text-[0.7rem] tracking-[0.12em] uppercase ring-1">
      To confirm: {children}
    </mark>
  );
}

/** Renders a supplied value, or the marker when it is still missing. */
export function Fact({
  value,
  describe,
}: {
  value: string | null;
  describe: string;
}) {
  return isPending(value) ? <ToConfirm>{describe}</ToConfirm> : <>{value}</>;
}

/**
 * The shell every legal page shares.
 *
 * One column at a reading measure rather than the site's usual wide grid:
 * these are read in sequence, by someone looking for a specific clause, and
 * the six-column layouts the rest of the site uses would put a 120-character
 * line under them. Styling is applied from here by descendant selector so the
 * pages themselves stay close to prose.
 */
export function LegalPage({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <main
      id="main"
      className="bg-background flex-1 px-6 py-20 sm:px-10 sm:py-28"
    >
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-house-clay font-mono text-xs tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
        <h1 className="font-display mt-4 text-4xl leading-[1.05] text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">
          {summary}
        </p>
        <p className="text-muted-foreground border-border mt-8 border-t pt-6 font-mono text-xs tracking-[0.05em]">
          Last updated{" "}
          <time dateTime={LEGAL.updated}>
            {new Date(LEGAL.updated).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </p>

        <div
          className={cn(
            "mt-12 text-base leading-relaxed",
            "[&_h2]:font-display [&_h2]:mt-12 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:leading-snug [&_h2]:first:mt-0",
            "[&_h3]:font-display [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-lg",
            "[&_p]:mt-4 [&_p]:text-pretty",
            "[&_ul]:mt-4 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2.5",
            "[&_li]:relative [&_li]:pl-5",
            "[&_li]:before:bg-house-clay [&_li]:before:absolute [&_li]:before:top-[0.6rem] [&_li]:before:left-0 [&_li]:before:size-1.5 [&_li]:before:rounded-full [&_li]:before:content-['']",
            "[&_dl]:border-border [&_dl]:mt-6 [&_dl]:flex [&_dl]:flex-col [&_dl]:gap-3 [&_dl]:border-t [&_dl]:pt-6",
            "[&_dt]:text-muted-foreground [&_dt]:font-mono [&_dt]:text-[0.65rem] [&_dt]:tracking-[0.18em] [&_dt]:uppercase",
            "[&_dd]:mt-1",
            "[&_a]:text-house-tide [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:duration-200 hover:[&_a]:text-foreground",
            "[&_strong]:font-semibold",
          )}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
