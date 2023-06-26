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
import { SetStateAction, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/layouts/Modals";
import {
  useGatherDeleteMutation,
  useGatherParticipateMutation,
  useGatherStatusClose,
  useGatherStatusEnd,
  useGatherStatusOpen,
} from "../../hooks/gather/mutations";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { transferGatherDataState } from "../../recoil/transferDataAtoms";

import { ModalMain, ModalXs } from "../../styles/layout/modal";

function ExpireGatherModal({
  setIsModal,
  setIsRefetching,
}: {
  setIsModal?: React.Dispatch<SetStateAction<boolean>>;
  setIsRefetching?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const failToast = useFailToast({ type: "applyGather" });
  const failPreApplyToast = useFailToast({ type: "applyPreGather" });
  const completeToast = useCompleteToast({ type: "applyGather" });
  const [isFirst, setIsFirst] = useState(true);
  const { data } = useUserInfoQuery();
  const gatherData = useRecoilValue(transferGatherDataState);
  console.log(gatherData);
  const isNoMember = gatherData.participants.length === 0;
  const gatherId = gatherData?.id;
  const { mutate: statusOpen } = useGatherStatusOpen(gatherId,{
    onSuccess() {},
  });
  const { mutate: statusClose } = useGatherStatusClose(gatherId);
  const { mutate: statusEnd } = useGatherStatusEnd(gatherId);

  const [password, setPassword] = useState("");
  const { mutate: gatherDelete } = useGatherDeleteMutation(gatherId, {
    onSuccess() {
      console.log("SUC");
    },
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onClickPre = () => {
    setIsFirst(false);
  };

  const { mutate } = useGatherParticipateMutation(gatherId,{
    onSuccess() {},
  });
  const onApply = (type: "expire" | "cancel") => {
    if (type === "expire") {
      onOpen();
      return;
    }
    if (type === "cancel") {
      onOpenCancel();
      return;
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCancel,
    onOpen: onOpenCancel,
    onClose: onCloseCancel,
  } = useDisclosure();
  const completeRef = useRef();
  const cancelRef = useRef();

  const onComplete = () => {
    statusOpen();
    setIsRefetching(true);
    setIsModal(false);
  };

  const onCancel = () => {
    if (isNoMember) gatherDelete();
    else statusClose();
    setTimeout(() => {
      router.push(`/gather`);
    }, 1000);
  };

  return (
    <>
      <Layout>
        <ModalHeaderX title="모집 종료" setIsModal={setIsModal} />
        <ModalMain>
          <Main>
            <Button
              color="white"
              backgroundColor="var(--color-mint)"
              marginBottom="16px"
              size="lg"
              onClick={() => onApply("expire")}
            >
              모집 마감
            </Button>
            <Button onClick={() => onApply("cancel")} size="lg">
              모임 취소
            </Button>
          </Main>
        </ModalMain>
      </Layout>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={completeRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent margin="auto 14px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              모집을 완료하겠습니까?
            </AlertDialogHeader>

            <AlertDialogBody>
              완료를 하면 해당 인원으로 모임이 확정됩니다.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={completeRef} onClick={onClose}>
                취소
              </Button>
              <Button colorScheme="mintTheme" onClick={onComplete} ml={3}>
                모집완료
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpenCancel}
        leastDestructiveRef={cancelRef}
        onClose={onCloseCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogContent margin="auto 14px">
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
              <Button ref={cancelRef} onClick={onCloseCancel}>
                취소
              </Button>
              <Button colorScheme="mintTheme" onClick={onCancel} ml={3}>
                모집취소
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

const Layout = styled(ModalXs)``;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  > div:last-child {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  margin-left: 8px;
  background-color: var(--font-h7);
  padding: 4px 8px;
  border-radius: var(--border-radius);
`;

const Footer = styled.footer``;

const CodeText = styled.span``;

export default ExpireGatherModal;
