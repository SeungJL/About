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
import { useSession } from "next-auth/react";
import { useRef } from "react";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import {
  useCompleteToast,
  useErrorToast,
} from "../../hooks/custom/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/sub/request/mutations";

import { IModal } from "../../types/reactTypes";
import { IUserRequest } from "../../types/user/userRequest";

function ManagerPopUp({ setIsModal }: IModal) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalLayout size="lg" onClose={() => setIsModal(false)}>
        <ModalHeader text="운영진 공고" />
        <ModalBody>
          <Subtitile>모집 조건</Subtitile>
          <Ol>
            <li>22 ~ 24세</li>
            <li>일주일 2회 스터디 참여 가능하신 분</li>
            <li>사람 만나는 거 좋아하고 외향적이신 분</li>
            <li>오프라인 모임도 종종 참여할 수 있는 분</li>
          </Ol>
          <Subtitile>혜택</Subtitile>
          <Ul>
            <li>매달 커피 값으로 2만원씩 지원</li>
            <li>원하는 스터디 장소 있으면 장소 개설해드려요</li>
            <li>기타 특전</li>
          </Ul>
        </ModalBody>
        <ModalFooterTwo
          leftText="닫기"
          rightText="지원하기"
          onClickLeft={() => setIsModal(false)}
          onClickRight={() => onOpen()}
        />
      </ModalLayout>
      <Dialog isOpen={isOpen} onClose={onClose} setIsModal={setIsModal} />
    </>
  );
}

interface IDialog extends IModal {
  isOpen: boolean;
  onClose: () => void;
}

const Dialog = ({ isOpen, onClose, setIsModal }: IDialog) => {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const { mutate } = useUserRequestMutation({
    onSuccess() {
      completeToast("free", "지원이 완료되었습니다.");
      setIsModal(false);
    },
    onError: errorToast,
  });
  const handleSubmit = () => {
    const data: IUserRequest = {
      category: "건의",
      writer: session?.user.name,
      title: "운영진 지원",
      content: session?.user?.uid as string,
    };
    mutate(data);
  };

  const completeRef = useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={completeRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent m="auto var(--margin-main)">
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            운영진에 지원하시겠어요?
          </AlertDialogHeader>
          <AlertDialogBody>신청해주시면 따로 연락드릴게요!</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={completeRef} onClick={onClose}>
              취소
            </Button>
            <Button
              colorScheme="mintTheme"
              onClick={handleSubmit}
              ml="var(--margin-min)"
            >
              신청
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

const Subtitile = styled.div`
  color: var(--font-h2);
  font-size: 13px;
  font-weight: 600;
  margin-bottom: var(--margin-min);
`;

const Ol = styled.ol`
  color: var(--font-h2);
  font-size: 12px;
  margin-left: var(--margin-main);
  margin-bottom: var(--margin-md);
`;

const Ul = styled.ul`
  font-size: 12px;
  color: var(--font-h2);
  margin-left: var(--margin-main);
`;

export default ManagerPopUp;
