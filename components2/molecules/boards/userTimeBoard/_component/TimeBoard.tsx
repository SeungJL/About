import { STUDY_VOTE_HOUR_ARR } from "@/constants/serviceConstants/studyConstants/studyTimeConstant";

export default function TimeBoard() {
  return (
    <div className="px-2 absolute w-full h-full pb-4 flex justify-around text-gray-3">
      {STUDY_VOTE_HOUR_ARR.map((hour) => (
        <TimeBlock key={hour} hour={hour} />
      ))}
    </div>
  );
}

const TimeBlock = ({ hour }: { hour?: number }) => {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="mb-1">{hour}</div>
      <div className="flex-1 border-l border-gray-200" />
    </div>
  );
};
