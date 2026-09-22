import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  badge,
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left",
        className
      )}
    >
      {badge && (
        <Badge
          variant="outline"
          className="border-l1-primary/30 bg-l1-primary/10 text-l1-primary px-3.5 py-1 text-xs font-semibold tracking-wide uppercase rounded-full shadow-sm shadow-l1-primary/10"
        >
          {badge}
        </Badge>
      )}
      <h2 className="font-heading text-3xl font-extrabold tracking-tight text-l1-text sm:text-4xl lg:text-5xl max-w-3xl leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-l1-text-muted max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
