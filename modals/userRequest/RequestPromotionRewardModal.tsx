import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import { CopyBtn } from "../../components/common/Icon/CopyIcon";

import {
  ModalFooterTwo,
  ModalHeaderX,
} from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import { POINT_SYSTEM_PLUS } from "../../constants/pointSystem";
import { PromotionComponent, PROMOTION_TEXT } from "../../constants/private";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";

import {
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";
import { useUserRequestMutation } from "../../hooks/userRequest/mutations";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/common";

function RequestPromotionRewardModal({ setIsModal }: IModal) {
  const toast = useToast();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const { data: session } = useSession();
  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: sendPromotionReward } = useUserRequestMutation();

  const onSubmit = () => {
    getPoint(POINT_SYSTEM_PLUS.promotionReward.point);
    getScore(POINT_SYSTEM_PLUS.promotionReward.score);
    sendPromotionReward({
      category: "홍보",
      writer: session.user.name,
    });
    setIsModal(false);
  };

  return (
    <ModalLayout size="xxl">
      <ModalHeaderX title="홍보 리워드 신청" setIsModal={setIsModal} />
      <ModalMain>
        <Overview>
          에브리타임 홍보 게시판에 아래 홍보글을 올려주시면 15 score / 15
          point와 추첨을 통해 기프티콘을 받을 수 있습니다. 도와주시는 모든 분들
          정말 감사합니다!
        </Overview>
        <Title>제목: 카공 및 친목 동아리 About</Title>
        <PromotionComponent />
        <CopyWrapper>
          <CopyBtn size="lg" text={PROMOTION_TEXT} />
        </CopyWrapper>
        <Message>
          게시완료 눌러주시면 자동으로 적립됩니다!
          <br />
          여러번 지원해도 되니 또 신청해주세요 :)
        </Message>
      </ModalMain>
      <ModalFooterTwo
        right="게시완료"
        setIsModal={setIsModal}
        onSubmit={onSubmit}
      />
    </ModalLayout>
  );
}

const Overview = styled.div`
  font-weight: 600;
`;

const Title = styled.div`
  margin: var(--margin-sub) 0;
`;

const CopyWrapper = styled.div`
  margin-top: auto;
`;

const Message = styled.div`
  margin-top: var(--margin-main);
  text-align: center;
  font-weight: 600;
`;

export default RequestPromotionRewardModal;
