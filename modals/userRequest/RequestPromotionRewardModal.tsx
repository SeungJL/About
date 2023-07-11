import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { SetStateAction } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../components/common/Icon/CopyIcon";

import { ModalHeaderXLine } from "../../components/common/modal/ModalComponents";
import { POINT_SYSTEM_PLUS } from "../../constants/pointSystem";
import { PromotionComponent, PROMOTION_TEXT } from "../../constants/private";

import {
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";
import { useUserRequestMutation } from "../../hooks/userRequest/mutations";
import { ModalMain, ModalXXL } from "../../styles/layout/modal";

interface IRequestPromotionRewardModal {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}

function RequestPromotionRewardModal({
  setIsModal,
}: IRequestPromotionRewardModal) {
  const toast = useToast();
  const { data: session } = useSession();
  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: requestPromotion } = useUserRequestMutation();

  const onComplete = () => {
    getPoint(POINT_SYSTEM_PLUS.promotionReward.point);
    getScore(POINT_SYSTEM_PLUS.promotionReward.score);
    toast({
      title: "정산 완료",
      description: "정상적으로 처리되었습니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
      variant: "left-accent",
    });
    requestPromotion({
      category: "홍보",
      writer: session?.user.name,
    });
    // suggestForm({
    //   category: "suggestionContents",
    //   title: "홍보",
    //   writer: session.user.name,
    //   content: "",
    //   date: dayjs().format("YYYY-MM-DD"),
    // });
    setIsModal(false);
  };

  return (
    <Layout>
      <ModalHeaderXLine title="리워드 신청" setIsModal={setIsModal} />
      <ModalMain>
        <Overview>
          에브리타임 홍보 게시판에 아래 홍보글을 올려주시면 15 point와 추첨을
          통해 기프티콘을 받을 수 있습니다. 도와주시는 모든 분들 정말
          감사합니다!
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
      <Footer>
        <Button width="50%" onClick={() => setIsModal(false)}>
          다음에
        </Button>
        <Button
          width="50%"
          backgroundColor="var(--color-mint)"
          color="white"
          onClick={onComplete}
        >
          게시완료
        </Button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(ModalXXL)``;

const Overview = styled.div`
  font-weight: 600;
`;

const Title = styled.div`
  margin-top: 12px;
  margin-bottom: 12px;
`;

const CopyWrapper = styled.div`
  margin-top: auto;
`;

const Text = styled.p`
  padding: 8px 4px;
  border-radius: 12px;
  height: 174px;

  overflow-y: auto;
  background-color: var(--font-h7);
`;

const Message = styled.div`
  margin-top: 20px;
  margin-bottom: 4px;
  text-align: center;
  font-weight: 600;
`;

const Footer = styled.footer`
  display: flex;
`;

export default RequestPromotionRewardModal;
