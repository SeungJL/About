import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { PopUpLayout } from "../../components/common/modal/Modals";
import { useCompleteToast } from "../../hooks/CustomToast";
import { isProfileEditState } from "../../recoil/previousAtoms";
import {
  ModalFooterNav,
  ModalMain,
  ModalSubtitle,
} from "../../styles/layout/modal";
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
      <PopUpLayout size="md">
        <ModalHeaderX title="프로필 수정" setIsModal={setIsModal} />
        <ModalMain>
          <ModalSubtitle>
            입력할 수 있는 프로필 정보가 있어요! (+5점)
          </ModalSubtitle>
          <div>
            나이, 전공, 관심사, mbti 등을 통해 다른 친구를 만날 수 있는 컨텐츠를
            만들고 있어요! 🥰 금방 작성하는데 잠깐 입력하고 가시면 어떨까요?
          </div>
        </ModalMain>
        <ModalFooterNav>
          <button onClick={onClickClosed}>닫기</button>
          <button onClick={onClickModify}>프로필 수정</button>
        </ModalFooterNav>
      </PopUpLayout>
    </>
  );
}

export default ProfileModifyPopUp;
