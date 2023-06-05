import { IAttendance, IParticipation } from "./studyDetails";
import { IUser } from "./user";

export interface IModalContext {
  OpenResult?: {
    attendences: IAttendance[];
  };
  Voter?: {
    attendences: IAttendance[];
  };
  StudyVote?: {
    participations: IParticipation[];
  };
  ProfileImg?: {
    user: IUser;
  };
  MemberInfoBg?: {
    userInfo: any;
  };
}
