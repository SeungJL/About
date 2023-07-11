import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SetStateAction } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/common/modal/ModalComponents";
import { isProfileEditState } from "../../recoil/previousAtoms";
import {
  ModalFooterNav,
  ModalMain,
  ModalMd,
  ModalSubtitle,
} from "../../styles/layout/modal";

interface IProfileModifyPopUp {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}

function ProfileModifyPopUp({ setIsModal }: IProfileModifyPopUp) {
  const router = useRouter();
  const toast = useToast();

  const setIsProfileEdit = useSetRecoilState(isProfileEditState);
  const onClickClosed = () => {
    toast({
      title: "기다릴게요",
      description: "프로필은 마이페이지에서 언제든 수정할 수 있어요!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setIsModal(false);
  };

  const onClickModify = () => {
    setIsProfileEdit(true);
    router.push("/register/location");
  };
  return (
    <>
      <Layout>
        <ModalHeaderXLine title="프로필 수정" setIsModal={setIsModal} />
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
      </Layout>
    </>
  );
}

const Layout = styled(ModalMd)``;

export default ProfileModifyPopUp;
