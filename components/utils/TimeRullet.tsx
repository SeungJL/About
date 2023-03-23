import styled from "styled-components";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { move } from "formik";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Datepicker } from "@mobiscroll/react";
import { background, useToast } from "@chakra-ui/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { momentTimezone } from "@mobiscroll/react";
import moment from "moment-timezone";
import { useAttendMutation } from "../../hooks/vote/mutations";
import { Dayjs } from "dayjs";
import { useQueryClient } from "react-query";
import { VOTE_GET } from "../../libs/queryKeys";
import { IPlace } from "../../models/place";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import ModalPortal from "../ModalPortal";
import VoteSuccessModal from "../Pages/About/studySpace/VoteSuccessModal";
import { isVoteCompleteState, isVotingState } from "../../recoil/atoms";
momentTimezone.moment = moment;
const NUM_VISIBLE_ITEMS = 5;
const ITEM_HEIGHT = 34;

interface ITimeRullet {
  timeArr: { hour: string; minutes: string }[];
  voteDate: Dayjs;
  place: IPlace;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

function TimeRullet({ timeArr, voteDate, place, setIsModal }: ITimeRullet) {
  const [selectedRange, setSelectedRange] = useState("10");
  const queryClient = useQueryClient();
  const selector = document.querySelectorAll(".mbsc-range-control-value");
  const setIsVoting = useSetRecoilState(isVotingState);
  const setIsCompleteModal = useSetRecoilState(isVoteCompleteState);
  const toast = useToast();

  if (selector) {
    if (selector[0]) selector[0].innerHTML = "";
    if (selector[1]) selector[1].innerHTML = "";
  }

  const onChange = (event: any) => {
    setSelectedRange(event.value);
  };
  const { mutate: patchAttend } = useAttendMutation(voteDate, {
    onSuccess: () => {
      setIsModal(false);
      setIsVoting(true);
      setIsCompleteModal(true);
      queryClient.invalidateQueries(VOTE_GET);
    },
  });

  const onSubmit = async () => {
    const start = moment(selectedRange[0]).format("HH-mm");
    const end = moment(selectedRange[1]).format("HH-mm");

    const startHour = Number(start.slice(0, 2));
    const startMin = Number(start.slice(3));
    const endHour = Number(end.slice(0, 2));
    const endMin = Number(end.slice(3));
    const info = {
      place,
      start: voteDate.hour(startHour).minute(startMin),
      end: voteDate.hour(endHour).minute(endMin),
      subPlace: [],
    };
    if (startHour * 60 + startMin >= endHour * 60 + endMin) {
      toast({
        title: "잘못된 입력",
        description: "시작시간은 끝시간 이전이여야 합니다",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    await patchAttend(info);
  };
  return (
    <>
      <Layout>
        <Container>
          <StyledDatepicker
            controls={["time"]}
            select="range"
            display="inline"
            touchUi={true}
            stepMinute={30}
            showRangeLabels={true}
            timeFormat="HH:mm"
            rangeStartLabel="시작시간"
            rangeEndLabel="종료시간"
            value={selectedRange}
            min="10"
            max="22"
            onChange={onChange}
          />
        </Container>
        <VoteButton onClick={onSubmit}>스터디 투표하기</VoteButton>
      </Layout>
    </>
  );
}

const Layout = styled(motion.div)``;

const Container = styled.div`
  height: 232px;
  display: flex;
  align-items: center;
  width: 100%;

  flex-direction: column;
  overflow: hidden;
  margin-bottom: 18px;
`;

const StyledDatepicker = styled(Datepicker)`
  width: 100%;
  background-color: red;
  flex: 1;
  .mbsc-range-control-wrapper {
    > div {
      width: 100% !important;
      > label {
        > span:last-child {
          display: flex !important;
          align-items: center !important;
          justify-content: center;
          > div:first-child {
            color: var(--font-h3);
            font-weight: 600;
            margin-right: 10px;
          }
          > div:last-child {
            margin-bottom: 4px !important;
            color: var(--color-mint);

            font-weight: 600;
          }
        }
      }
    }
  }
  .mbsc-scroller-wheel-group-cont {
    background-color: var(--font-h7);

    > div:first-child {
      opacity: 1 !important;
      background-color: var(--font-h5);
      background-color: blue;
    }
  }
  .mbsc-scroller-wheel-group {
    padding: 0 !important;
    font-size: 20px;
    font-weight: 500;
  }

  .mbsc-scroller-wheel-wrapper {
    color: var(--font-h4);
    flex: 1;
    height: 100%;

    .mbsc-selected {
      color: var(--font-h1);
      font-weight: 700;
    }
  }
  .mbsc-scroller-wheel {
    height: 200px !important;
  }

  .mbsc-scroller-wheel-cont {
    background-color: var(--font-h6);
    border-radius: 10px;
    ::before {
      border: none !important;
    }
    ::after {
      border: none !important;
    }
  }
  > div:last-child {
    border-radius: 13px !important;
  }
`;

const VoteButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-mint);
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: 14px 100px 14px 100px;
  font-weight: 700;
  font-size: 15px;
`;

export default TimeRullet;
