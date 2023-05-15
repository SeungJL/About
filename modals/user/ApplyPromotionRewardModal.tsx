import styled from "styled-components";
import { SetStateAction } from "react";
import {
  ModalLg,
  ModalMain,
  ModalMd,
  ModalSubtitle,
  ModalXs,
  ModalXXL,
} from "../../styles/layout/modal";
import { ModalHeaderXLine } from "../../components/ui/Modal";
import { Button, useToast } from "@chakra-ui/react";
import {
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";
import { usePlazaMutation } from "../../hooks/plaza/mutations";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { CopyBtnBig } from "../../components/common/Icon/CopyIcon";
import { PromotionComponent, PROMOTION_TEXT } from "../../constants/private";

function ApplyPromotionRewardModal({
  setIsModal,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const toast = useToast();
  const { data: session } = useSession();
  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: suggestForm } = usePlazaMutation();

  const onComplete = () => {
    getPoint({ value: 15, text: "홍보 리워드" });
    getScore({ value: 15, text: "홍보 리워드" });
    toast({
      title: "정산 완료",
      description: "정상적으로 처리되었습니다.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom",
      variant: "left-accent",
    });
    suggestForm({
      category: "suggestionContents",
      title: "홍보",
      writer: session.user.name,
      content: "",
      date: dayjs().format("YYYY-MM-DD"),
    });
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
        <CopyBtnBig text={PROMOTION_TEXT} />
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

export default ApplyPromotionRewardModal;
