"use client";

import * as React from "react";

import { cn } from "@/lib/utils/cn";

type OptionalQuestionProps = {
  /** The radio group's name, unique on the page. */
  name: string;
  legend: string;
  options: { value: string; label: string }[];
  /** What to show once an option is chosen; nothing before. */
  renderResult: (value: string) => React.ReactNode;
  resetLabel?: string;
  /** Read out when the reset empties the group, which is otherwise silent. */
  clearedLabel?: string;
  className?: string;
};

/**
 * An optional question, answered with native radios.
 *
 * Nothing is selected to begin with and nothing is stored, sent or used to
 * pick a product: the answer only changes the short note under the group,
 * which a polite live region reads out. Arrow keys move between options the
 * way a native group always has, and the reset puts the group back to empty
 * and says so, because a cleared radio group is otherwise silent.
 *
 * Without JavaScript the radios still work but the note never appears, and
 * every path the note points to is linked elsewhere on the page anyway.
 */
export function OptionalQuestion({
  name,
  legend,
  options,
  renderResult,
  resetLabel = "Reset answer",
  clearedLabel = "Answer cleared.",
  className,
}: OptionalQuestionProps) {
  const [value, setValue] = React.useState<string | null>(null);
  const [cleared, setCleared] = React.useState(false);
  const id = React.useId();

  return (
    <div
      data-slot="optional-question"
      className={cn("border-house-ink rounded-sm border p-5 sm:p-8", className)}
    >
      <fieldset>
        <legend className="font-display text-xl leading-snug sm:text-2xl">
          {legend}
        </legend>
        <div className="mt-5 flex flex-wrap gap-3">
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "border-house-ink inline-flex min-h-12 cursor-pointer items-center gap-3 rounded-sm border px-4 text-base",
                "transition-colors duration-150 hover:bg-house-sand motion-reduce:transition-none",
                "has-[:checked]:bg-house-ink has-[:checked]:text-house-shell",
                "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-house-ink",
              )}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => {
                  setValue(option.value);
                  setCleared(false);
                }}
                className="accent-house-terracotta size-4 focus-visible:outline-none"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div
        id={`${id}-result`}
        role="status"
        aria-live="polite"
        className="mt-5 text-base leading-relaxed empty:mt-0"
      >
        {value ? renderResult(value) : cleared ? (
          <span className="sr-only">{clearedLabel}</span>
        ) : null}
      </div>

      {value && (
        <button
          type="button"
          onClick={() => {
            setValue(null);
            setCleared(true);
          }}
          className="text-house-muted hover:text-house-ink mt-4 inline-flex min-h-11 cursor-pointer items-center text-sm underline underline-offset-4"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}
