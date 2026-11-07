"use client";

import { Drawer } from "@base-ui/react/drawer";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { contactChannels } from "@/components/shared/contact-channels";
import { BookButton } from "@/features/booking/components/book-button";
import { menuColumns, navLinks } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";
import {
  LOCALE_NAMES,
  localizeHref,
  stripLocale,
  type Locale,
} from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

/**
 * Site header.
 *
 * A solid sand bar with a 1px charcoal rule under it, on every page. The
 * V1.5 hero puts its footage in a frame beside the title rather than behind
 * it, so there is no dark first screen for a transparent bar to sit on, and
 * one state is simpler and steadier than two.
 *
 * The bar still pulls the next section up under itself (negative bottom
 * margin equal to its height), because the product pages' photographs are
 * built to run from the top of the window and fade into the page.
 *
 * The logo is the Terracotta A lockup (BR-006). It is drawn in terracotta
 * and charcoal and only reads on a light ground, which is why the bar is
 * never dark.
 */
const COPY = {
  en: {
    skip: "Skip to content",
    home: "home",
    book: "Book now",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    main: "Main",
    newTab: "(opens in a new tab)",
  },
  fr: {
    skip: "Aller au contenu",
    home: "accueil",
    book: "Réserver",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    menu: "Menu",
    main: "Principal",
    newTab: "(s'ouvre dans un nouvel onglet)",
  },
} as const;

/**
 * The switch between the two versions of the page being read. It names the
 * other language in that language — "Français" on an English page, "English"
 * on a French one — because that is the word a reader who needs it can read.
 * Shortened to the two-letter code in the bar, spelled out for assistive tech.
 */
function LanguageSwitch({
  locale,
  className,
  onNavigate,
}: {
  locale: Locale;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "/";
  const other: Locale = locale === "fr" ? "en" : "fr";
  const href = localizeHref(stripLocale(pathname), other);

  return (
    <Link
      href={href}
      hrefLang={other}
      lang={other}
      onClick={onNavigate}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm px-2 text-sm font-semibold tracking-[0.16em] uppercase underline-offset-4 hover:underline",
        className,
      )}
    >
      <span aria-hidden>{other}</span>
      <span className="sr-only">{LOCALE_NAMES[other]}</span>
    </Link>
  );
}

