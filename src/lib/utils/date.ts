/** Formats a Date as the API's `YYYY-MM-DD`, in local time. */
export function toIsoDate(date: Date): string {
  // `en-CA` renders as YYYY-MM-DD without shifting to UTC, which `toISOString`
  // would do — that can land on the wrong day either side of midnight.
  return date.toLocaleDateString("en-CA");
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/**
 * The Saturday–Sunday span the given date falls in or leads up to.
 *
 * On a Saturday the weekend is today and tomorrow; on a Sunday it is just
 * today. Otherwise it is the Saturday ahead and the day after.
 */
export function weekendRange(from: Date): { from: string; to: string } {
  const day = from.getDay(); // 0 = Sunday, 6 = Saturday

  if (day === 0) {
    const today = toIsoDate(from);
    return { from: today, to: today };
  }

  const saturday = day === 6 ? from : addDays(from, 6 - day);
  return { from: toIsoDate(saturday), to: toIsoDate(addDays(saturday, 1)) };
}

/** Parses `YYYY-MM-DD` as a local date, avoiding the UTC shift `new Date()` applies. */
function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year ?? 0, (month ?? 1) - 1, day ?? 1);
}

const dayFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});

/** e.g. "Sat 8 Aug". */
export function formatDayLabel(iso: string): string {
  return dayFormatter.format(parseIsoDate(iso));
}

/** First day of the month `iso` falls in, as a local Date. */
export function startOfMonth(iso: string): Date {
  const [year, month] = iso.split("-").map(Number);
  return new Date(year ?? 0, (month ?? 1) - 1, 1);
}

export function addMonths(date: Date, months: number): Date {
  const next = new Date(date);
  next.setDate(1);
  next.setMonth(next.getMonth() + months);
  return next;
}

/** `2026-08` — compares two dates by month without timezone games. */
export function monthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

const monthFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});

/** e.g. "August 2026". */
export function formatMonthLabel(date: Date): string {
  return monthFormatter.format(date);
}

const fullDayFormatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** e.g. "Saturday 8 August 2026" — for a day cell's accessible name. */
export function formatFullDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return fullDayFormatter.format(
    new Date(year ?? 0, (month ?? 1) - 1, day ?? 1),
  );
}

/** Monday-first weekday initials, aligned with `monthGrid`. */
export const WEEKDAY_INITIALS = ["M", "T", "W", "T", "F", "S", "S"] as const;

/**
 * The month laid out as weeks of ISO dates, Monday first. Days outside the
 * month are `null` so the grid keeps its shape without leaking neighbours.
 */
export function monthGrid(month: Date): (string | null)[][] {
  const year = month.getFullYear();
  const index = month.getMonth();
  const daysInMonth = new Date(year, index + 1, 0).getDate();

  // getDay() is Sunday-first; shift so Monday is 0.
  const leading = (new Date(year, index, 1).getDay() + 6) % 7;

  const cells: (string | null)[] = Array.from({ length: leading }, () => null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(toIsoDate(new Date(year, index, day)));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  return Array.from({ length: cells.length / 7 }, (_, week) =>
    cells.slice(week * 7, week * 7 + 7),
  );
}
