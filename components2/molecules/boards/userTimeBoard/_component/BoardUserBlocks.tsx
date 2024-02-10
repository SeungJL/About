import { COLOR_TABLE } from "@/constants/colorConstants";
import { useEffect, useState } from "react";
import { ITimeBoardParticipant } from "../UserTimeBoard";
import { transformToUserBlocks } from "../_lib/transformToUserBlocks";

const BLOCK_WIDTH = 23.385;
export interface IUserTimeBlock {
  name: string;
  start: string;
  end: string;
  startInterval: number;
  startToEndInterval: number;
}

interface IBoardUserBlocks {
  participants: ITimeBoardParticipant[];
}
export default function BoardUserBlocks({ participants }: IBoardUserBlocks) {
  const [userBlocks, setUserBlocks] = useState<IUserTimeBlock[]>();

  useEffect(() => {
    const newUserBlocks = transformToUserBlocks(participants);
    setUserBlocks(newUserBlocks);
  }, [participants]);

  return (
    <div className="absolute w-full h-full pt-7">
      {userBlocks?.map((userBlock, idx) => (
        <div
          key={idx}
          className={`${COLOR_TABLE[idx]}  h-9 relative z-10 rounded-lg p-1 flex flex-col text-xxs text-white mb-1`}
          style={{
            minWidth: `${BLOCK_WIDTH * 3 + 2}px`,
            width: `${userBlock.startToEndInterval * BLOCK_WIDTH + 2}px`,
            marginLeft: `${
              userBlock.startInterval * BLOCK_WIDTH + BLOCK_WIDTH / 2 + 8
            }px`,
          }}
        >
          <div className="font-semibold">{userBlock.name} </div>
          <div className="">
            {userBlock.start}~{userBlock.end}{" "}
          </div>
        </div>
      ))}
    </div>
  );
}