export function Navbar({ locale }: { locale: Locale }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const t = COPY[locale];
  const columns = menuColumns(locale);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 -mb-16 h-16 border-b border-house-ink bg-background sm:-mb-20 sm:h-20",
      )}
    >
      {/* First thing in the tab order: 3 links plus a CTA is not much to tab
          past, but it costs nothing and the nav grows. */}
      <a
        href="#main"
        className={cn(
          "sr-only rounded-xl bg-background px-4 py-2 text-sm text-foreground",
          "focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-10",
          focusRing,
        )}
      >
        {t.skip}
      </a>

      <div className="page-wrap flex h-full items-center justify-between gap-4">
        <Link
          href={localizeHref("/", locale)}
          aria-label={`${SITE.name} — ${t.home}`}
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-sm",
            focusRing,
          )}
        >
          {/* Decorative: the link's aria-label names the house. The SVG
              is the vertical lockup, so it is sized by height and the
              width follows its 748:539 box. */}
          <Image
            src="/brand/logo-terracotta-a.svg"
            alt=""
            width={748}
            height={539}
            preload
            className="h-11 w-auto sm:h-14"
          />
        </Link>

        <nav aria-label={t.main} className="hidden items-center md:flex">
          {navLinks(locale).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative inline-flex min-h-11 items-center rounded-sm px-4",
                "text-sm font-semibold tracking-[0.16em] uppercase",
                "text-foreground transition-colors duration-200 motion-reduce:transition-none",
                focusRing,
              )}
            >
              {item.label}
              {/* Scale-x on a pseudo-element, so the hover rule adds no
                  layout and nothing shifts under the pointer. */}
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-4 bottom-3 h-px origin-left scale-x-0 bg-current",
                  "transition-transform duration-200 group-hover:scale-x-100",
                  "motion-reduce:transition-none",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* A real button, not a link: it opens the booking dialog in place
              on whatever page the reader is on. */}
          <LanguageSwitch locale={locale} />
          <BookButton className="h-11 px-4 text-xs sm:px-5">
            {t.book}
          </BookButton>

          <Drawer.Root
            swipeDirection="up"
            open={menuOpen}
            onOpenChange={setMenuOpen}
          >
            <Drawer.Trigger
              aria-label={t.openMenu}
              className={cn(
                "inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border border-house-ink",
                "text-foreground transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
                focusRing,
              )}
            >
              <Menu aria-hidden className="size-5" />
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Backdrop
                className={cn(
                  "[--backdrop-opacity:0.55] fixed inset-0 z-50 min-h-dvh bg-house-deep backdrop-blur-[2px]",
                  "opacity-[calc(var(--backdrop-opacity)*(1-var(--drawer-swipe-progress)))]",
                  "transition-opacity duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
                  "data-swiping:duration-0 data-starting-style:opacity-0 data-ending-style:opacity-0",
                  // iOS 26+: keep the backdrop over the whole visible viewport.
                  "supports-[-webkit-touch-callout:none]:absolute",
                )}
              />
              {/* A sheet from the top, the full width: the menu is a map of
                  the site, and a map wants to be read across rather than
                  down. Swiping up (or dragging the sheet up) closes it.
                  Half the screen from sm up, where four columns of links fit
                  in that much and anything more would be empty space; taller
                  on a phone, where the same twelve links stack into two
                  columns and half a screen cannot hold them at a 44px touch
                  target. */}
              <Drawer.Viewport className="fixed inset-0 z-50 flex items-start justify-stretch">
                <Drawer.Popup
                  className={cn(
                    "flex h-[78dvh] max-h-[44rem] min-h-[22rem] w-full flex-col border-b border-house-ink bg-background text-foreground outline-none sm:h-[50dvh] sm:max-h-none",
                    "[transform:translateY(var(--drawer-swipe-movement-y))]",
                    "transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "data-swiping:duration-0 data-swiping:select-none",
                    "data-starting-style:[transform:translateY(-100%)] data-ending-style:[transform:translateY(-100%)]",
                    "motion-reduce:transition-none",
                  )}
                >
                  <div className="px-6 sm:px-10">
                    <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-3">
                      <Drawer.Title className="text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                        {t.menu}
                      </Drawer.Title>
                      <Drawer.Close
                        aria-label={t.closeMenu}
                        className={cn(
                          "inline-flex size-11 cursor-pointer items-center justify-center rounded-xl",
                          "transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
                          focusRing,
                        )}
                      >
                        <X aria-hidden className="size-5" />
                      </Drawer.Close>
                    </div>
                  </div>

                  <Drawer.Content className="flex min-h-0 flex-1 touch-auto flex-col px-6 pb-4 sm:px-10 sm:pb-6">
                    <nav
                      aria-label="Menu"
                      className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-6 md:gap-8"
                    >
                      {/* Only the links scroll. On a phone twelve of them
                          overflow half a screen, and pinning the foot keeps
                          the number and the one call to action in reach
                          instead of below the fold. */}
                      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                        {/* Every destination the site has, in columns: two
                          across on a phone, four on a wide sheet. The bar
                          already shows the primary three from md up, but
                          repeating them here keeps the sheet a complete map
                          rather than a partial one. */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-4 md:gap-10">
                          {columns.map((column) => (
                            <div key={column.id}>
                              <p className="text-muted-foreground text-xs font-semibold tracking-[0.16em] uppercase">
                                {column.label}
                              </p>
                              <ul className="mt-2 flex flex-col gap-1 md:mt-3 md:gap-0">
                                {column.links.map((link) => (
                                  <li key={link.href} className="flex">
                                    {/* A plain link that closes the drawer,
                                      rather than Drawer.Close rendering one:
                                      Close is a button part and would put
                                      button semantics on an anchor. Tapping
                                      still dismisses, so the sheet never sits
                                      over the section it just scrolled to. */}
                                    <Link
                                      href={link.href}
                                      onClick={() => setMenuOpen(false)}
                                      className={cn(
                                        "-mx-3 flex min-h-11 w-full cursor-pointer items-center rounded-xl px-3 py-1.5",
                                        "font-display text-lg leading-snug md:text-xl",
                                        "transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
                                        focusRing,
                                      )}
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* The foot of the sheet: the direct lines on the left,
                          the one call to action on the right. Pinned down by
                          the column's justify-between, so the half-screen
                          sheet reads as full rather than as a short menu
                          with a gap under it. */}
                      <div className="border-border flex shrink-0 flex-col gap-4 border-t pt-3 md:flex-row md:items-center md:justify-between md:pt-5">
                        <ul className="flex flex-row flex-wrap gap-x-5">
                          {contactChannels(locale).map(
                            ({ icon: Icon, prefix, label, href, external }) => (
                              <li key={href}>
                                <a
                                  href={href}
                                  {...(external
                                    ? {
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                      }
                                    : {})}
                                  className={cn(
                                    "text-muted-foreground -mx-2 flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm md:min-h-11",
                                    "transition-colors duration-200 hover:text-foreground motion-reduce:transition-none",
                                    focusRing,
                                  )}
                                >
                                  <Icon
                                    aria-hidden
                                    className="text-house-tide size-4 shrink-0"
                                  />
                                  <span className="sr-only">{prefix}: </span>
                                  {label}
                                  {external && (
                                    <span className="sr-only">
                                      {" "}
                                      {t.newTab}
                                    </span>
                                  )}
                                </a>
                              </li>
                            ),
                          )}
                        </ul>
                        <div className="flex items-center gap-3">
                          <LanguageSwitch
                            locale={locale}
                            onNavigate={() => setMenuOpen(false)}
                            className="border-house-ink h-12 border px-4"
                          />
                          <BookButton
                            onClick={() => setMenuOpen(false)}
                            className="h-12 flex-1 shrink-0 text-xs md:flex-none md:px-6"
                          >
                            {t.book}
                          </BookButton>
                        </div>
                      </div>
                    </nav>
                  </Drawer.Content>
                </Drawer.Popup>
              </Drawer.Viewport>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
