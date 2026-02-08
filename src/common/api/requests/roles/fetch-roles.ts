import { mapRoleResponseToRole } from "../../mappers/role.mapper";
import { request } from "../../request";
import { RoleResponse } from "../../responses/role.response";

export const fetchRoles = async () => {
  const response = await request.get<{
    data: RoleResponse[];
  }>("/api/v1/roles");

  return response.data.data.map((role) => mapRoleResponseToRole(role));
};
