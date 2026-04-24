import { cn } from "@/lib/utils";

type HomeBadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export function HomeBadge({ children, className }: HomeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-note-mint px-3 py-1 text-xs font-medium text-note-teal",
        className,
      )}
    >
      {children}
    </span>
  );
}
