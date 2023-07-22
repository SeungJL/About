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
import { useRef } from "react";
import styled from "styled-components";
import { useCompleteToast, useErrorToast } from "../../../hooks/CustomToast";
import {
  useUserApproveMutation,
  useUserDeleteMutation,
} from "../../../hooks/user/mutations";
import { IModal, IRefetch } from "../../../types/reactTypes";

interface ICheckRegisterModalFooter extends IModal, IRefetch {
  uid: string;
}

function CheckRegisterModalFooter({
  setIsModal,
  setIsRefetch,
  uid,
}: ICheckRegisterModalFooter) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const { mutate: approve } = useUserApproveMutation({
    onSuccess() {
      completeToast("free", "가입이 승인되었습니다.");
    },
    onError: errorToast,
  });

  const { mutate: deleteForm } = useUserDeleteMutation({
    onSuccess() {
      completeToast("free", "가입이 거절되었습니다.");
    },
    onError: errorToast,
  });

  const onClickAgree = () => {
    approve(uid);
    setIsRefetch(true);
    setIsModal(false);
  };

  const onClickDelete = () => {
    onClose();
    deleteForm(uid);
    setIsModal(false);
    setIsRefetch(true);
  };

  return (
    <>
      <Layout>
        <Button width="50%" onClick={onOpen}>
          거절
        </Button>
        <Button width="50%" colorScheme="mintTheme" onClick={onClickAgree}>
          승인
        </Button>
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

const Layout = styled.footer`
  display: flex;
`;

export default CheckRegisterModalFooter;
