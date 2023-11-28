import { SearchIcon } from "@chakra-ui/icons";
import { IconButton, ModalHeader } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterTwo,
  ModalLayout,
} from "../../components/modals/Modals";
import { STUDY_VOTE } from "../../constants/keys/queryKeys";
import { POINT_SYSTEM_Deposit } from "../../constants/settingValue/pointSystem";
import { dayjsToStr } from "../../helpers/dateHelpers";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/custom/CustomToast";
import { useStudyAbsentMutation } from "../../hooks/study/mutations";
import { usePointSystemMutation } from "../../hooks/user/mutations";
import { useUserRequestMutation } from "../../hooks/user/sub/request/mutations";
import {
  myStudyState,
  studyStartTimeState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { locationState } from "../../recoil/userAtoms";
import { InputSm } from "../../styles/layout/input";
import { ModalSubtitle } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function StudyAbsentModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const router = useRouter();
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();
  const placeId = router.query.placeId;

  const myStudyFixed = useRecoilValue(myStudyState);
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(locationState);
  const studyStartTime = useRecoilValue(studyStartTimeState);

  const [isTooltip, setIsTooltip] = useState(false);
  const [value, setValue] = useState<string>("");

  const isFree = myStudyFixed.status === "free";

  const resetQueryData = useResetQueryData();

  const { mutate: sendRequest } = useUserRequestMutation();
  const { mutate: getDeposit } = usePointSystemMutation("deposit");

  const { mutate: absentStudy } = useStudyAbsentMutation(voteDate, {
    onSuccess: () => {
      completeToast("success");
      resetQueryData([STUDY_VOTE, dayjsToStr(voteDate), location]);
      let fee: { value: number; message: string };
      if (isFree) return;
      if (dayjs() > studyStartTime.startTime)
        fee = POINT_SYSTEM_Deposit.STUDY_ABSENT_AFTER;
      else fee = POINT_SYSTEM_Deposit.STUDY_ABSENT_BEFORE;
      getDeposit(fee);
      sendRequest({
        writer: session.user.name,
        title: session.uid + `D${fee.value}`,
        category: "불참",
        content: value,
      });
    },
    onError: errorToast,
  });

  const handleCancleBtn = () => {
    if (myStudyFixed) absentStudy(value);
    else failToast("free", "스터디에 참여하지 않은 인원입니다.");
    setIsModal(false);
  };

  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size="md">
        <ModalHeader
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <span>{isTooltip ? "불참 인정 사유" : "불참 경고"}</span>
          <Reason onClick={() => setIsTooltip((old) => !old)}>
            <span>인정 사유</span>
            <IconWrapper whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton
                color="white"
                background="var(--color-mint)"
                aria-label="iconLabel"
                icon={<SearchIcon />}
                size="xs"
              />
            </IconWrapper>
          </Reason>
        </ModalHeader>
        <ModalBody>
          {isTooltip ? (
            <>
              <TooltipInfo
                initial={{ opacity: 0, y: -120, x: 160, scale: 0 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              >
                <li>
                  본인의 참여 시간이 다른 인원과 <b>1명 이하</b>로 겹치고,
                  <b> 1시간 이하</b>로 겹치는 경우
                </li>
                <li>관리자에게 따로 연락해서 동의를 구한 경우</li>
              </TooltipInfo>
            </>
          ) : (
            <>
              <ModalSubtitle>
                {dayjs() < studyStartTime?.startTime ? (
                  <P>
                    스터디 시작 시간이 지났기 때문에 벌금 <b>500원</b>이
                    부여됩니다. 참여 시간을 변경해 보는 것은 어떨까요?
                  </P>
                ) : (
                  <P>
                    당일 불참으로 벌금 <b>200원</b>이 부과됩니다. 참여 시간을
                    변경해 보는 건 어떨까요?
                  </P>
                )}
              </ModalSubtitle>
              <InputSm
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="불참 사유"
              />
            </>
          )}
        </ModalBody>
        {!isTooltip && (
          <ModalFooterTwo
            onClickLeft={() => setIsModal(false)}
            onClickRight={handleCancleBtn}
            leftText="취소"
            rightText="불참"
          />
        )}
      </ModalLayout>
    </>
  );
}

const Reason = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: var(--color-mint);
  display: flex;
  align-items: center;
  > span:first-child {
    margin-right: var(--margin-md);
  }
`;

const P = styled.p``;

const IconWrapper = styled(motion.div)``;

const TooltipInfo = styled(motion.ol)`
  height: 100%;

  > li {
    margin-left: var(--margin-main);
    font-size: 13px;
    margin-bottom: var(--margin-sub);
  }
`;

export default StudyAbsentModal;
