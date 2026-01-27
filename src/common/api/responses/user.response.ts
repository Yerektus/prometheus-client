import { RoleResponse } from "./role.response";

export interface UserResponse {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_numbers: string;
  roles?: RoleResponse[];
}
