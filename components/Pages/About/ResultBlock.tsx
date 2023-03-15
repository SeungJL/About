import styled from "styled-components";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IParticipation } from "../../../models/vote";
import { useSession } from "next-auth/react";
import {
  isShowVoteCancleState,
  modalContextState,
} from "../../../recoil/modalAtoms";
import {
  isShowOpenResultState,
  isShowVoterState,
  isUserAttendState,
} from "../../../recoil/studyAtoms";

import CheckUserModal from "../../../modals/study/confirm/AttendingPeopleModal";
import AttendCheckModal from "../../../modals/study/vote/voteStudy/CheckVoteModal";
import ModalPortal from "../../ModalPortal";
import { Modal } from "@chakra-ui/react";
import ChangeTimeModal from "../../../modals/study/vote/voteStudy/ChangeTimeModal";

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
  status: boolean;
}
const CancelBtn = styled.button<ICancelBtn>`
  display: ${(props) => (props.status ? "inline-block" : "none")};
  background-color: #fc8181;
  color: #822727;
`;

const VoterBtn = styled.button`
  background-color: #ffc72c;
  color: #2c3e50;
`;

interface IResultStatus {
  open: boolean;
}

const ResultStatus = styled.button<IResultStatus>`
  background: ${(props) => (props.open ? "#68D391" : "#d3d3d3")};
  color: ${(props) => (props.open ? "rgb(34,84,61)" : "rgb(0,0,0,0.7)")};
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

const Button = styled.button`
  display: inline-block;
  background-color: lightskyblue;
  color: black;
`;

function ResultBlock({ place, attendences, absences, status }: IParticipation) {
  const { data: session } = useSession();
  const setIsShowVoteCancle = useSetRecoilState(isShowVoteCancleState);

  const [isUserAttend, setIsUserAttend] = useRecoilState(isUserAttendState);
  const open = status === "open" ? true : false;

  const countArr = [];
  const [votalModalOpened, setVotalModalOpened] = useState(false);
  const setModalContext = useSetRecoilState(modalContextState);
  const [isCheckStudy, setIsCheckStudy] = useState(false);
  const setIsShowVoter = useSetRecoilState(isShowVoterState);
  const setIsShowOpenResult = useSetRecoilState(isShowOpenResultState);
  const [isChangeTimeModal, setIsChangeTimeModal] = useState(false);
  let cnt = 0;
  let SpaceName = place.fullname;
  if (SpaceName === "에이바우트커피 아주대점") {
    SpaceName = "에이바우트커피";
  }
  for (let i = 0; i < attendences.length; i++) {
    if (attendences[i].firstChoice) cnt++;
  }
  for (let i = 0; i < cnt + absences.length; i++) {
    if (i < attendences.length) countArr.push("attend");
    else countArr.push("absence");
  }
  const onClickOpen = () => {
    setIsShowOpenResult(true);
    setModalContext((old) =>
      Object.assign(
        {
          OpenResult: {
            attendences: attendences,
          },
        },
        old
      )
    );
  };
  const onClickVoter = () => {
    setIsShowVoter(true);

    setModalContext((old) =>
      Object.assign({
        Voter: {
          attendences: attendences,
        },
      })
    );
  };

  return (
    <>
      <ResultBlockLayout>
        <ResultBlockHeader>
          <span>{SpaceName}</span>
          <ResultBlockNav>
            {isUserAttend && open && (
              <>
                <TimeBtn onClick={() => setIsChangeTimeModal(true)}>
                  시간변경
                </TimeBtn>
                <Button onClick={() => setIsCheckStudy(true)}>참여현황</Button>
                <CancelBtn
                  onClick={() => setIsShowVoteCancle(true)}
                  status={Boolean(isUserAttend)}
                >
                  Cancel
                </CancelBtn>
              </>
            )}
            <VoterBtn onClick={onClickOpen}>투표현황</VoterBtn>
            <ResultStatus open={open}>
              {open ? "Open" : status === "dismissed" ? "Closed" : "투표중"}
            </ResultStatus>
          </ResultBlockNav>
        </ResultBlockHeader>
        <ResultChart>
          <div>
            <Image
              src={place.image}
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
      {isCheckStudy && (
        <ModalPortal closePortal={setIsCheckStudy}>
          <CheckUserModal />
        </ModalPortal>
      )}
      {isChangeTimeModal && (
        <ModalPortal closePortal={setIsChangeTimeModal}>
          <ChangeTimeModal setIsChangeTimeModal={setIsChangeTimeModal} />
        </ModalPortal>
      )}
    </>
  );
}
export default ResultBlock;

const TimeBtn = styled.button`
  display: inline-block;
  background-color: lightsalmon;
  color: #822727;
`;
