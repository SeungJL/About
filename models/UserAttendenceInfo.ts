import { IAttendence } from "./attendence";
import { IUser } from "./user";

export interface UserAttendenceInfo {
  user: IUser
  attendences: IAttendence[]
}
