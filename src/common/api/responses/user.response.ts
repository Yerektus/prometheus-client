import { RoleResponse } from "./role.response";
import { LocationResponse } from "./location.response";

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_numbers: string;
  roles?: RoleResponse[];
  locations?: LocationResponse[];
}
