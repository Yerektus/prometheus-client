import { Badge } from "@/common/components/ui/badge";
import { Button } from "@/common/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/ui/popover";
import { Separator } from "@/common/components/ui/separator";
import { RolesCellProps } from "./roles-cell.types";

export const RolesCell = ({ roles, visibleCount }: RolesCellProps) => {
  if (!roles.length) {
    return <span className="text-muted-foreground">—</span>;
  }

  const visible = roles.slice(0, visibleCount);
  const hidden = roles.slice(visibleCount);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {visible.map((role, index) => (
        <Badge key={`${role}-${index}`} variant="outline">
          {role}
        </Badge>
      ))}
      {hidden.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">+{hidden.length}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-56">
            <div className="text-sm font-medium">Роли</div>
            <Separator />
            <div className="flex flex-col gap-2">
              {roles.map((role, index) => (
                <Badge key={`${role}-full-${index}`} variant="outline">
                  {role}
                </Badge>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
