import { Dayjs } from "dayjs";
import { Location } from "../../services/locationTypes";
import { ITimeStamps } from "../../utils/dateTimeTypes";
import { IUserSummary } from "../userTypes/userInfoTypes";

export interface IVote {
  date: Date;
  participations: IParticipation[];
}

export interface IParticipation {
  place: IPlace;
  attendences: IAttendance[];
  absences: IAbsence[];
  startTime?: Date;

  status: StudyStatus;
}

export interface IAttendance {
  user: IUserSummary;
  time: {
    start: Dayjs;
    end: Dayjs;
  };
  imageUrl?: string;
  arrived?: Date;
  firstChoice: boolean;
  memo: string;
}

export interface IPlace {
  status: string;
  brand: string;
  branch: string;
  fullname: string;
  coverImage: string;
  image: string;
  latitude: number;
  longitude: number;
  _id: string;
  location: Location;
  locationDetail: string;
  time: string;
}

export interface IAbsence extends ITimeStamps {
  user: IUserSummary;
  noShow: boolean;
  message: string;
}

export type StudyStatus = "pending" | "open" | "dismissed" | "free";

// export type StudyDateStatus = "passed" | "today" | "not passed";

export interface IStudyPlaces {
  place?: string;
  subPlace?: string[];
}

export interface IStudyTime {
  start?: Dayjs;
  end?: Dayjs;
}
export interface IStudyVote extends IStudyPlaces {
  memo?: string;
}
