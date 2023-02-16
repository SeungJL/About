export type DateTitleMode = "vote" | "result";

export interface IUseSession {
  data?: ISession;
  status: string;
}

export interface ISession {
  expires: string;
  role?: string;
  uid?: string;
  user: {
    image: string;
    name: string;
  };
}
