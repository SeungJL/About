import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { useCompleteToast, useFailToast } from "../../hooks/CustomToast";
import { useStudyArrivedCntQuery } from "../../hooks/study/queries";
import { useUserInfoFieldMutation } from "../../hooks/user/mutations";
import { userAccessUidState } from "../../recoil/userAtoms";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function RequestLevelUpModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const userAccessUid = useRecoilValue(userAccessUidState);

  const { data: studyArrivedCnt, isLoading } = useStudyArrivedCntQuery(
    userAccessUid,
    {
      onSuccess() {
        completeToast("free", "등업이 완료되었습니다.");
      },
    }
  );
  const { mutate: setRole } = useUserInfoFieldMutation("role");

  const onClick = () => {
    if (isLoading) return;
    if (studyArrivedCnt >= 2) setRole({ role: "member" });
    else {
      failToast("free", `현재 스터디에 ${studyArrivedCnt}회 참여하였습니다.`);
      setIsModal(false);
    }
  };
  return (
    <ModalLayout size="sm" onClose={() => setIsModal(false)}>
      <ModalHeader text="등업 신청" />
      <ModalBody>
        <ModalSubtitle>
          동아리원으로 등업을 신청합니다. 최소 2회 이상 스터디에 참여한 인원만
          가능합니다.
        </ModalSubtitle>
      </ModalBody>
      <ModalFooterTwo
        isFull={true}
        leftText="닫기"
        rightText="등업 신청"
        onClickLeft={() => setIsModal(false)}
        onClickRight={onClick}
      />
    </ModalLayout>
  );
}

const Layout = styled.div``;

export default RequestLevelUpModal;
