import { useSession } from "next-auth/react";
import styled from "styled-components";

import { ModalFooterNav, ModalMain, ModalXs } from "../../styles/layout/modal";

import dayjs from "dayjs";
import Image from "next/image";
import { SetStateAction } from "react";
import { ModalHeaderXLine } from "../../components/common/modal/ModalComponents";
import {} from "../../hooks/user/queries";
import {
  useUserParticipationRateQuery,
  useUserVoteRateQuery,
} from "../../hooks/user/studyStatistics/queries";

interface ILastWeekAttendPopUp {
  closePopUp: React.Dispatch<SetStateAction<boolean>>;
}

function LastWeekAttendPopUp({ closePopUp }: ILastWeekAttendPopUp) {
  const { data: session } = useSession();
  const name = session?.user.name;
  const { data: voteRate } = useUserVoteRateQuery(
    dayjs().subtract(8, "day"),
    dayjs().subtract(1, "day")
  );

  const { data: parRate, isLoading } = useUserParticipationRateQuery(
    dayjs().subtract(8, "day"),
    dayjs().subtract(0, "day")
  );

  const voteCnt = voteRate?.find((who) => who.uid === session?.uid)?.cnt;
  const parCnt = parRate?.find((who) => who.uid === session?.uid)?.cnt;

  const message =
    voteCnt === 0 ? "이번 주는 열심히 참여해봐요~!" : "이번 주도 파이팅~!";
  return (
    <>
      {!isLoading && (
        <Layout>
          <ModalHeaderXLine
            title={`${name}님의 지난주 기록`}
            setIsModal={closePopUp}
          />
          <ModalMain>
            <Main>
              <div>
                <Item>
                  <span>스터디 투표</span>
                  {voteCnt} 회
                </Item>
                <Item>
                  <span>스터디 참여 </span>
                  {parCnt} 회
                </Item>
              </div>
              <ImageWrapper>
                <div>
                  <Image
                    width={72}
                    height={72}
                    src={`${session?.user.image}`}
                    unoptimized={true}
                    alt="UserImage"
                  />
                </div>
              </ImageWrapper>
            </Main>
            <Message>{message}</Message>
          </ModalMain>

          <ModalFooterNav>
            <button onClick={() => closePopUp(false)}>확인</button>
          </ModalFooterNav>
        </Layout>
      )}
    </>
  );
}

const Layout = styled(ModalXs)`
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  flex: 0.8;
  display: flex;
  > div:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    overflow: hidden;
  }
`;

const Item = styled.div`
  > span {
    display: inline-block;
    width: 90px;
    font-weight: 600;
    font-size: 13px;
  }
`;

const Message = styled.div`
  margin-top: auto;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  color: var(--font-h2);
`;

const Footer = styled.footer`
  width: 100%;

  text-align: end;
  > button {
    color: var(--color-red);
    margin-right: 6px;
  }
`;
export default LastWeekAttendPopUp;
