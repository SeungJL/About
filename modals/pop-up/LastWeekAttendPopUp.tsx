import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React from "react";
import styled from "styled-components";

import {
  ModalHeaderLine,
  ModalMd,
  ModalSm,
  ModalXs,
} from "../../styles/layout/modal";

import {
  useParticipationRateQuery,
  useScoreAllQuery,
  useScoreQuery,
  useVoteRateQuery,
  useWarningScoreQuery,
} from "../../hooks/user/queries";
import { now } from "../../libs/utils/dateUtils";
import dayjs from "dayjs";

export default function LastWeekAttendPopUp({ closePopUp }) {
  const { data: session } = useSession();
  const name = session?.user.name;
  const { data: voteRate } = useVoteRateQuery(
    dayjs().subtract(7, "day"),
    dayjs()
  );
  const { data: parRate } = useParticipationRateQuery(
    dayjs().subtract(7, "day"),
    dayjs()
  );
  const { data: warningScore } = useWarningScoreQuery();
  const { data: scores } = useScoreQuery();

  console.log(warningScore);
  const voteCnt = voteRate?.find((who) => who.name === session?.user.name)?.cnt;
  const parCnt = parRate?.find((who) => who.name === session?.user.name)?.cnt;
  const score = scores?.point;
  const WarningCnt = warningScore?.find(
    (who) => who.name === session?.user.name
  )?.score;
  console.log(voteCnt, parCnt, WarningCnt);

  const message =
    voteCnt === 0
      ? "이번 주는 열심히 참여해봐요~!"
      : "이번 주도 알차게 보내봐요~!";
  return (
    <Layout>
      <Header>
        <span>{name}님의 지난주 기록</span>
        <FontAwesomeIcon icon={faX} onClick={() => closePopUp(true)} />
      </Header>
      <Main>
        <span>
          스터디 투표:
          <span> {voteCnt}</span> 회
        </span>
        <span>
          스터디 참여:<span> {parCnt}</span> 회
        </span>
        <span>
          내 점수:<span>{score}</span> 점
        </span>
        <span>
          내 경고:<span> {WarningCnt}</span> 회
        </span>
        <Message>{message}</Message>
      </Main>
      <Footer>
        <button onClick={() => closePopUp(false)}>확인</button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(ModalXs)`
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--font-h4);
  padding-bottom: 6px;
  font-size: 13px;
  font-weight: 600;
`;
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div:last-child {
    text-align: center;
  }
  > span {
    font-size: 13px;
    > span {
      margin-left: 6px;
      font-weight: 600;
    }
  }
`;

const Message = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--font-h2);
  border-top: 1px solid var(--font-h4);
  padding-top: 6px;
`;

const Footer = styled.footer`
  width: 100%;

  text-align: end;
  > button {
    color: var(--color-red);
    margin-right: 6px;
  }
`;
