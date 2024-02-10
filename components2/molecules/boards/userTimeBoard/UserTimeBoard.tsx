import { IHighlightedText } from "@/components/atoms/HighlightedText";
import { Dayjs } from "dayjs";
import BoardHeaderText from "./_component/BoardHeaderText";
import BoardUserBlocks from "./_component/BoardUserBlocks";
import TimeBoard from "./_component/TimeBoard";

export interface ITimeBoardParticipant {
  name: string;
  time: {
    start: Dayjs;
    end: Dayjs;
  };
}

interface ITimeBoard {
  headerText: IHighlightedText;
  participants: ITimeBoardParticipant[];
}

export default function UserTimeBoard({
  participants,
  headerText,
}: ITimeBoard) {
  return (
    <div className="min-h-40 mx-4 my-4 ">
      <BoardHeaderText headerText={headerText} />
      <div
        className="flex flex-col pt-2 relative rounded-lg bg-white shadow-md"
        style={{ height: `${participants.length * 38 + 52}px` }}
      >
        <TimeBoard />
        <BoardUserBlocks participants={participants} />
      </div>
    </div>
  );
}
