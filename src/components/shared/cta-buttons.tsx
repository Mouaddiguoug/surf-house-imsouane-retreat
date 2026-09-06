import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { CONTACT_HREF } from "@/lib/constants/nav";
import { cn } from "@/lib/utils/cn";

/**
 * The house's paired calls to action.
 *
 * Built for dark media: `shellOutline` takes its contrast from whatever scrim
 * sits under it, so this belongs over the hero rather than on a cream section.
 * Both are 48px tall — comfortably past the 44px touch target — and wrap onto
 * two rows rather than shrinking when the viewport gets narrow. The arrow is
 * decorative: "Get in touch" already says where the link goes, so it is hidden
 * from the accessibility tree.
 */
export function CtaButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Link
        href={CONTACT_HREF}
        className={cn(
          buttonVariants({ variant: "shellOutline" }),
          // `data-icon` on the arrow triggers the base style's trailing-icon
          // rule, which tightens pr to 8px — right for a 32px button, cramped
          // on a 48px one. pr-5 keeps it optically even against the 24px left.
          "h-12 w-full gap-2 px-6 text-xs has-data-[icon=inline-end]:pr-5 sm:w-auto",
        )}
      >
        Get in touch
        <ArrowRight
          aria-hidden
          data-icon="inline-end"
          className="transition-transform duration-200 motion-safe:group-hover/button:translate-x-0.5"
        />
      </Link>
    </div>
  );
}
