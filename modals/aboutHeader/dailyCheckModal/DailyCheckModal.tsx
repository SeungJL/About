import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { faCheckCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeader,
  ModalLayout,
} from "../../../components/modals/Modals";
import { DAILY_CHECK_POP_UP } from "../../../constants/keys/localStorage";
import { DAILY_CHECK_WIN_ITEM } from "../../../constants/settingValue/dailyCheck";
import { POINT_SYSTEM_PLUS } from "../../../constants/settingValue/pointSystem";
import { dayjsToStr } from "../../../helpers/dateHelpers";
import { getRandomAlphabet } from "../../../helpers/eventHelpers";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";

import { useAboutPointMutation } from "../../../hooks/user/mutations";
import { useCollectionAlphabetMutation } from "../../../hooks/user/sub/collection/mutations";
import { useDailyCheckMutation } from "../../../hooks/user/sub/dailyCheck/mutation";
import { useDailyCheckQuery } from "../../../hooks/user/sub/dailyCheck/queries";
import { useUserRequestMutation } from "../../../hooks/user/sub/request/mutations";

import { attendCheckWinGiftState } from "../../../recoil/renderTriggerAtoms";
import { transferAlphabetState } from "../../../recoil/transferDataAtoms";
import { IattendCheckPresent } from "../../../types/modal/attendCheck";
import { IModal } from "../../../types/reactTypes";
import { IUserRequest } from "../../../types/user/userRequest";

const ARRAY_LENGTH = 10000;

function DailyCheckModal({ setIsModal }: IModal) {
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";

  const percentItemArr: IattendCheckPresent[] = new Array(ARRAY_LENGTH).fill(
    null
  );
  let cnt = 0;
  DAILY_CHECK_WIN_ITEM.forEach((item) => {
    const percentValue = item.percent * ARRAY_LENGTH * 0.01;
    for (let i = cnt; i < cnt + percentValue; i++) {
      percentItemArr[i] = item;
    }
    cnt += percentValue;
  });

  const setAttendCheckWinGift = useSetRecoilState(attendCheckWinGiftState);
  const setTransferAlphabetState = useSetRecoilState(transferAlphabetState);
  const { data: dailyCheckAll, isLoading } = useDailyCheckQuery();

  const checkRecords = dailyCheckAll?.map((item) => ({
    ...item,
    createdAt: dayjs(item?.createdAt),
  }));

  const { mutate: getAlphabet } = useCollectionAlphabetMutation("get");
  const { mutate: attendDailyCheck } = useDailyCheckMutation();
  const { mutate: getAboutPoint } = useAboutPointMutation();
  const { mutate: sendRequest } = useUserRequestMutation({
    onError: errorToast,
  });

  const onClickCheck = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    localStorage.setItem(DAILY_CHECK_POP_UP, dayjsToStr(dayjs()));

    if (
      checkRecords?.find((item) => item.createdAt.date() === dayjs().date())
    ) {
      failToast("free", "오늘 출석체크는 이미 완료됐어요!");
      setIsModal(false);
      return;
    }
    attendDailyCheck();
    getAboutPoint(POINT_SYSTEM_PLUS.DAILY_ATTEND);
    const randomNum = Math.round(Math.random() * 10000);
    const gift = percentItemArr[randomNum];
    if (gift !== null) {
      if (gift.item === "알파벳") {
        const alphabet = getRandomAlphabet(20);
        if (alphabet) {
          getAlphabet({ alphabet });
          setTransferAlphabetState(alphabet);
        }
      } else {
        setAttendCheckWinGift(gift);
      }
      const data: IUserRequest = {
        writer: session?.user.name,
        category: "출석",
        content: gift.item,
      };
      sendRequest(data);
    }
    setIsModal(false);
    completeToast("free", "출석체크 완료 !");
  };

  return (
    <ModalLayout onClose={() => setIsModal(false)} size="md">
      <ModalHeader text="매일매일 출석체크 !" />
      <ModalBody>
        <PresentMessage>
          매일 출석체크로 <b>5 point</b>를 얻을 수 있고, 운이 좋으면
          <b> 랜덤 이벤트 선물</b>도 받을 수 있어요!
        </PresentMessage>
        <Container>
          <Detail>
            <span>+ 5 POINT</span>
            <span>+ 랜덤 선물</span>
          </Detail>
          <CheckWrapper>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color="var(--color-mint)"
              size="4x"
            />
          </CheckWrapper>
          <Detail>
            <PresentListPopOver />
            <PresentPercentPopOver />
          </Detail>
        </Container>
      </ModalBody>
      <ModalFooterOne
        isLoading={isLoading}
        text="출석"
        onClick={onClickCheck}
        isFull={true}
      />
    </ModalLayout>
  );
}

const PresentListPopOver = () => (
  <Popover placement="top-start">
    <PopoverTrigger>
      <Button size="xs">선물 목록</Button>
    </PopoverTrigger>
    <PopoverContent bg="var(--font-h56)">
      <PopoverHeader fontWeight="semibold">
        선물 목록 <SubTitle>(16 종류)</SubTitle>
      </PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody fontSize="12px">
        {DAILY_CHECK_WIN_ITEM.map((item, idx) => (
          <span key={idx}>
            {item.item}
            {idx !== DAILY_CHECK_WIN_ITEM.length - 1 && ", "}
          </span>
        ))}
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

const PresentPercentPopOver = () => (
  <Popover placement="top-start">
    <PopoverTrigger>
      <Button size="xs">당첨 확률</Button>
    </PopoverTrigger>
    <PopoverContent bg="var(--font-h56)">
      <PopoverHeader fontWeight="semibold">
        당첨 확률<SubTitle>(총 7.06%)</SubTitle>
      </PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody fontSize="12px">
        {DAILY_CHECK_WIN_ITEM.map((item, idx) => (
          <PercentItem key={idx}>
            <span>{item.item}</span>
            <span>({item.percent}%)</span>
            {idx !== DAILY_CHECK_WIN_ITEM.length - 1 && ", "}
          </PercentItem>
        ))}
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

const Container = styled.div`
  margin-top: var(--margin-md);
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  > div:first-child {
    padding: var(--padding-min) 0;
  }
`;

const Detail = styled.div`
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex: 0.35;
  > span {
    width: 65px;
    text-align: end;
    color: var(--font-h2);
    display: block;
    padding: 2px 0;
    font-weight: 600;
    font-size: 11px;
  }
`;

const SubTitle = styled.span`
  color: var(--font-h3);
  font-weight: 400;
  font-size: 12px;
`;
const PresentMessage = styled.div`
  font-size: 12px;
  > b {
    color: var(--color-mint);
  }
`;

const PercentItem = styled.span``;

const CheckWrapper = styled.div``;

export default DailyCheckModal;
