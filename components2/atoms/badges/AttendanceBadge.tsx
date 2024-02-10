import OutlineBadge from "./OutlineBadge";

interface IAttendanceBadge {
  type: "attend" | "dismissed";
  time?: string;
}
export default function AttendanceBadge({ type, time }: IAttendanceBadge) {
  return (
    <div className={`flex flex-col items-center ${time && "mt-1"}`}>
      <OutlineBadge
        colorType={type === "attend" ? "mint" : "red"}
        text={type === "attend" ? "출석" : "불참"}
      />
      <span className=" text-xxs text-gray-4">{time} </span>
    </div>
  );
}
