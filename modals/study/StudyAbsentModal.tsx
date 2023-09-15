import { SearchIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalLayout } from "../../components/common/modal/Modals";
import { POINT_SYSTEM_MINUS } from "../../constants/pointSystem";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import { useStudyAbsentMutation } from "../../hooks/study/mutations";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import { useDepositMutation } from "../../hooks/user/pointSystem/mutation";
import { isRefetchStudySpaceState } from "../../recoil/refetchingAtoms";
import {
  myStudyFixedState,
  studyStartTimeState,
  voteDateState,
} from "../../recoil/studyAtoms";
import { InputSm } from "../../styles/layout/input";
import {
  ModalFooterNav,
  ModalHeaderLine,
  ModalMain,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function StudyAbsentModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const router = useRouter();
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();
  const placeId = router.query.placeId;

  const studyStartTime = useRecoilValue(studyStartTimeState);
  const mySpaceFixed = useRecoilValue(myStudyFixedState);
  const voteDate = useRecoilValue(voteDateState);
  const setIsRefetch = useSetRecoilState(isRefetchStudySpaceState);

  const [isTooltip, setIsTooltip] = useState(false);
  const [value, setValue] = useState<string>("");

  const myStudyStartTime = studyStartTime?.find(
    (item) => item.placeId === placeId
  )?.startTime;
  const isFree = mySpaceFixed.status === "free";

  const { mutate: sendRequest } = useUserRequestMutation();
  const { mutate: getDeposit } = useDepositMutation();
  
  const { mutate: absentStudy } = useStudyAbsentMutation(voteDate, {
    onSuccess: () => {
      completeToast("success");
      setIsRefetch(true);
      let fee: { value: number; message: string };
      if (isFree) return;
      if (dayjs() > myStudyStartTime)
        fee = POINT_SYSTEM_MINUS.absentStudy.depositLate;
      else fee = POINT_SYSTEM_MINUS.absentStudy.deposit;
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
    if (mySpaceFixed) absentStudy(value);
    else failToast("free", "스터디에 참여하지 않은 인원입니다.");
    setIsModal(false);
  };

  return (
    <>
      <ModalLayout size="md">
        <ModalHeaderLine>
          <Header>
            {!isTooltip ? <span>불참 경고</span> : <span>불참 인정 사유</span>}
            <div onClick={() => setIsTooltip((old) => !old)}>
              <span>인정 사유</span>
              <IconWrapper
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton
                  color="white"
                  background="var(--color-mint)"
                  aria-label="iconLabel"
                  icon={<SearchIcon />}
                  size="xs"
                />
              </IconWrapper>
            </div>
          </Header>
        </ModalHeaderLine>
        {isTooltip ? (
          <>
            <ModalMain>
              <TooltipInfo
                initial={{ opacity: 0, y: -120, x: 160, scale: 0 }}
                animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
              >
                <ol>
                  <li>
                    본인의 참여 시간이 다른 인원과 <b>1명 이하</b>로 겹치고,
                    <b> 1시간 이하</b>로 겹치는 경우
                  </li>
                  <li>관리자에게 따로 연락해서 동의를 구한 경우</li>
                </ol>
              </TooltipInfo>
            </ModalMain>
          </>
        ) : (
          <>
            <ModalMain>
              <ModalSubtitle>
                {dayjs() < myStudyStartTime ? (
                  <div>
                    스터디 시작 시간이 지났기 때문에 벌금 <b>500원</b>이
                    부여됩니다. 참여 시간을 변경해 보는 것은 어떨까요?
                  </div>
                ) : (
                  <div>
                    스터디 시작 시간 이전으로 벌금 <b>200원</b>이 부여됩니다.
                    참여 시간을 변경해 보는 건 어떨까요?
                  </div>
                )}
              </ModalSubtitle>
              <InputSm
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="불참 사유"
              />
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setIsModal(false)}>취소</button>
              <button onClick={() => handleCancleBtn()}>불참</button>
            </ModalFooterNav>
          </>
        )}
      </ModalLayout>
    </>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    font-weight: 600;
    font-size: 12px;
    color: var(--color-mint);
    display: flex;
    align-items: center;
    > span:first-child {
      margin-right: var(--margin-md);
    }
  }
`;

const IconWrapper = styled(motion.div)``;

const TooltipInfo = styled(motion.div)`
  height: 100%;
  > ol {
    > li {
      margin-left: var(--margin-main);
      font-size: 13px;
      margin-bottom: var(--margin-sub);
    }
  }
`;

export default StudyAbsentModal;
