"use client";

import { Drawer } from "@base-ui/react/drawer";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { CONTACT_CHANNELS } from "@/components/shared/contact-channels";
import { BookButton } from "@/features/booking/components/book-button";
import { MENU_GROUPS, NAV_LINKS } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";

/**
 * Site header.
 *
 * Overlays the hero instead of sitting above it: the bar stays in normal flow
 * (so `sticky` works) but pulls the following section up under itself with a
 * negative bottom margin equal to its own height. That keeps `bg-bay-dusk`
 * running edge to edge behind the bar, and means no page has to reserve top
 * padding for a fixed header.
 *
 * Two colour states. Over the dark hero the bar is transparent with
 * shell-coloured type; a few pixels into the scroll it fades to a blurred
 * `background` surface with foreground type, so it stays legible over the pale
 * sections further down. Only the home page has that hero, so every other
 * route starts in the solid state. `Book now` is clay in both states — it is
 * the one element that should never recede.
 */
export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const solid = scrolled || pathname !== "/";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

  return (
    <header
      className={cn(
        "sticky top-0 z-40 -mb-16 h-16 border-b px-6 transition-colors duration-300 sm:-mb-20 sm:h-20 sm:px-10",
        "motion-reduce:transition-none",
        solid
          ? "border-border bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
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
        Skip to content
      </a>

      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${SITE.name} — home`}
          className={cn(
            "flex shrink-0 items-center gap-3 rounded-sm",
            focusRing,
          )}
        >
          {/* Two marks crossfaded rather than one swapped. The white line-art
              is the only one that reads over the hero footage; the gradient
              mark only works once the bar has faded up to a pale surface. A
              hard swap would pop against the bar's own 300ms colour fade.

              The box is fixed and both marks are `object-contain object-left`
              because the two files are different shapes — 3:2 for the gradient
              lockup, square for the white one — and letting each size itself
              would shuffle the wordmark sideways on every scroll.

              Both decorative: the link's aria-label already names the house,
              and on wider screens the wordmark beside it repeats the name. */}
          <span className="relative block h-9 w-14 shrink-0 sm:h-11 sm:w-16">
            <Image
              src="/assets/logo_white.png"
              alt=""
              fill
              sizes="64px"
              preload
              className={cn(
                "object-contain object-left transition-opacity duration-300",
                "motion-reduce:transition-none",
                solid ? "opacity-0" : "opacity-100",
              )}
            />
            <Image
              src="/assets/logo.png"
              alt=""
              fill
              sizes="64px"
              loading="eager"
              className={cn(
                "object-contain object-left transition-opacity duration-300",
                "motion-reduce:transition-none",
                solid ? "opacity-100" : "opacity-0",
              )}
            />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative inline-flex min-h-11 items-center rounded-sm px-4",
                "font-mono text-sm tracking-[0.18em] uppercase",
                "transition-colors duration-200 motion-reduce:transition-none",
                focusRing,
                solid
                  ? "text-foreground/70 hover:text-foreground"
                  : "text-house-shell/75 hover:text-house-shell",
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
          <BookButton className="h-11 px-4 text-xs sm:px-5">
            Book now
          </BookButton>

          <Drawer.Root
            swipeDirection="up"
            open={menuOpen}
            onOpenChange={setMenuOpen}
          >
            <Drawer.Trigger
              aria-label="Open menu"
              className={cn(
                "inline-flex size-11 cursor-pointer items-center justify-center rounded-xl border",
                "transition-colors duration-200 motion-reduce:transition-none",
                focusRing,
                solid
                  ? "border-border text-foreground hover:bg-muted"
                  : "border-house-shell/25 text-house-shell hover:bg-house-shell/10",
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
              {/* A sheet from the top, half the screen tall, the full width:
                  the menu is a map of the site, and a map wants to be read
                  across rather than down. Swiping up (or dragging the sheet
                  up) closes it. */}
              <Drawer.Viewport className="fixed inset-0 z-50 flex items-start justify-stretch">
                <Drawer.Popup
                  className={cn(
                    "flex h-[50dvh] min-h-[22rem] w-full flex-col rounded-b-3xl border-b border-border bg-background text-foreground shadow-2xl outline-none",
                    "[transform:translateY(var(--drawer-swipe-movement-y))]",
                    "transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]",
                    "data-swiping:duration-0 data-swiping:select-none",
                    "data-starting-style:[transform:translateY(-100%)] data-ending-style:[transform:translateY(-100%)]",
                    "motion-reduce:transition-none",
                  )}
                >
                  <div className="px-6 sm:px-10">
                    <div className="mx-auto flex w-full max-w-6xl items-center justify-between py-3">
                      <Drawer.Title className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                        Menu
                      </Drawer.Title>
                      <Drawer.Close
                        aria-label="Close menu"
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

                  <Drawer.Content className="flex min-h-0 flex-1 touch-auto flex-col overflow-y-auto overscroll-contain px-6 pb-4 sm:px-10 sm:pb-6">
                    <nav
                      aria-label="Menu"
                      className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-between gap-6 md:gap-8"
                    >
                      {/* The primary three, only where the bar has hidden
                          them. On md and up they are already in the bar and
                          the sheet is the way in to the deeper pages. */}
                      <ul className="flex flex-col md:hidden">
                        {NAV_LINKS.map((item) => (
                          <li key={item.href} className="flex">
                            {/* A plain link that closes the drawer, rather
                                than Drawer.Close rendering one: Close is a
                                button part and would put button semantics on
                                an anchor. Tapping still dismisses, so the
                                drawer never sits over the section it just
                                scrolled to. */}
                            <Link
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              className={cn(
                                "-mx-3 flex min-h-11 w-full cursor-pointer items-center rounded-xl px-3",
                                "font-display text-xl",
                                "transition-colors duration-200 hover:bg-muted motion-reduce:transition-none",
                                focusRing,
                              )}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* The deeper pages, as three columns across the
                          sheet. Hidden below md: half a phone screen holds
                          the primary three and a button, not twelve links. */}
                      <div className="hidden grid-cols-3 gap-10 md:grid">
                        {MENU_GROUPS.map((group) => (
                          <div key={group.id}>
                            <p className="text-muted-foreground font-mono text-xs tracking-[0.18em] uppercase">
                              {group.label}
                            </p>
                            <ul className="mt-3 flex flex-col">
                              {group.links.map((link) => (
                                <li key={link.href} className="flex">
                                  <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={cn(
                                      "-mx-3 flex min-h-11 w-full cursor-pointer items-center rounded-xl px-3",
                                      "font-display text-lg",
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

                      {/* The foot of the sheet: the direct lines on the left,
                          the one call to action on the right. Pinned down by
                          the column's justify-between, so the half-screen
                          sheet reads as full rather than as a short menu
                          with a gap under it. */}
                      <div className="border-border flex flex-col gap-4 border-t pt-3 md:flex-row md:items-center md:justify-between md:pt-5">
                        <ul className="flex flex-row flex-wrap gap-x-5">
                          {CONTACT_CHANNELS.map(
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
                                    "text-muted-foreground -mx-2 flex min-h-10 items-center gap-2 rounded-lg px-2 font-mono text-xs tracking-[0.05em] md:min-h-11",
                                    "transition-colors duration-200 hover:text-foreground motion-reduce:transition-none",
                                    focusRing,
                                  )}
                                >
                                  <Icon
                                    aria-hidden
                                    className="text-house-clay size-4 shrink-0"
                                  />
                                  <span className="sr-only">{prefix}: </span>
                                  {label}
                                  {external && (
                                    <span className="sr-only">
                                      {" "}
                                      (opens in a new tab)
                                    </span>
                                  )}
                                </a>
                              </li>
                            ),
                          )}
                        </ul>
                        <BookButton
                          onClick={() => setMenuOpen(false)}
                          className="h-12 w-full shrink-0 text-xs md:w-auto md:px-6"
                        >
                          Book now
                        </BookButton>
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
