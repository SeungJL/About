import { Button } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/layouts/Modals";
import { ModalMain, ModalXL } from "../../styles/layout/modal";

import RequestPromotionRewardModal from "../userRequest/RequestPromotionRewardModal";

import dayjs from "dayjs";
import Image from "next/image";
import Skeleton from "../../components/common/Skeleton";
import { useUserRequestQuery } from "../../hooks/userRequest/queries";

interface IPromotionModal {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}

function PromotionModal({ setIsModal }: IPromotionModal) {
  const [isApplyModal, setIsApplyModal] = useState(false);
  const { data, isLoading } = useUserRequestQuery();

  const [isFirst, setIsFirst] = useState(true);

  const applyCnt = data?.filter(
    (item) =>
      item.title === "홍보" &&
      item?.writer !== "이승주" &&
      item?.writer !== "옌"
  ).length;
  console.log(isFirst);

  const currentMonth = dayjs().month();
  console.log(currentMonth);
  return (
    <>
      <Layout>
        <ModalHeaderX title="홍보 이벤트" setIsModal={setIsModal} />
        <ModalMain>
          <Overview>
            본인 학교 에브리타임에 동아리 홍보글을 작성해주시면 <b>+15 Point</b>
            와 추첨을 통해 매 달 <b>BBQ 황금 올리브 치킨 세트</b>를 드립니다!
            중복 지원도 가능하니까 생각나실 때 여러번 지원해주시면 더 감사합니다
            ^^...
          </Overview>
          <ImageWraaper>
            <Image
              width={120}
              height={120}
              alt="chicken"
              src="https://user-images.githubusercontent.com/84257439/235454460-07e32553-3be0-41f2-8e3e-801c2ecdf059.png"
            />
          </ImageWraaper>
          {isFirst ? (
            <Detail>
              <div>
                <span>상품</span>
                <span>BBQ 황금 올리브 치킨 세트</span>
              </div>
              <div>
                <span>추첨 인원</span>
                <b>2명</b>
              </div>
              <div>
                <span>현재 참여 수</span>
                <VoteNum>
                  <Skeleton isLoad={!isLoading}>
                    {applyCnt || ""}명<Temp>(중복 포함)</Temp>
                  </Skeleton>
                </VoteNum>
              </div>
              <div>
                <span>추첨 날짜</span>
                <span>{currentMonth + 2}월 1일</span>
              </div>
            </Detail>
          ) : (
            <LastWinner>
              <span>{currentMonth + 1}월 당첨자</span>
              <div>
                <span>송재희(양천구)</span>
                <span>이승수(수원)</span>
                <span>김소영(양천구)</span>
              </div>
              <div />
            </LastWinner>
          )}
        </ModalMain>
        <Footer>
          <LastWinnerBtn onClick={() => setIsFirst((old) => !old)}>
            지난 당첨자 확인
          </LastWinnerBtn>
          <div>
            <Button onClick={() => setIsModal(false)}>다음에</Button>
            <Button
              backgroundColor="var(--color-mint)"
              color="white"
              onClick={() => setIsApplyModal(true)}
            >
              참여할래 !
            </Button>
          </div>
        </Footer>
      </Layout>
      {isApplyModal && <RequestPromotionRewardModal setIsModal={setIsModal} />}
    </>
  );
}

const Layout = styled(ModalXL)``;

const Temp = styled.span`
  font-size: 11px;
  color: var(--font-h3);
`;

const Overview = styled.div``;

const ImageWraaper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.7;
  height: 88px;
  color: var(--font-h2);
  > div {
    color: var(--font-h2);
    display: flex;
    > span:first-child {
      font-size: 13px;
      display: inline-block;
      width: 88px;
    }
    > span:last-child {
      font-size: 13px;
    }
  }
`;

const VoteNum = styled.span``;

const LastWinnerBtn = styled.button`
  align-self: flex-end;
  font-size: 13px;
  color: var(--color-mint);
`;

const LastWinner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid var(--color-mint);
  height: 88px;
  border-radius: var(--border-radius);

  > div {
    font-weight: 600;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
  }
  > * {
    flex: 1;
  }
  > span {
    color: var(--font-h2);

    font-size: 12px;
    margin-top: 4px;
    margin-left: 10px;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  > div {
    > button {
      font-size: 14px;
      cursor: pointer;
      width: 90px;
      padding: 0 14px;
    }
    > button:first-child {
      margin-right: 6px;
    }
    > button:last-child {
      font-weight: 600;
    }
  }
`;

export default PromotionModal;
