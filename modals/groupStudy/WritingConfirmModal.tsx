import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import SuccessScreen from "../../components/layout/SuccessScreen";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { GATHER_CONTENT } from "../../constants/keys/queryKeys";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import { useErrorToast } from "../../hooks/custom/CustomToast";
import { useGroupStudyWritingMutation } from "../../hooks/groupStudy/mutations";
import { isGatherEditState } from "../../recoil/checkAtoms";
import { sharedGatherWritingState } from "../../recoil/sharedDataAtoms";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IGroupStudyWriting } from "../../types/page/groupStudy";
import { IModal } from "../../types/reactTypes";

interface IGroupStudyConfirmModal extends IModal {
  groupStudyWriting: IGroupStudyWriting;
}

function GroupStudyConfirmModal({
  setIsModal,
  groupStudyWriting,
}: IGroupStudyConfirmModal) {
  const router = useRouter();
  const errorToast = useErrorToast();

  const [isSuccessScreen, setIsSuccessScreen] = useState(false);
  const [isGatherEdit, setIsGatherEdit] = useRecoilState(isGatherEditState);
  const resetQueryData = useResetQueryData();
  const setGatherContent = useSetRecoilState(sharedGatherWritingState);

  console.log(groupStudyWriting);
  const { mutate } = useGroupStudyWritingMutation("post", {
    onSuccess() {
      resetQueryData([GATHER_CONTENT]);
      setTimeout(() => {
        setGatherContent(null);
      }, 200);
      setIsSuccessScreen(true);
    },
    onError: errorToast,
  });
  const { mutate: updateGather } = useGroupStudyWritingMutation("patch", {
    onSuccess() {
      resetQueryData([GATHER_CONTENT]);
      setTimeout(() => {
        setGatherContent(null);
        // router.push(`/gather/${(groupStudyWriting as IGather).id}`);
      }, 400);
    },
    onError: errorToast,
  });

  const onSubmit = () => {
    mutate({ groupStudy: groupStudyWriting });
    // if (!isGatherEdit) {
    //   mutate({ gather: groupStudyWriting as IGatherWriting });
    // } else {
    //   updateGather({ gather: groupStudyWriting as IGather });
    // }
  };

  return (
    <>
      {groupStudyWriting && (
        <ModalLayout onClose={() => setIsModal(false)} size="md">
          <ModalHeader text={isGatherEdit ? "모임 수정" : "모임 개설"} />
          <ModalBody>
            <ModalSubtitle>개설 내용을 확인해 주세요!</ModalSubtitle>
            <Container>
              <Item>
                <span>제목:</span>
                <span>{groupStudyWriting?.title}</span>
              </Item>
              <Item>
                <span>날짜:</span>
                <span>{groupStudyWriting?.category?.sub}</span>
              </Item>
              <Item>
                <span>주제:</span>
                <span>{groupStudyWriting.guide}</span>
              </Item>
            </Container>
          </ModalBody>
          <ModalFooterOne
            isFull={true}
            text={isGatherEdit ? "모임 수정" : "모임 개설"}
            onClick={onSubmit}
          />
        </ModalLayout>
      )}
      {isSuccessScreen && (
        <SuccessScreen url={`/groupStudy`}>
          <>
            <span>모임 개최 성공</span>
            <div>모임 게시글을 오픈 채팅방에 공유해 주세요!</div>
          </>
        </SuccessScreen>
      )}
    </>
  );
}

const Container = styled.div`
  line-height: 2;
  font-size: 13px;
  color: var(--font-h2);
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  > span:first-child {
    display: inline-block;
    width: 32px;
    font-weight: 600;
    margin-right: var(--margin-md);
  }
  > span:last-child {
    flex: 1;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default GroupStudyConfirmModal;
