import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandProps = {
  className?: string;
};

export function Brand({ className }: BrandProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3 font-semibold text-note-ink", className)}>
      <span className="grid h-8 w-8 place-items-center rounded-md bg-note-mint text-lg font-black text-note-teal">M</span>
      <span className="text-lg tracking-normal">Maurice Notes</span>
    </Link>
  );
}
