import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { SetStateAction, useRef } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../components/common/Icon/CopyIcon";
import { ModalHeaderX } from "../../components/layouts/Modals";
import { useCompleteToast } from "../../hooks/ui/CustomToast";
import {
  useUserApproveMutation,
  useUserDeleteMutation,
} from "../../hooks/user/mutations";
import { ModalLg, ModalMain } from "../../styles/layout/modal";
import { IRegisterForm } from "../../types/user";

interface ICheckRegisterModal {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  applicant: IRegisterForm;
  setIsRefetch: React.Dispatch<SetStateAction<boolean>>;
}

function CheckRegisterModal({
  setIsModal,
  applicant,
  setIsRefetch,
}: ICheckRegisterModal) {
  const completeToast = useCompleteToast();
  const cancelRef = useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: approve } = useUserApproveMutation();
  const { mutate: deleteForm } = useUserDeleteMutation();

  const onClickAgree = () => {
    approve(applicant?.uid);
    setIsRefetch(true);
    setIsModal(false);
  };

  const onClickDelete = () => {
    onClose();
    deleteForm(applicant?.uid);
    setIsModal(false);
    completeToast("success");
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
            {applicant?.majors[0]?.detail}
          </Item>
          <Item>
            <b>관심사 </b>
            {applicant?.interests.first}
          </Item>
          <Item>
            <b>연락처 </b>
            {applicant?.telephone}
            <IconWrapper>
              <CopyBtn text={applicant?.telephone} />
            </IconWrapper>
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

const IconWrapper = styled.span`
  margin-left: 8px;
`;

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
