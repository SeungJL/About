import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/ui/CustomToast";
import {
  useUserAvatarMutation,
  useUserUpdateProfileMutation,
} from "../../../hooks/user/mutations";
import { isRefetchUserInfoState } from "../../../recoil/refetchingAtoms";
import { ModalMain } from "../../../styles/layout/modal";
import { IModal } from "../../../types/common";
import RequestChangeProfileImageModalAvatar from "./RequestChangeProfileImageModalAvatar";

function RequestChangeProfileImageModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();

  const setIsRefetchUserInfo = useSetRecoilState(isRefetchUserInfoState);

  const [isFirst, setIsFirst] = useState(true);

  const { mutate: updateProfile } = useUserUpdateProfileMutation();

  const { mutate: setUserAvatar } = useUserAvatarMutation({
    onSuccess() {
      completeToast("success");
      setIsRefetchUserInfo(true);
    },
    onError: errorToast,
  });

  const onClickKakao = () => {
    updateProfile();
    setUserAvatar({ type: null, bg: null });
    setIsModal(false);
  };

  return (
    <>
      {isFirst ? (
        <ModalLayout size="md">
          <ModalHeaderX title="프로필 이미지 변경" setIsModal={setIsModal} />
          <Container>
            <Button
              colorScheme="mintTheme"
              size="lg"
              onClick={() => setIsFirst(false)}
            >
              아바타 선택
            </Button>
            <Button size="lg" onClick={onClickKakao}>
              카카오 프로필로 변경 / 업데이트
            </Button>
          </Container>
        </ModalLayout>
      ) : (
        <RequestChangeProfileImageModalAvatar
          setIsModal={setIsModal}
          setUserAvatar={setUserAvatar}
        />
      )}
    </>
  );
}

const Container = styled(ModalMain)`
  justify-content: space-around;
  margin: var(--margin-max) 0;
`;

export default RequestChangeProfileImageModal;