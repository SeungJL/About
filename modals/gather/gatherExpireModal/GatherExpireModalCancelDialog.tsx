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
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  useGatherDeleteMutation,
  useGatherStatusClose,
} from "../../../hooks/gather/mutations";
import { useCompleteToast } from "../../../hooks/ui/CustomToast";
import { DispatchBoolean } from "../../../types/common";
import { GatherExpireModalDialogType } from "./GatherExpireModal";

interface IGatherExpireModalCancelDialog {
  setIsComplete: DispatchBoolean;
  modal: GatherExpireModalDialogType;
  isNoMember: boolean;
}

function GatherExpireModalCancelDialog({
  setIsComplete,
  isNoMember,
  modal,
}: IGatherExpireModalCancelDialog) {
  const completeToast = useCompleteToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const gatherId = +router.query.id;

  const onComplete = () => {
    completeToast("success");
    setIsComplete(true);
    setTimeout(() => {
      router.push(`/gather`);
    }, 1000);
  };

  const { mutate: gatherDelete } = useGatherDeleteMutation(gatherId, {
    onSuccess: onComplete,
  });
  const { mutate: statusClose } = useGatherStatusClose(gatherId, {
    onSuccess: onComplete,
  });

  useEffect(() => {
    if (modal === "cancel") onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal]);

  const onCancel = () => {
    if (isNoMember) gatherDelete();
    else statusClose();
  };

  return (
    <Layout>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent m="auto var(--margin-main)">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              모집을 취소하시겠습니까?
            </AlertDialogHeader>
            <AlertDialogBody>
              {isNoMember ? (
                <span>참여자가 없어 게시글이 완전히 삭제됩니다.</span>
              ) : (
                <span>참여자가 있어 게시글이 취소 상태로 변경됩니다.</span>
              )}
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                colorScheme="mintTheme"
                onClick={onCancel}
                ml="var(--margin-min)"
              >
                모집취소
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Layout>
  );
}

const Layout = styled.div``;

export default GatherExpireModalCancelDialog;
