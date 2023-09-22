import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modal/ModalComponents";
import { ModalLayout } from "../../components/modal/Modals";
import {
  POINT_SYSTEM_MINUS,
  POINT_SYSTEM_PLUS,
} from "../../constants/pointSystem";
import { getToday } from "../../helpers/dateHelpers";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import { useStudyArrivedMutation } from "../../hooks/study/mutations";
import {
  useDepositMutation,
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";
import { useUserLocationQuery } from "../../hooks/user/queries";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
import { myStudyFixedState, voteDateState } from "../../recoil/studyAtoms";
import { InputSm } from "../../styles/layout/input";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { IUser } from "../../types/user/user";

const LOCATE_GAP = 0.00008;

function StudyCheckModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const failToast = useFailToast();
  const myStudyFixed = useRecoilValue(myStudyFixedState);
  const isFree = myStudyFixed.status === "free";

  const [memo, setMemo] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const setIsRefetchStudySpace = useSetRecoilState(isRefetchStudySpaceState);
  const voteDate = useRecoilValue(voteDateState);

  const { data: location } = useUserLocationQuery();

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: getDeposit } = useDepositMutation();
  const { data: session } = useSession();

  const { mutate: handleArrived } = useStudyArrivedMutation(getToday(), {
    onSuccess() {
      completeToast("free", "출석 완료 !");
      if (isChecking && voteDate > dayjs().subtract(1, "day")) {
        getScore(POINT_SYSTEM_PLUS.attendCheck.score);
        getPoint(POINT_SYSTEM_PLUS.attendCheck.point);
      }
      if (
        !isFree &&
        dayjs(
          myStudyFixed?.attendences?.find(
            (who) => (who?.user as IUser).uid === session?.uid
          ).time.start
        ).add(1, "hour") < dayjs()
      )
        getDeposit(POINT_SYSTEM_MINUS.attendCheck.deposit);
      setIsRefetchStudySpace(true);
    },
    onError: errorToast,
  });

  const onCheckClicked = async () => {
    await setIsChecking(true);
    await checkArrived();
  };
  const checkArrived = () => {
    // navigator.geolocation.getCurrentPosition((data) => {
    //   const coords = data?.coords;
    if (
      // (coords.latitude > myPlace?.latitude - LOCATE_GAP ||
      //   coords.latitude < myPlace?.latitude + LOCATE_GAP) &&
      // (coords.longitude > myPlace?.longitude - LOCATE_GAP ||
      //   coords.longitude < myPlace?.longitude + LOCATE_GAP)
      true
    ) {
      handleArrived(memo);
      setTimeout(() => {
        setIsChecking(false);
        setIsModal(false);
      }, 2000);
    } else {
      failToast("free", "스터디 장소가 아닌 것으로 확인됩니다.");
    }
  };

  return (
    <>
      <ModalLayout size="md">
        <ModalHeaderX title="출석체크" setIsModal={setIsModal} />
        <ModalMain>
          <Content>
            도착하셨나요? <br />
            자리나 인상착의를 간단하게 남겨주세요!
          </Content>
          <InputSm
            placeholder="여기에 작성해주세요!"
            onChange={(e) => setMemo(e.target.value)}
            value={memo}
          />
        </ModalMain>

        <ModalFooterNav>
          <button type="button" onClick={() => setIsModal(false)}>
            취소
          </button>
          <button type="button" form="AttendCheckForm" onClick={onCheckClicked}>
            출석
          </button>
        </ModalFooterNav>
      </ModalLayout>
      {isChecking && (
        <Loading>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
          <div />
          <span>{session?.user.name}님의 현재 위치를 확인중입니다</span>
        </Loading>
      )}
    </>
  );
}

const Content = styled.div`
  margin-bottom: var(--margin-sub);
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 600;
  width: 250px;
  height: 250px;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  > div {
    height: 10px;
  }
`;

export default StudyCheckModal;
