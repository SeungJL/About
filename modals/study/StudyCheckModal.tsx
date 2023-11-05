import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import {
  POINT_SYSTEM_Deposit,
  POINT_SYSTEM_PLUS,
} from "../../constants/contentsValue/pointSystem";
import { now } from "../../helpers/dateHelpers";
import { getRandomAlphabet } from "../../helpers/eventHelpers";
import { useCollectionAlphabetMutation } from "../../hooks/collection/mutations";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import { useStudyArrivedMutation } from "../../hooks/study/mutations";
import {
  useAboutPointMutation,
  useDepositMutation,
} from "../../hooks/user/pointSystem/mutation";
import { useUserLocationQuery } from "../../hooks/user/queries";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
import { myStudyState, voteDateState } from "../../recoil/studyAtoms";
import { transferAlphabetState } from "../../recoil/transferDataAtoms";
import { Textarea } from "../../styles/layout/input";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { IUser } from "../../types/user/user";

const LOCATE_GAP = 0.00008;

function StudyCheckModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const failToast = useFailToast();
  const myStudyFixed = useRecoilValue(myStudyState);
  const isFree = myStudyFixed.status === "free";

  const [memo, setMemo] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const setIsRefetchStudySpace = useSetRecoilState(isRefetchStudySpaceState);
  const setTransferAlphabetState = useSetRecoilState(transferAlphabetState);
  const voteDate = useRecoilValue(voteDateState);

  const { data: location } = useUserLocationQuery();

  const { mutate: getAboutPoint } = useAboutPointMutation();
  const { mutate: getAlphabet } = useCollectionAlphabetMutation();

  const { mutate: getDeposit } = useDepositMutation();
  const { data: session } = useSession();

  const { mutate: handleArrived } = useStudyArrivedMutation(
    now().startOf("day"),
    {
      onSuccess() {
        const alphabet = getRandomAlphabet(20);
        if (alphabet) {
          getAlphabet(alphabet);
          setTransferAlphabetState(alphabet);
        }

        completeToast("free", "출석 완료 !");
        if (isChecking && voteDate > dayjs().subtract(1, "day"))
          getAboutPoint(POINT_SYSTEM_PLUS.STUDY_ATTEND);

        if (
          !isFree &&
          dayjs(
            myStudyFixed?.attendences?.find(
              (who) => (who?.user as IUser).uid === session?.uid
            ).time.start
          ).add(1, "hour") < dayjs()
        )
          getDeposit(POINT_SYSTEM_Deposit.STUDY_ATTEND_LATE);
        setIsRefetchStudySpace(true);
      },
      onError: errorToast,
    }
  );

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
      handleArrived(memo || "출석");
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
      <ModalLayout onClose={() => setIsModal(false)} size="md">
        <ModalHeader text="출석체크" />
        <ModalBody>
          <ModalSubtitle>
            도착하셨나요? <br />
            자리나 인상착의를 간단하게 남겨주세요!
          </ModalSubtitle>
          <Textarea
            placeholder="여기에 작성해주세요!"
            onChange={(e) => setMemo(e.target.value)}
            value={memo}
          />
        </ModalBody>
        <ModalFooterOne isFull={true} text="출석" onClick={onCheckClicked} />
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
