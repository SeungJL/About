import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { IModal } from "../types/reactTypes";
export interface IAlertModalOptions {
  title: string;
  subTitle: string;
  func: () => void;
}

interface IAlertModal extends IModal {
  alertModalOptions: IAlertModalOptions;
  colorType?: "mintTheme" | "redTheme";
}

export default function AlertModal({
  setIsModal,
  alertModalOptions: { title, subTitle, func },
  colorType = "mintTheme",
}: IAlertModal) {
  const cancelRef = React.useRef();

  const handleProcess = () => {
    func();
    setIsModal(false);
  };

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={() => setIsModal(false)}
        isOpen={true}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent mx="16px" zIndex={2000}>
          <AlertDialogHeader p="16px" fontSize="18px">
            {title}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody p="0 16px">{subTitle}</AlertDialogBody>
          <AlertDialogFooter p="16px">
            <Button onClick={() => setIsModal(false)}>아니요</Button>
            <Button onClick={handleProcess} colorScheme={colorType} ml="12px">
              취소합니다
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
