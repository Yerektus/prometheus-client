import { User } from "@/common/entities/user";
import { UserResponse } from "../responses/user.response";
import { mapRoleResponseToRole } from "./role.mapper";
import { mapLocationResponseToLocation } from "./location.mapper";

export const mapUserResponseToUser = (response: UserResponse): User => {
  return {
    id: response.id,
    username: response.username,
    email: response.email,
    firstName: response.first_name,
    lastName: response.last_name,
    phoneNumbers: response.phone_numbers,
    roles: response.roles?.map((role) => mapRoleResponseToRole(role)),
    locations: response.locations?.map((location) =>
      mapLocationResponseToLocation(location),
    ),
  };
};
