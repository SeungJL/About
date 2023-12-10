import { useSession } from "next-auth/react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { useCompleteToast, useFailToast } from "../../hooks/custom/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/sub/request/mutations";
import { userInfoState } from "../../recoil/userAtoms";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function RequestBirthModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const { data: session } = useSession();

  const userInfo = useRecoilValue(userInfoState);
  const role = userInfo?.role;

  const { mutate } = useUserRequestMutation({
    onSuccess() {
      completeToast("success");
      setIsModal(false);
    },
  });

  const onClick = () => {
    if (role === "human") {
      failToast("free", "정식 멤버만 신청 가능합니다.");
      return;
    }
    mutate({
      writer: session?.user.name,
      category: "건의",
      title: "생일 비공개 신청",
      content: session?.uid as string,
    });
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="생일 공개 설정" />
      <ModalBody>
        <ModalSubtitle>
          기본 설정으로 동아리원 생일에는 축하를 위해 멤버게시판에 프로필이
          표시됩니다.
        </ModalSubtitle>
      </ModalBody>
      <ModalFooterTwo
        leftText="공개"
        rightText="비공개"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onClick}
        isFull={true}
      />
    </ModalLayout>
  );
}

const Layout = styled.div``;

export default RequestBirthModal;
