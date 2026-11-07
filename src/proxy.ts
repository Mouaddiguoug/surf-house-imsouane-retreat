import { NextResponse, type NextRequest } from "next/server";

/**
 * Language routing.
 *
 * Every page lives under `app/[lang]`. French URLs already carry their
 * segment (`/fr/house`) and pass straight through. English URLs do not —
 * they keep the addresses the site has always had — so they are rewritten,
 * invisibly, onto the `en` segment: `/house` is served by `/en/house` and
 * the address bar still says `/house`.
 *
 * A request that spells `/en` out is redirected to the clean address, so
 * the same English page never answers at two URLs.
 *
 * No language is guessed from the browser: a reader gets the language of
 * the link they followed (see `src/lib/i18n/locale.ts`).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/fr" || pathname.startsWith("/fr/")) return;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    // Everything except Next's own files, the API, the public folders
    // (`assets`, `brand`, and `og` for the share images) and the metadata
    // routes that live at the app root.
    "/((?!_next|api|assets|brand|og/|favicon.ico|icon.png|apple-icon.png|robots.txt|sitemap.xml).*)",
  ],
};
