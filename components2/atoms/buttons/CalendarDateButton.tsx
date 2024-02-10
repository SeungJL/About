import { IDayDate } from "@/types/utilityTypes/dateTimeTypes";

interface ICalendarDateButton extends IDayDate {}

export default function CalendarDateButton({ day, date }: ICalendarDateButton) {
  return (
    <button className="flex-col items-center">
      <div className="">{day} </div>
      <div className=""> {date}</div>
    </button>
  );
}
