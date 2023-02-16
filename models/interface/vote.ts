export interface AttendDTO {
  place: any;
  subPlace: any;
  start?: Date;
  end?: Date;
  confirmed: boolean;
  anonymity: boolean;
  lunch: "attend" | "absent" | "no_select";
  dinner: "attend" | "absent" | "no_select";
  afterDinner: "attend" | "absent" | "no_select";
}
