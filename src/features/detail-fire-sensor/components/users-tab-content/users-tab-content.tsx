import { Badge } from "@/common/components/ui/badge";
import { UserInitials } from "@/common/components/user-initials/user-initials";
import { UsersTabContentProps } from "./users-tab-content.types";

export const UsersTabContent = ({ users }: UsersTabContentProps) => {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border/70 p-4 text-sm text-muted-foreground">
        Связанные пользователи отсутствуют.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {users.map((user) => {
        const fullName = [user.firstName, user.lastName]
          .filter(Boolean)
          .join(" ")
          .trim();
        const displayName = fullName || user.username || "—";
        const roleNames =
          user.roles?.map((role) => role.name).filter(Boolean) ?? [];

        return (
          <div
            key={user.id}
            className="w-full rounded-xl border border-border/70 bg-card/60 p-4"
          >
            <div className="flex items-start gap-3">
              <UserInitials fullName={displayName} fallback={user.username} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-muted-foreground">
                  @{user.username || "—"}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-12 text-sm">
              <div className="flex flex-col gap-1 rounded-lg">
                <span className="text-xs text-muted-foreground">Номер</span>
                <span className="break-words font-medium">
                  {user.phoneNumbers || "—"}
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg">
                <span className="text-xs text-muted-foreground">Почта</span>
                <span className="break-words font-medium">
                  {user.email || "—"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {roleNames.length > 0 ? (
                roleNames.map((roleName) => (
                  <Badge
                    key={`${user.id}-${roleName}`}
                    variant="outline"
                    className="bg-muted/40"
                  >
                    {roleName}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  Роль не назначена
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
