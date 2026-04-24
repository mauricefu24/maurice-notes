import { ArrowRight } from "lucide-react";
import Link from "next/link";

type SectionHeadingProps = {
  title: string;
  href?: string;
  action?: string;
};

export function SectionHeading({ title, href, action = "查看全部" }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-[22px] font-semibold tracking-normal text-note-ink">{title}</h2>
      {href ? (
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-medium text-note-teal transition hover:text-teal-700">
          {action}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
