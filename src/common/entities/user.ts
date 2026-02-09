import { FireSensor } from "./fire-sensor";
import { Location } from "./location";
import { Role } from "./role";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumbers: string;
  roles?: Role[];
  locations?: Location[];
}
