import dayjs from "dayjs";
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
import { GATHER_CONTENT } from "../../constants/keys/queryKeys";
import { useResetQueryData } from "../../hooks/CustomHooks";
import { useErrorToast } from "../../hooks/CustomToast";
import { useGatherWritingMutation } from "../../hooks/gather/mutations";
import { sharedGatherWritingState } from "../../recoil/sharedDataAtoms";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IGatherWriting } from "../../types/page/gather";
import { IModal } from "../../types/reactTypes";

interface IGatherWritingConfirmModal extends IModal {
  gatherData: IGatherWriting;
}

function GatherWritingConfirmModal({
  setIsModal,
  gatherData,
}: IGatherWritingConfirmModal) {
  const errorToast = useErrorToast();

  const [isSuccessScreen, setIsSuccessScreen] = useState(false);

  const resetQueryData = useResetQueryData();
  const setGatherContent = useSetRecoilState(sharedGatherWritingState);

  const { mutate } = useGatherWritingMutation("post", {
    onSuccess() {
      resetQueryData([GATHER_CONTENT]);
      setTimeout(() => {
        setGatherContent(null);
      }, 200);
      setIsSuccessScreen(true);
    },
    onError: errorToast,
  });

  const onSubmit = () => {
    mutate({ gather: gatherData });
  };

  return (
    <>
      {gatherData && (
        <ModalLayout onClose={() => setIsModal(false)} size="md">
          <ModalHeader text="모임 개설" />
          <ModalBody>
            <ModalSubtitle>개설 내용을 확인해 주세요!</ModalSubtitle>
            <Container>
              <Item>
                <span>제목:</span>
                <span>{gatherData?.title}</span>
              </Item>
              <Item>
                <span>날짜:</span>
                <span>{dayjs(gatherData.date).format("M월 D일, H시 m분")}</span>
              </Item>
              <Item>
                <span>주제:</span>
                <span>{gatherData.type.subtitle || "기타"}</span>
              </Item>
            </Container>
          </ModalBody>
          <ModalFooterOne isFull={true} text="모임 개설" onClick={onSubmit} />
        </ModalLayout>
      )}
      {isSuccessScreen && (
        <SuccessScreen url={`/gather`}>
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

export default GatherWritingConfirmModal;
