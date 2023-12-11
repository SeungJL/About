import { LocationFilterType } from "../system";
import { IUser } from "../user/user";
import { GatherStatus, IGatherComment } from "./gather";

export interface IGroupStudy extends IGroupStudyWriting {
  createdAt: string;
  participants: IUser[];
  comment: IGatherComment[];
}

export interface IGroupStudyWriting {
  category: IGroupStudyWritingCategory;
  title: string;
  content: string;
  status: GatherStatus;
  guide: string;
  gender: boolean;
  age: number[];
  password: string;
  organizer: IUser;
  location: LocationFilterType;
  date: string;
  memberCnt: {
    min: number;
    max: number;
  };
  id: number;
}

export interface IGroupStudyWritingCategory {
  main: string;
  sub: string;
}
