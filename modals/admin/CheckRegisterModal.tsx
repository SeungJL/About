import { Button, useDisclosure } from "@chakra-ui/react";
import { SetStateAction, useRef } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/ui/Modal";
import {
  useApproveMutation,
  useDeleteMutation,
} from "../../hooks/user/mutations";
import { ModalLg, ModalMain } from "../../styles/layout/modal";
import { IRegisterForm } from "../../types/user";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useCompleteToast } from "../../components/common/CustomToast";
function CheckRegisterModal({
  setIsModal,
  applicant,
  setIsRefetch,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  applicant: IRegisterForm;
  setIsRefetch: React.Dispatch<SetStateAction<boolean>>;
}) {
  const onComplete = useCompleteToast("가입 거절 완료");
  const { mutate: approve } = useApproveMutation({
    onSuccess() {},
    onError(err) {
      console.error(err);
    },
  });
  const { mutate: deleteForm } = useDeleteMutation({
    onSuccess() {},
  });

  const onClickAgree = () => {
    approve({ uid: applicant?.uid });
    setIsRefetch(true);
    setIsModal(false);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const onClickDelete = () => {
    onClose();
    deleteForm({ uid: applicant?.uid });
    setIsModal(false);
    onComplete();
    setIsRefetch(true);
  };
  return (
    <>
      <Layout>
        <ModalHeaderX title={applicant?.name} setIsModal={setIsModal} />
        <ModalMain>
          <Item>
            <b>성별 </b>
            {applicant?.gender}
          </Item>
          <Item>
            <b>지역 </b>
            {applicant?.location}
          </Item>
          <Item>
            <b>나이 </b>
            {applicant?.birth}
          </Item>
          <Item>
            <b>mbti </b>
            {applicant?.mbti}
          </Item>
          <Item>
            <b>전공 </b>
            {applicant?.majors[0].detail}
          </Item>
          <Item>
            <b>관심사 </b>
            {applicant?.interests.first}
          </Item>
          <Item>
            <b>연락처 </b>
            {applicant?.telephone}
          </Item>
        </ModalMain>
        <Footer>
          <Button width="50%" onClick={onOpen}>
            거절
          </Button>
          <Button width="50%" colorScheme="mintTheme" onClick={onClickAgree}>
            승인
          </Button>
        </Footer>
      </Layout>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent width="340px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              가입 거절
            </AlertDialogHeader>

            <AlertDialogBody>정말로 거절할거야?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button colorScheme="mintTheme" onClick={onClickDelete} ml={3}>
                거절
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const Layout = styled(ModalLg)``;

const Item = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
  > b {
    display: inline-block;
    width: 64px;
  }
`;

const Footer = styled.footer`
  display: flex;
`;

export default CheckRegisterModal;
