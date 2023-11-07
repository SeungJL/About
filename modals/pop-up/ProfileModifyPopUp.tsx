import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { useCompleteToast } from "../../hooks/custom/CustomToast";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function ProfileModifyPopUp({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const router = useRouter();

  const setIsProfileEdit = useSetRecoilState(isProfileEditState);

  const onClickClosed = () => {
    completeToast("free", "프로필은 마이페이지에서 언제든 수정할 수 있어요!");
    setIsModal(false);
  };

  const onClickModify = () => {
    setIsProfileEdit(true);
    router.push("/register/location");
  };

  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="md">
        <ModalHeader text="프로필 수정" />
        <ModalBody>
          <ModalSubtitle>입력할 수 있는 프로필 정보가 있어요!</ModalSubtitle>
          <div>
            나이, 전공, 관심사, mbti 등 다른 친구를 만날 수 있는 컨텐츠가 있어요
            🥰 잠깐 입력하고 가시면 어떨까요?
          </div>
        </ModalBody>
        <ModalFooterTwo
          leftText="닫기"
          rightText="프로필 수정"
          onClickLeft={onClickClosed}
          onClickRight={onClickModify}
          isFull={true}
        />
      </ModalLayout>
    </>
  );
}

export default ProfileModifyPopUp;
