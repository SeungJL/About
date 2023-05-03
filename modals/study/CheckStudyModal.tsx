import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQueryClient } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";

import styled from "styled-components";
import CommentBox from "../../components/common/CommentBox";
import { InputSm } from "../../components/ui/Input";
import {
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";

import { useArrivedMutation } from "../../hooks/vote/mutations";
import { useVoteQuery } from "../../hooks/vote/queries";
import { VOTE_GET } from "../../libs/queryKeys";
import { getToday } from "../../libs/utils/dateUtils";
import { mySpaceFixedState, voteDateState } from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/systemAtoms";

import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
  ModalMd,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IPlace } from "../../types/studyDetails";

const LOCATE_GAP = 0.00008;

function CheckStudyModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const mySpaceFixed = useRecoilValue(mySpaceFixedState);
  const location = useRecoilValue(locationState);
  const [memo, setMemo] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const voteDate = useRecoilValue(voteDateState);

  const { data } = useVoteQuery(voteDate, location);
  const myPlace = data?.participations.find(
    (par) => par === mySpaceFixed
  )?.place;
  const { mutate: getPoint } = usePointMutation();
  const { mutate: getScore } = useScoreMutation();
  const { data: session } = useSession();

  const { mutate: handleArrived } = useArrivedMutation(getToday(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(VOTE_GET);
      if (!isChecking && voteDate > dayjs().subtract(1, "day")) {
        getScore(5);
        getPoint(5);
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
  const onCheckClicked = () => {
    setIsChecking(true);
    checkArrived();
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

export default CheckStudyModal;
