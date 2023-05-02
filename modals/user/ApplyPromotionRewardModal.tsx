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

function ApplyPromotionRewardModal({
  setIsModal,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Layout>
      <ModalHeaderXLine title="리워드 신청" setIsModal={setIsModal} />
      <ModalMain>
        <span>
          에브리타임의 홍보 게시판에 동아리 홍보글을 올려주시면 5 point를 받을
          수 있습니다! 뿐만 아니라 추첨을 통해 기프티콘도 드리고 있어요! 다들
          많이 도와주세요 ㅜㅜ
        </span>
      </ModalMain>
    </Layout>
  );
}

const Layout = styled(ModalXXL)``;

export default ApplyPromotionRewardModal;
