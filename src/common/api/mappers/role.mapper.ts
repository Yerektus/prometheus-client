import { Role } from "@/common/entities/role";
import { RoleResponse } from "../responses/role.response";

export const mapRoleResponseToRole = (response: RoleResponse): Role => {
  return {
    name: response.name,
    description: response.description,
  };
};
