import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  POINT_SYSTEM_MINUS,
  POINT_SYSTEM_PLUS,
} from "../../constants/pointSystem";
import { useStudyArrivedMutation } from "../../hooks/study/mutations";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import { useFailToast } from "../../hooks/ui/CustomToast";
import {
  useDepositMutation,
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";
import { useUserLocationQuery } from "../../hooks/user/queries";
import { getToday } from "../../libs/utils/dateUtils";
import { mySpaceFixedState, voteDateState } from "../../recoil/studyAtoms";
import { InputSm } from "../../styles/layout/input";
import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
  ModalMd,
} from "../../styles/layout/modal";
import { IModal } from "../../types/common";
import { IUser } from "../../types/user";

const LOCATE_GAP = 0.00008;

function StudyCheckModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);

  const [memo, setMemo] = useState("");
  const [isChecking, setIsChecking] = useState(false);

  const toast = useToast();
  const voteDate = useRecoilValue(voteDateState);

  const { data: location } = useUserLocationQuery();
  const { data } = useStudyVoteQuery(voteDate, location);

  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: getDeposit } = useDepositMutation();
  const { data: session } = useSession();

  const { mutate: handleArrived } = useStudyArrivedMutation(getToday(), {
    onSuccess: (data) => {
      if (
        dayjs(
          mySpaceFixed?.attendences?.find(
            (who) => (who?.user as IUser).uid === session?.uid
          ).time.start
        ).add(1, "hour") < dayjs()
      ) {
        getDeposit(POINT_SYSTEM_MINUS.attendCheck.deposit);
      } else if (isChecking && voteDate > dayjs().subtract(1, "day")) {
        getScore(POINT_SYSTEM_PLUS.attendCheck.score);
        getPoint(POINT_SYSTEM_PLUS.attendCheck.point);
      }
    },

    onError: (err) => {
      console.error(err);
      failToast("error");
    },
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
    <Container>
      <Layout>
        <ModalHeaderLine>출석체크</ModalHeaderLine>
        <ModalMain>
          <Content>
            도착하셨나요? <br />
            자리나 인상착의를 간단하게 남겨주세요!
          </Content>
          <Form id="AttendCheckForm">
            <InputSm
              placeholder="여기에 작성해주세요!"
              onChange={(e) => setMemo(e.target.value)}
            />
          </Form>
        </ModalMain>

        <ModalFooterNav>
          <button type="button" onClick={() => setIsModal(false)}>
            취소
          </button>
          <button type="button" form="AttendCheckForm" onClick={onCheckClicked}>
            출석
          </button>
        </ModalFooterNav>
      </Layout>
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
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Layout = styled(ModalMd)`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-bottom: var(--margin-sub);
`;

const Form = styled.form`
  height: 100%;
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
