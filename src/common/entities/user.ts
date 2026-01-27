import { Role } from "./role";

export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumbers: string;
  roles?: Role[];
}
