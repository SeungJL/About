import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { dayjsToFormat } from "../../helpers/dateHelpers";
import { useStudyArrivedCntQuery } from "../../hooks/study/queries";
import { useUserInfoFieldMutation } from "../../hooks/user/mutations";
import { userAccessUidState } from "../../recoil/userAtoms";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { IRest } from "../../types/user/user";

interface IRequestRestCancelModal extends IModal {
  rest: IRest;
}

function RequestRestCancelModal({ setIsModal, rest }: IRequestRestCancelModal) {
  const userAccessUid = useRecoilValue(userAccessUidState);

  const { data: studyArrivedCnt } = useStudyArrivedCntQuery(userAccessUid, {});
  const { mutate: setRole } = useUserInfoFieldMutation("role");

  const onClick = () => {
    if (studyArrivedCnt >= 2) setRole({ role: "member" });
    else setRole({ role: "human" });
  };

  return (
    <ModalLayout size="md" onClose={() => setIsModal(false)}>
      <ModalHeader text="휴식 해제" />
      <ModalBody>
        <ModalSubtitle>휴식 상태를 해제하시겠어요?</ModalSubtitle>
        <Container>
          <Item>
            <span>휴식 타입:</span>
            <span>{rest?.type}휴식</span>
          </Item>
          <Item>
            <span>휴식 기간:</span>
            <span>
              {dayjsToFormat(dayjs(rest?.startDate), "MM월 D일")} ~{" "}
              {dayjsToFormat(dayjs(rest?.endDate), "MM월 D일")}
            </span>
          </Item>
          <Item>
            <span>신청 횟수:</span>
            <span>{rest?.restCnt}회</span>
          </Item>
          <Item>
            <span>누적 날짜:</span>
            <span>{rest?.cumulativeSum}일</span>
          </Item>
        </Container>
      </ModalBody>
      <ModalFooterTwo
        isFull={true}
        leftText="닫기"
        rightText="해제"
        onClickLeft={() => {
          setIsModal(false);
        }}
        onClickRight={onClick}
      />
    </ModalLayout>
  );
}

const Container = styled.div`
  line-height: 1.7;
`;

const Item = styled.div`
  font-size: 12px;

  > span:first-child {
    font-weight: 600;
  }
  > span:last-child {
    margin-left: var(--margin-md);
  }
`;

export default RequestRestCancelModal;
