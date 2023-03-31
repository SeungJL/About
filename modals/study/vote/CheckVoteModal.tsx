import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";

import styled from "styled-components";
import { CommentBox } from "../../../components/block/CommentBox";
import { useArrivedMutation } from "../../../hooks/vote/mutations";
import { VOTE_GET } from "../../../libs/queryKeys";
import { getToday } from "../../../libs/utils/dateUtils";
import { mySpaceFixedState } from "../../../recoil/studyAtoms";

import { ModalFooterNav, ModalLg } from "../../../styles/LayoutStyles";
import { IPlace } from "../../../types/studyDetails";

const LOCATE_GAP = 0.00008;

export default function CheckVoteModal({
  setIsModal,
  myPlace,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  myPlace?: IPlace;
}) {
  const [memo, setMemo] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: session } = useSession();
  const { mutate: handleArrived } = useArrivedMutation(getToday(), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(VOTE_GET);
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
  console.log(55, myPlace);
  const checkArrived = () => {
    navigator.geolocation.getCurrentPosition((data) => {
      const coords = data?.coords;
      console.log(44, myPlace, coords);
      if (
        (coords.latitude > myPlace?.latitude - LOCATE_GAP ||
          coords.latitude < myPlace?.latitude + LOCATE_GAP) &&
        (coords.longitude > myPlace?.longitude - LOCATE_GAP ||
          coords.longitude < myPlace?.longitude + LOCATE_GAP)
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
    });
  };

  return (
    <Container>
      <Layout>
        <Title>출석체크</Title>

        <MainContent>
          <div>
            도착하셨나요? <br />
            자리나 인상착의를 간단하게 남겨주세요!
          </div>
          <CommentBox>
            <form id="AttendCheckForm">
              <Input
                placeholder="comment"
                onChange={(e) => setMemo(e.target.value)}
              />
            </form>
          </CommentBox>
        </MainContent>
        <BtnNav>
          <button type="button" onClick={onCancelClicked}>
            취소
          </button>
          <button type="button" form="AttendCheckForm" onClick={onCheckClicked}>
            출석
          </button>
        </BtnNav>
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

const Layout = styled(ModalLg)`
  padding: 15px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  padding-bottom: 12px;
  margin-bottom: 6px;
  color: var(--font-h1);
  font-weight: 600;
  font-size: 16px;

  border-bottom: 1px solid var(--font-h5);
`;
const MainContent = styled.main`
  margin-top: 10px;
  font-size: 13px;
  color: var(--font-h1);
  > div {
    margin-bottom: 12px;
  }
`;
const Input = styled.input`
  height: 50px;
  width: 100%;
`;

const BtnNav = styled(ModalFooterNav)`
  margin-top: auto;
  text-align: end;
  > button:last-child {
    background-color: var(--color-red);
  }
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
