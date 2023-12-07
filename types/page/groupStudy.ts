import { LocationFilterType } from "../system";
import { IUser } from "../user/user";

export interface IGroupStudy extends IGroupStudyWriting{
  
}

export interface IGroupStudyWriting {
  category: IGroupStudyWritingCategory;
  title: string;
  content: string;
  guide: string;
  gender: boolean;
  age: number[];
  organizer: IUser;
  location: LocationFilterType;
  memberCnt: {
    min: number;
    max: number;
  };
}

export interface IGroupStudyWritingCategory {
  main: string;
  sub: string;
}
