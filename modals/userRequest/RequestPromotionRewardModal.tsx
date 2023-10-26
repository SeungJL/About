import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../components/common/Icon/CopyIcon";

import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import {
  PromotionComponent,
  PROMOTION_TEXT,
} from "../../constants/contents/Private";
import { POINT_SYSTEM_PLUS } from "../../constants/contentsValue/pointSystem";
import { useCompleteToast, useErrorToast } from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";

import { usePointMutation } from "../../hooks/user/pointSystem/mutation";
import { IModal } from "../../types/reactTypes";

function RequestPromotionRewardModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const [isFirst, setIsFirst] = useState(true);

  const { mutate: getPoint } = usePointMutation();

  const { mutate: sendPromotionReward } = useUserRequestMutation({
    onSuccess: () => completeToast("free", "이벤트 응모 및 포인트 지급 완료!"),
    onError: errorToast,
  });

  const onSubmit = () => {
    getPoint(POINT_SYSTEM_PLUS.PROMOTION);
    sendPromotionReward({
      category: "홍보",
      writer: session.user.name,
    });
    setIsModal(false);
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="xxl">
      <ModalHeader text="홍보 리워드 신청" />
      <ModalBody>
        <Overview>
          에브리타임 홍보 게시판에 아래 홍보글을 올려주시면 ABOUT 포인트와
          추첨을 통해 꽤 높은 확률로 상품을 보내드립니다! 도와주시는 모든 분들
          감사합니다!
        </Overview>
        {isFirst ? (
          <Container>
            <PromotionComponent />
            <CopyWrapper>
              <CopyBtn size="lg" text={PROMOTION_TEXT} />
            </CopyWrapper>
          </Container>
        ) : (
          <ImageContainer>
            <Image
              src="https://user-images.githubusercontent.com/84257439/235453825-026ca653-d356-485a-a916-19c21352e10a.png"
              alt="promotionImage"
              width={165}
              height={166}
            />
            <ImageText>이미지를 꾹 눌러서 저장해주세요!</ImageText>
          </ImageContainer>
        )}
        <Button
          mt="var(--margin-min)"
          onClick={() => setIsFirst((old) => !old)}
        >
          {isFirst ? "이미지 다운로드" : "돌아가기"}
        </Button>
        <Message>
          제목은 &quot;카공 및 친목 동아리 ABOUT&quot; 로 적어주시면 되고,
          이미지는 굳이 안넣어주셔도 돼요! 여러번 지원해도 너무 환영하니 자주
          신청해주세요 🙂
        </Message>
      </ModalBody>
      <ModalFooterTwo
        leftText="확인"
        rightText="게시완료"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onSubmit}
      />
    </ModalLayout>
  );
}

const Overview = styled.div`
  margin-bottom: var(--margin-sub);
  font-weight: 600;
`;

const ImageText = styled.span`
  font-size: 12px;
  color: var(--font-h1);
  margin-bottom: auto;
`;
const Container = styled.div``;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CopyWrapper = styled.div`
  margin-top: var(--margin-sub);
`;

const Message = styled.div`
  margin-top: var(--margin-main);
  text-align: center;
  font-weight: 600;
`;

export default RequestPromotionRewardModal;
