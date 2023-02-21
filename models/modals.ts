import { IAttendence } from "./attendence";
import { IUser } from "./user";
import { IParticipation } from "./vote";

export interface IModalContext {
  OpenResult?: {
    attendences: IAttendence[];
  };
  Voter?: {
    attendences: IAttendence[];
  };
  StudyVote?: {
    participations: IParticipation[];
  };
  ProfileImg?: {
    user: IUser;
  };
  MembersInfoBg?: {
    userInfo: any;
  };
}
