import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import SuccessScreen from "../../components/layout/SuccessScreen";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { GROUP_STUDY_ALL } from "../../constants/keys/queryKeys";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
} from "../../hooks/custom/CustomToast";
import { useGroupStudyWritingMutation } from "../../hooks/groupStudy/mutations";
import { transferGroupStudyDataState } from "../../recoil/transferDataAtoms";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IGroupStudy, IGroupStudyWriting } from "../../types/page/groupStudy";
import { DispatchType, IModal } from "../../types/reactTypes";

interface IGroupStudyConfirmModal extends IModal {
  groupStudyWriting: IGroupStudyWriting;
  setGroupStudyWriting: DispatchType<IGroupStudyWriting>;
}

function GroupStudyConfirmModal({
  setIsModal,
  setGroupStudyWriting,
  groupStudyWriting,
}: IGroupStudyConfirmModal) {
  const router = useRouter();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();

  const [isSuccessScreen, setIsSuccessScreen] = useState(false);
  const setGroupStudy = useSetRecoilState(transferGroupStudyDataState);
  const resetQueryData = useResetQueryData();

  const { mutate } = useGroupStudyWritingMutation("post", {
    onSuccess() {
      resetQueryData([GROUP_STUDY_ALL]);
      setGroupStudy(null);
      setGroupStudyWriting(null);
      setIsSuccessScreen(true);
    },
    onError: errorToast,
  });
  const { mutate: updateGroupStudy } = useGroupStudyWritingMutation("patch", {
    onSuccess() {
      setGroupStudyWriting(null);
      setGroupStudy(null);
      completeToast("free", "수정되었습니다.");
      resetQueryData([GROUP_STUDY_ALL], () => {
        router.push(`/groupStudy/${groupStudyWriting.id}`);
      });
    },
    onError: errorToast,
  });

  const onSubmit = () => {
    if (groupStudyWriting?.id) {
      updateGroupStudy({ groupStudy: groupStudyWriting as IGroupStudy });
    } else mutate({ groupStudy: groupStudyWriting });
  };

  return (
    <>
      {groupStudyWriting && (
        <ModalLayout onClose={() => setIsModal(false)} size="lg">
          <ModalHeader
            text={groupStudyWriting.id ? "내용 수정" : "소모임 개설"}
          />
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
            text={groupStudyWriting.id ? "내용 수정" : "소모임 개설"}
            onClick={onSubmit}
          />
        </ModalLayout>
      )}
      {isSuccessScreen && (
        <SuccessScreen url={`/groupStudy`}>
          <>
            <span>소모임 개설 성공</span>
            <div>소모임 오픈 소식을 단톡방에 공유해 주세요!</div>
          </>
        </SuccessScreen>
      )}
    </>
  );
}

const Container = styled.div`
  line-height: 2;
  font-size: 13px;
  color: var(--gray-2);
`;

const Item = styled.div`
  width: 100%;
  display: flex;
  > span:first-child {
    display: inline-block;
    width: 32px;
    font-weight: 600;
    margin-right: var(--gap-2);
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
