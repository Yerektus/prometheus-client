import { cn } from "@/common/lib/utils";

interface UserInitialsProps {
  fullName?: string | null;
  fallback?: string | null;
  className?: string;
}

export function getUserInitials(
  fullName?: string | null,
  fallback?: string | null,
): string {
  const normalizedName = (fullName ?? "").trim();
  if (normalizedName && normalizedName !== "—") {
    const parts = normalizedName.split(/\s+/).filter(Boolean);
    const initials = parts
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

    if (initials) return initials;
  }

  const normalizedFallback = (fallback ?? "").trim();
  if (normalizedFallback && normalizedFallback !== "—") {
    return normalizedFallback.slice(0, 2).toUpperCase();
  }

  return "U";
}

export function UserInitials({
  fullName,
  fallback,
  className,
}: UserInitialsProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-foreground",
        className,
      )}
    >
      {getUserInitials(fullName, fallback)}
    </div>
  );
}

