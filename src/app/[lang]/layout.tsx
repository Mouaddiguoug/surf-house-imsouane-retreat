import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Providers from "./providers";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StructuredData } from "@/components/shared/structured-data";
import { BookStayDialog } from "@/features/booking/components/book-stay-dialog";
import { SITE } from "@/lib/constants/site";
import {
  LOCALES,
  OG_LOCALES,
  asLocale,
  localeAlternates,
  localizeHref,
} from "@/lib/i18n/locale";
import "@/styles/globals.css";

// Fraunces for display, Manrope for text and UI — the second pairing in
// the brand guidelines, chosen by the founder for V1.5. Both are open-licence
// and self-hosted by next/font, so no request leaves the site for them.
// Fraunces ships its optical-size and softness axes: display sizes get the
// display drawing, and SOFT rounds the serifs a little, which is the
// "relaxed editorial" the system asks for rather than a bookish one.
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

/**
 * Site-wide metadata, per language. Every page inherits this and overrides
 * `title`, `description`, `alternates` and `openGraph` for its own URL.
 *
 * `metadataBase` is what turns every relative path below — canonicals, share
 * images, the sitemap — into the real domain rather than whichever host the
 * request came in on. Without it a Vercel preview and the live site would
 * each tell Google they were canonical.
 *
 * The default title carries the search terms the home page is meant to win
 * ("surf house", "Imsouane", "surf and yoga retreat", "Morocco"); the
 * template puts the name after each inner page's own subject, where Google
 * truncates last.
 */
/**
 * The name in the browser tab and in search-result titles: the logo's word
 * order. Only the titles use it; the business name in structured data, the
 * footer and emails stays `SITE.name`, which must match the Google Business
 * Profile letter for letter.
 */
const TAB_NAME = "Imsouane Surf House";

const SITE_COPY = {
  en: {
    title: `${TAB_NAME} — Stay and Surf in Imsouane, Morocco`,
    description:
      "A house in Imsouane, Morocco, by the Atlantic. Accommodation and half-board, with surf experiences you can choose from Imsouane Surf Academy.",
  },
  fr: {
    title: `${TAB_NAME} — Séjour et surf à Imsouane, Maroc`,
    description:
      "Une maison à Imsouane, au Maroc, au bord de l'Atlantique. L'hébergement et la demi-pension, avec les expériences surf que tu choisis auprès d'Imsouane Surf Academy.",
  },
} as const;

/** Both languages are built ahead of time; any other first segment is a 404. */
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = asLocale((await params).lang);
  const copy = SITE_COPY[locale];

  return {
    metadataBase: new URL(SITE.url),
    title: { default: copy.title, template: `%s | ${TAB_NAME}` },
    description: copy.description,
    alternates: localeAlternates("/", locale),
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: OG_LOCALES[locale],
      url: localizeHref("/", locale),
      images: ["/og/home.jpg"],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    // Search Console ownership. Paste the token Google gives you into
    // `.env.local` as NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION; the tag is only
    // rendered when it is set.
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const locale = asLocale((await params).lang);

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      {/* Extensions such as ColorZilla and Grammarly add attributes to <body>
          (`cz-shortcut-listen`, `data-gr-ext-installed`) before React
          hydrates, which React reports as a mismatch. This suppresses that one
          element's own attributes only — children are still fully checked. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <StructuredData locale={locale} />
        <Providers>
          <Navbar locale={locale} />
          {children}
          <Footer locale={locale} />
          {/* One booking dialog for every "Book" button on every page. */}
          <BookStayDialog locale={locale} />
        </Providers>
      </body>
    </html>
  );
}
