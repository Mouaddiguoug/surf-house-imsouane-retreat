import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type EditorialSplitProps = {
  image: { src: string; alt: string; position?: string };
  /** 4/3 for places and rooms, 4/5 where a person is the subject. */
  aspect?: "landscape" | "portrait";
  /** Picture on the right from 900px, instead of the left. */
  reverse?: boolean;
  children: React.ReactNode;
  className?: string;
};

/**
 * A photograph and a column of text, 7:5 from 900px and stacked below it.
 *
 * The picture takes the larger share and the text the smaller, and the text
 * is centred on the picture's height, so a short paragraph beside a tall
 * frame sits in the middle of it rather than leaving the lower half of the
 * column empty. The asymmetry the system asks for comes from the 7:5
 * proportion, not from rotation or ornament. `reverse` swaps the sides, so
 * two splits in neighbouring chapters do not repeat each other.
 */
export function EditorialSplit({
  image,
  aspect = "landscape",
  reverse = false,
  children,
  className,
}: EditorialSplitProps) {
  return (
    <div
      data-slot="editorial-split"
      className={cn(
        "grid gap-8 min-[900px]:items-center min-[900px]:gap-16",
        reverse
          ? "min-[900px]:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          : "min-[900px]:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-sm",
          aspect === "landscape" ? "aspect-4/3" : "aspect-4/5",
          reverse && "min-[900px]:order-2",
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 900px) 55vw, 100vw"
          style={{ objectPosition: image.position ?? "50% 50%" }}
          className="object-cover"
        />
      </div>

      <div
        className={cn(
          "max-w-[34rem]",
          reverse && "min-[900px]:order-1",
        )}
      >
        {children}
      </div>
    </div>
  );
}
