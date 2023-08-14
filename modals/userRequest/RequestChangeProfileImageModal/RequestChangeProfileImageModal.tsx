import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import {
  useUserAvatarMutation,
  useUserUpdateProfileImageMutation,
} from "../../../hooks/user/mutations";
import { isRefetchUserInfoState } from "../../../recoil/refetchingAtoms";
import { isGuestState } from "../../../recoil/userAtoms";
import { ModalMain } from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import RequestChagneProfileImageModalBadge from "./RequestChagneProfileImageModalBadge";
import RequestChangeProfileImageModalAvatar from "./RequestChangeProfileImageModalAvatar";

function RequestChangeProfileImageModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();

  const isGuest = useRecoilValue(isGuestState);
  const setIsRefetchUserInfo = useSetRecoilState(isRefetchUserInfoState);

  const [pageNum, setPageNum] = useState(0);

  const { mutate: updateProfile } = useUserUpdateProfileImageMutation();

  const { mutate: setUserAvatar } = useUserAvatarMutation({
    onSuccess() {
      completeToast("success");
      setIsRefetchUserInfo(true);
    },
    onError: errorToast,
  });

  const onClickKakao = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    updateProfile();
    setUserAvatar({ type: null, bg: null });
    setIsModal(false);
  };

  return (
    <>
      {pageNum === 0 ? (
        <ModalLayout size="lg" height={260}>
          <ModalHeaderX title="프로필 이미지 변경" setIsModal={setIsModal} />
          <Container>
            <Button
              colorScheme="mintTheme"
              size="lg"
              onClick={() => setPageNum(1)}
            >
              아바타 선택
            </Button>
            <Button size="lg" onClick={onClickKakao}>
              카카오 프로필로 변경 / 업데이트
            </Button>
            <Button size="lg" onClick={() => setPageNum(2)}>
              이벤트 배지로 변경
            </Button>
          </Container>
        </ModalLayout>
      ) : pageNum === 1 ? (
        <RequestChangeProfileImageModalAvatar
          setIsModal={setIsModal}
          setUserAvatar={setUserAvatar}
        />
      ) : (
        <RequestChagneProfileImageModalBadge setIsModal={setIsModal} />
      )}
    </>
  );
}

const Container = styled(ModalMain)`
  margin-top: var(--margin-main);
  margin-bottom: var(--margin-md);
  justify-content: space-around;
`;

export default RequestChangeProfileImageModal;
