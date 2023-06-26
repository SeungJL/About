import { Button } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/layouts/Modals";
import { ModalMain, ModalXL } from "../../styles/layout/modal";

import ApplyPromotionRewardModal from "../../modals/user/ApplyPromotionRewardModal";

import Image from "next/image";
import { useUserRequestQuery } from "../../hooks/userRequest/queries";

function PromotionModal({
  setIsModal,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [isApplyModal, setIsApplyModal] = useState(false);
  const { data } = useUserRequestQuery();

  const applyCnt = data?.filter(
    (item) =>
      item.title === "홍보" &&
      item?.writer !== "이승주" &&
      item?.writer !== "옌"
  ).length;

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
          <Detail>
            <div>
              <span>상품</span>
              <span>BBQ 황금 올리브 치킨 세트</span>
            </div>
            <div>
              <span>추첨 인원</span>
              <b>3명</b>
            </div>
            <div>
              <span>현재 참여 수</span>
              <span>
                {applyCnt || ""}명<Temp>(중복 포함)</Temp>
              </span>
            </div>
            <div>
              <span>추첨 날짜</span>
              <span>6월 30일</span>
            </div>
          </Detail>
        </ModalMain>
        <Footer>
          <Button onClick={() => setIsModal(false)}>다음에</Button>
          <Button
            backgroundColor="var(--color-mint)"
            color="white"
            onClick={() => setIsApplyModal(true)}
          >
            참여할래 !
          </Button>
        </Footer>
      </Layout>
      {isApplyModal && <ApplyPromotionRewardModal setIsModal={setIsModal} />}
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
  color: var(--font-h2);
  > div {
    color: var(--font-h2);
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
const WinDate = styled.span`
  font-size: 12px;
`;

const Status = styled.div``;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;

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
`;

export default PromotionModal;
