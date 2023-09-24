import { IPlace } from "./study/studyDetail";
import { IUser } from "./user/user";

export interface IAttendance2 extends Document {
  date: Date;
  participants: IParticipant[];
  meetingTime: string;
  meetingPlace: string | IPlace;
  process: string;
  firstChoice?: boolean;
}

export interface IParticipant {
  user: IUser;
  time?: string;
  place?: IPlace;
}
