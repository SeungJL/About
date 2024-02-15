import { Button } from "@chakra-ui/react";
import dayjs, { Dayjs } from "dayjs";
import { AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useToast, useTypeToast } from "../../../hooks/custom/CustomToast";
import { useStudyParticipationMutation } from "../../../hooks/study/mutations";
import { usePointSystemMutation } from "../../../hooks/user/mutations";
import { usePointSystemLogQuery } from "../../../hooks/user/queries";
import {
  myStudyState,
  studyDateStatusState,
} from "../../../recoils/studyRecoils";
import { IModal } from "../../../types/reactTypes";
import { IStudyVote } from "../../../types2/studyTypes/studyVoteTypes";
import { dayjsToStr } from "../../../utils/dateTimeUtils";
import AlertModal, { IAlertModalOptions } from "../../AlertModal";
import { IBottomDrawerLgOptions } from "../../organisms/drawer/BottomDrawerLg";
import StudyVoteTimeRulletDrawer from "./StudyVoteTimeRulletDrawer";

interface IMapBottomNav extends IModal {
  myVote: IStudyVote;
  voteScore: number;
}

function MapBottomNav({ setIsModal, myVote, voteScore }: IMapBottomNav) {
  const toast = useToast();
  const typeToast = useTypeToast();
  const searchParams = useSearchParams();

  const date = searchParams.get("date");

  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const myStudy = useRecoilValue(myStudyState);

  const [voteTime, setVoteTime] = useState<{ start: Dayjs; end: Dayjs }>();
  const [modalType, setModalType] = useState<"timePick" | "voteCancel">(null);

  const onClickTimeSelect = () => {
    if (!myVote?.place) {
      toast("error", "장소를 먼저 선택해주세요!");
      return;
    }
    setModalType("timePick");
  };

  const { data: pointLog } = usePointSystemLogQuery("point", true, {
    enabled: !!myStudy,
  });

  //오늘 날짜 투표 포인트 받은거 찾기
  const myPrevVotePoint = pointLog?.find(
    (item) =>
      item.message === "스터디 투표" &&
      item.meta.sub === dayjsToStr(dayjs(date))
  )?.meta.value;

  const { mutate: getPoint } = usePointSystemMutation("point");
  const { mutate: patchAttend } = useStudyParticipationMutation(
    dayjs(date),
    "post",
    {
      onSuccess() {
        handleSuccess();
      },
    }
  );
  const { mutate: handleAbsent } = useStudyParticipationMutation(
    dayjs(date),
    "delete",
    {
      onSuccess() {
        if (myPrevVotePoint) {
          getPoint({
            message: "스터디 투표 취소",
            value: -myPrevVotePoint,
          });
        }
        setIsModal(false);
        toast("success", "취소되었습니다.");
      },
      onError: () => typeToast("error"),
    }
  );

  const handleSuccess = async () => {
    if (myPrevVotePoint) {
      await getPoint({
        message: "스터디 투표 취소",
        value: -myPrevVotePoint,
      });
    }
    if (studyDateStatus === "not passed" && voteScore) {
      await getPoint({
        value: voteScore,
        message: "스터디 투표",
        sub: date,
      });
      toast("success", `투표 완료! ${!myStudy && "포인트가 적립되었습니다."}`);
    } else toast("success", "투표 완료!");
    setIsModal(false);
  };

  const onSubmit = () => {
    patchAttend({
      ...myVote,
      ...voteTime,
    });
  };

  const drawerOptions: IBottomDrawerLgOptions = {
    header: {
      title: dayjs().format("M월 DD일 ddd요일"),
      subTitle: "스터디 참여시간을 선택해주세요!",
    },
    footer: {
      buttonText: "선택 완료",
      onClick: onSubmit,
    },
  };

  const alertOptions: IAlertModalOptions = {
    title: "참여 취소",
    subTitle: "스터디 신청을 취소하시겠습니까?",
    func: () => handleAbsent(),
  };

  return (
    <>
      <Layout>
        <Button colorScheme="mintTheme" size="lg" onClick={onClickTimeSelect}>
          시간 선택
        </Button>
        {myStudy && (
          <Button
            bgColor="red.400"
            color="white"
            size="lg"
            onClick={() => setModalType("voteCancel")}
            mt="8px"
          >
            참여 취소
          </Button>
        )}
        <Button mt="8px" size="lg" onClick={() => setIsModal(false)}>
          닫기
        </Button>
      </Layout>
      <AnimatePresence>
        {modalType === "timePick" && (
          <StudyVoteTimeRulletDrawer
            drawerOptions={drawerOptions}
            setIsModal={() => setModalType(null)}
            setVoteTime={setVoteTime}
          />
        )}
        {modalType === "voteCancel" && (
          <AlertModal
            alertModalOptions={alertOptions}
            setIsModal={() => setModalType(null)}
            colorType="redTheme"
          />
        )}
      </AnimatePresence>
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  > button {
    width: 100%;
    max-width: var(--view-max-width);
  }
`;

export default MapBottomNav;
