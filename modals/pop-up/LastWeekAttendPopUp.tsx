import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import React from "react";
import styled from "styled-components";
import {
  useParticipationRateQuery,
  useVoteRateQuery,
} from "../../hooks/user/queries";
import { now } from "../../libs/utils/dateUtils";
import { ModalLg } from "../../styles/LayoutStyles";

export default function LastWeekAttendPopUp({ closePopUp }) {
  const { data: session } = useSession();
  const name = session?.user.name;
  const voteRate = useVoteRateQuery(now(), now());
  const participationRate = useParticipationRateQuery(now(), now());
  const isLoading = participationRate.isLoading || voteRate.isLoading;

  const noticeMessage = isLoading
    ? ""
    : participationRate.data[name] >= 1
    ? "좋아요! 지금 만큼만 나오자구요!"
    : "조금만 더 열심히 참여해주세요 :)";
  return (
    <Layout>
      <Header>
        <span>지난 주 정산</span>
        <FontAwesomeIcon icon={faX} onClick={() => closePopUp(false)} />
      </Header>
      <Main>
        <div>
          {!isLoading ? (
            <>
              <u>{name}</u>님의 지난 주 스터디 참여 투표 횟수는
              <u>{voteRate?.data[name]}</u>회, 스터디 참여 횟수는
              <u>{participationRate?.data[name]}</u>회 입니다.{" "}
            </>
          ) : null}
        </div>
        <div>{noticeMessage}</div>
      </Main>
    </Layout>
  );
}

const Layout = styled(ModalLg)`
  display: flex;
  flex-direction: column;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 1px solid rgb(0, 0, 0, 0.5);
`;
const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div:last-child {
    text-align: center;
  }
`;
