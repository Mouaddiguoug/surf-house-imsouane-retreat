/**
 * The id of the sheet that slides up over the home hero. The hero is
 * pinned, so its own bottom edge never moves; the navbar watches this
 * sheet's top instead to know when to turn from transparent to sand. In a
 * plain module so the server page and the client navbar share one string.
 */
export const HERO_END_ID = "hero-end";
