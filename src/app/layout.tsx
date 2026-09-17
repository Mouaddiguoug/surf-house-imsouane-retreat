import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Karla, Sora } from "next/font/google";
import Providers from "./providers";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { StructuredData } from "@/components/shared/structured-data";
import { BookStayDialog } from "@/features/booking/components/book-stay-dialog";
import { SITE } from "@/lib/constants/site";
import "@/styles/globals.css";

// Karla for body and UI — a narrow grotesque, so a spec table or a list of
// modules holds more per line than Inter did at the same size. Bricolage
// Grotesque for display: it has the wonky, slightly hand-cut personality a
// house needs, without the softness of a serif. Sora still carries the hero
// title alone, where the geometric sans reads colder and more deliberate.
const karla = Karla({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  // Ship the optical-size axis, not just weight: without it the file is
  // pinned at opsz 14 and every 48px heading gets letterforms drawn for
  // body copy. Browsers vary it by size on their own from here.
  axes: ["opsz"],
});

const sora = Sora({
  variable: "--font-title",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Site-wide metadata. Every page inherits this and overrides `title`,
 * `description`, `alternates.canonical` and `openGraph` for its own URL.
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
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Surf & Yoga Retreat in Imsouane, Morocco`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "A surf house on the bay at Imsouane, Morocco's longest right-hand wave. Coached surf weeks for beginners and longboarders, yoga, full board, and rooms over the sea.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_GB",
    url: "/",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${karla.variable} ${bricolage.variable} ${sora.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Extensions such as ColorZilla and Grammarly add attributes to <body>
          (`cz-shortcut-listen`, `data-gr-ext-installed`) before React
          hydrates, which React reports as a mismatch. This suppresses that one
          element's own attributes only — children are still fully checked. */}
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <StructuredData />
        <Providers>
          <Navbar />
          {children}
          <Footer />
          {/* One booking dialog for every "Book" button on every page. */}
          <BookStayDialog />
        </Providers>
      </body>
    </html>
  );
}
