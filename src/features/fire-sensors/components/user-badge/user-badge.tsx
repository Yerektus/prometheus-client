import { Badge } from "@/common/components/ui/badge";
import { UserBadgeProps } from "./user-badge.types";

export const UserBadge = ({ user }: UserBadgeProps) => {
  const fullName = `${user.lastName} ${user.firstName}`;

  return <Badge variant={"outline"}>{fullName}</Badge>;
};
