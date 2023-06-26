import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

import {
  POINT_SYSTEM_MINUS,
  POINT_SYSTEM_PLUS,
} from "../../constants/pointSystem";
import {
  useDepositMutation,
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";

import { useStudyArrivedMutation } from "../../hooks/study/mutations";
import { useStudyVoteQuery } from "../../hooks/study/queries";
import { VOTE_GET } from "../../libs/queryKeys";
import { getToday } from "../../libs/utils/dateUtils";
import { mySpaceFixedState, voteDateState } from "../../recoil/studyAtoms";
import { userLocationState } from "../../recoil/userAtoms";
import { InputSm } from "../../styles/layout/input";

import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
  ModalMd,
} from "../../styles/layout/modal";
import { IUser } from "../../types/user";

const LOCATE_GAP = 0.00008;

function AttendCheckModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const location = useRecoilValue(userLocationState);
  const [memo, setMemo] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const voteDate = useRecoilValue(voteDateState);

  const { data } = useStudyVoteQuery(voteDate, location);
  const myPlace = data?.participations.find(
    (par) => par === mySpaceFixed
  )?.place;
  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { mutate: getDeposit } = useDepositMutation();
  const { data: session } = useSession();

  const { mutate: handleArrived } = useStudyArrivedMutation(getToday(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(VOTE_GET);

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
      toast({
        title: "오류",
        description: "출석체크 중 문제가 발생했어요. 다시 시도해보세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });
  const onCancelClicked = () => {
    setIsModal(false);
  };
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
      toast({
        title: "오류",
        description: "현재 스터디 장소에 있지 않은 것으로 확인돼요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
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
          <button type="button" onClick={onCancelClicked}>
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
  margin-bottom: 12px;
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

export default AttendCheckModal;
