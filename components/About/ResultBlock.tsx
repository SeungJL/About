import styled from "styled-components";
import Image from "next/image";

import { useEffect } from "react";

import { useSetRecoilState } from "recoil";
import {
  attendingState,
  isShowVoteCancleState,
  showOpenResultState,
  showVoterState,
} from "../../recoil/atoms";

import { IPlace } from "../../models/place";
import { IUser } from "../../models/user";
import { IParticipation } from "../../models/vote";

import { useSession } from "next-auth/react";

const ResultBlockLayout = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 10px rgb(0, 0, 0, 0.15);
  height: 90px;
  border-radius: 1.3vh;
  margin: 2px;
  margin-bottom: 10px;
  padding-left: 4px;
`;

const ResultBlockHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40%;
  > span {
    font-family: "NanumEx";
    font-size: 1.1em;
    display: inline-block;
    color: rgb(0, 0, 0, 0.7);
  }
`;

const ResultBlockNav = styled.nav`
  margin-right: 10px;
  display: flex;
  > button {
    font-family: "apple-system";
    font-weight: 600;
    font-size: 0.7em;
    width: 52px;
    height: 16px;
    margin-left: 6px;
    border-radius: 10px;
  }
`;

interface ICancelBtn {
  status: string;
}
const CancelBtn = styled.button<ICancelBtn>`
  display: ${(props) => (props.status === "open" ? "inline-block" : "none")};
  background-color: #fc8181;
  color: #822727;
`;

const VoterBtn = styled.button`
  background-color: #ffc72c;
  color: #2c3e50;
`;

interface IResultStatus {
  status: string;
}

const ResultStatus = styled.button<IResultStatus>`
  background: ${(props) => (props.status === "open" ? "#68D391" : "#d3d3d3")};
  color: ${(props) =>
    props.status === "open" ? "rgb(34,84,61)" : "rgb(0,0,0,0.7)"};
`;

const ResultChart = styled.div`
  display: flex;
  flex-direction: row;
  height: 60%;
  padding: 3px 0;
  > div {
    background-color: RGB(159, 89, 26, 0.1);
  }
  > div:first-child {
    margin-right: 3px;
    width: 48px;
    border-radius: 8px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ChartView = styled.div`
  padding-left: 3px;
  margin-right: 5px;
  border-radius: 1.5vw;
  display: flex;
  align-items: center;
  flex: 1;
`;

interface IBox {
  voteState: String;
}
const Box = styled.div<IBox>`
  background-color: ${(props) =>
    props.voteState === "attend" ? "RGB(125, 70, 20, 0.9)" : "#d3d3d3"};
  width: 40px;
  height: 40px;
  border-radius: 6px;
  margin-right: 1px;
`;

interface IResultBlock extends IParticipation {
  index: Number;
  vote: any;
  isLoading: any;
}

function ResultBlock({
  place,
  attendences,
  absences,
  index,
  status,
}: IResultBlock) {
  const { data: session } = useSession();

  const setAttending = useSetRecoilState(attendingState);
  const setIsShowVoteCancle = useSetRecoilState(isShowVoteCancleState);
  const setShowVoter = useSetRecoilState(showVoterState);
  const setShowOpenResult = useSetRecoilState(showOpenResultState);

  const countArr = [];
  for (let i = 0; i < attendences.length + absences.length; i++) {
    if (i < attendences.length) countArr.push("attend");
    else countArr.push("absence");
  }

  let spaceName = "About";
  if ((place as IPlace).brand === "카탈로그") spaceName = "Katalog";
  if ((place as IPlace).brand === "아티제") spaceName = "Artisee";

  const myAttendence = attendences.find(
    (att) => (att.user as IUser).uid === session?.uid
  );

  if (myAttendence) setAttending(index);

  return (
    <>
      <ResultBlockLayout>
        <ResultBlockHeader>
          <span>{spaceName}</span>
          <ResultBlockNav>
            {myAttendence?.confirmed && !myAttendence?.arrived && (
              <CancelBtn
                onClick={() => setIsShowVoteCancle(true)}
                status={status}
              >
                Cancel
              </CancelBtn>
            )}
            <VoterBtn onClick={() => setShowVoter(index)}>Voter</VoterBtn>
            <ResultStatus
              status={status}
              onClick={
                status === "open" ? () => setShowOpenResult(index) : null
              }
            >
              {status === "open"
                ? "Open"
                : status === "dismissed"
                ? "Closed"
                : "Voting..."}
            </ResultStatus>
          </ResultBlockNav>
        </ResultBlockHeader>
        <ResultChart>
          <div>
            <Image
              src={`/icons/${spaceName}.jpg`}
              alt="about"
              width={44}
              height={44}
              style={{ borderRadius: "6px" }}
            />
          </div>
          <ChartView>
            {countArr.map((item, idx) => (
              <Box key={idx} voteState={item} />
            ))}
          </ChartView>
        </ResultChart>
      </ResultBlockLayout>
    </>
  );
}
export default ResultBlock;
