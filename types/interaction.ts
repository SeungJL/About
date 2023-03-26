import { IAttendence, IParticipation } from "./studyDetails";
import { IUser } from "./user";

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
  MemberInfoBg?: {
    userInfo: any;
  };
}
