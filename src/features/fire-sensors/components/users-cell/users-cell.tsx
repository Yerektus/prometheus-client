import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { UserBadge } from "../user-badge/user-badge";
import { UsersCellProps } from "./users-cell.types";
import { Button } from "@/common/components/ui/button";
import { Separator } from "@/common/components/ui/separator";

export const UsersCell = ({ users, visibleCount }: UsersCellProps) => {
  if (!users.length) return <span className="text-muted-foreground">—</span>;

  const visible = users.slice(0, visibleCount);
  const hidden = users.slice(visibleCount);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visible.map((user) => (
        <UserBadge key={user.username} user={user} />
      ))}
      {hidden.length > 0 && (
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">+{hidden.length}</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="text-sm font-medium">Пользователи</div>
            <Separator />
            <div className="flex flex-col gap-2">
              {visible.map((user) => (
                <UserBadge key={user.username} user={user} />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
