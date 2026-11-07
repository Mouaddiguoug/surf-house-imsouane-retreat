import { PackageCard } from "@/features/packages/components/package-card";
import { PACKAGE_UI } from "@/features/packages/data/package-ui";
import { otherPackages } from "@/features/packages/data/packages";
import type { Locale } from "@/lib/i18n/locale";
import { cn } from "@/lib/utils/cn";

type OtherPackagesSectionProps = {
  /** The package whose page this is — the one card not to show. */
  current: string;
  /**
   * The ground this strip sits on. Each package page ends on a different
   * colour, and no two sections on this site share one back to back, so the
   * page picks the ground and the cards take the opposite light from it.
   */
  ground?: "sand" | "shell";
  locale?: Locale;
};

/**
 * The foot of a package page: the two you are not reading.
 *
 * A leaf page needs a way on that is not the back button, and the two
 * remaining packages are the only honest candidates — everything else on the
 * page already points at booking or at the coaching method.
 */
export function OtherPackagesSection({
  current,
  ground = "sand",
  locale = "en",
}: OtherPackagesSectionProps) {
  const others = otherPackages(current, locale);

  return (
    <section
      className={cn(
        "px-6 py-24 sm:px-10 sm:py-32",
        ground === "sand"
          ? "bg-house-sand text-house-ink"
          : "border-border bg-background border-t",
      )}
    >
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-display text-2xl leading-[1.1] text-balance sm:text-3xl">
          {PACKAGE_UI[locale].otherPackages}
        </h2>

        <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8">
          {others.map((entry) => (
            <PackageCard key={entry.slug} package={entry} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
