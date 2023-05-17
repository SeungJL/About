import { Button, ModalFooter } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/ui/Modal";
import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalLg,
  ModalMain,
  ModalMd,
} from "../../styles/layout/modal";

import ApplyPromotionRewardModal from "../../modals/user/ApplyPromotionRewardModal";

import Image from "next/image";

function PromotionModal({
  setIsModal,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [isApplyModal, setIsApplyModal] = useState(false);
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
          <WinDate>당첨자 발표: 5월 31일</WinDate>
        </ModalMain>
        <Footer>
          <Button>안할래 :(</Button>
          <Button
            backgroundColor="var(--color-mint)"
            color="white"
            onClick={() => setIsApplyModal(true)}
          >
            참여할래 :)
          </Button>
        </Footer>
      </Layout>
      {isApplyModal && <ApplyPromotionRewardModal setIsModal={setIsModal} />}
    </>
  );
}

const Layout = styled(ModalLg)``;

const Overview = styled.div``;

const ImageWraaper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WinDate = styled.span`
  font-size: 12px;
`;

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
