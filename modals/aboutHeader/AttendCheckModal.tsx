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
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/modals/ModalComponents";
import { ModalLayout } from "../../components/modals/Modals";
import { ATTEND_CHECK_PRESENT_LIST } from "../../constants/contentsValue/attendCheck";
import { ATTEND_CHECK_POP_UP } from "../../constants/keys/localStorage";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import { useUserRequestMutation } from "../../hooks/user/mutations";
import {
  usePointMutation,
  useScoreMutation,
} from "../../hooks/user/pointSystem/mutation";
import { attendCheckWinGiftState } from "../../recoil/renderTriggerAtoms";
import { ModalMain } from "../../styles/layout/modal";
import { IattendCheckPresent } from "../../types/modal/attendCheck";
import { IModal } from "../../types/reactTypes";
import { IUserRequest } from "../../types/user/userRequest";

const ARRAY_LENGTH = 10000;

function AttendCheckModal({ setIsModal }: IModal) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const completeToast = useCompleteToast();
  const percentItemArr: IattendCheckPresent[] = new Array(ARRAY_LENGTH).fill(
    null
  );

  let cnt = 0;
  ATTEND_CHECK_PRESENT_LIST.forEach((item) => {
    const percentValue = item.percent * ARRAY_LENGTH * 0.01;
    for (let i = cnt; i < cnt + percentValue; i++) {
      percentItemArr[i] = item;
    }
    cnt += percentValue;
  });

  const setAttendCheckWinGift = useSetRecoilState(attendCheckWinGiftState);

  const { mutate: setPoint } = usePointMutation();
  const { mutate: setScore } = useScoreMutation();

  const { mutate } = useUserRequestMutation({
    onError: errorToast,
  });
  const onClickCheck = () => {
    if (isGuest) {
      failToast("guest");
      return;
    }
    localStorage.setItem(ATTEND_CHECK_POP_UP, "read");
    setPoint({ value: 3, message: "출석체크" });
    setScore({ value: 3, message: "출석체크" });
    const randomNum = Math.round(Math.random() * 10000);
    const gift = percentItemArr[randomNum];

    if (gift !== null) {
      setAttendCheckWinGift(gift);
      const data: IUserRequest = {
        writer: session?.user.name,
        category: "출석",
        content: gift.item,
      };
      mutate(data);
    }
    setIsModal(false);
    completeToast("free", "출석체크 완료 !");
  };

  return (
    <ModalLayout size="lg">
      <ModalHeaderX title="매일매일 출석체크 !" setIsModal={setIsModal} />
      <ModalMain>
        <PresentMessage>
          매일 출석체크로 <b>+5 ABOUT</b> 포인트를 얻을 수 있고, 운이 좋으면
          <b> 랜덤 이벤트 선물</b>도 받을 수 있어요!
        </PresentMessage>
        <Container>
          <Detail>
            <span>+ 5 POINT</span>
            <span>+ 5 SCORE</span>
            <span>+ 랜덤 선물</span>
          </Detail>
          <Item>
            <FontAwesomeIcon
              icon={faCheckCircle}
              color="var(--color-mint)"
              size="5x"
            />
          </Item>
          <Detail>
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
                  {ATTEND_CHECK_PRESENT_LIST.map((item, idx) => (
                    <span key={idx}>
                      {item.item}
                      {idx !== ATTEND_CHECK_PRESENT_LIST.length - 1 && ", "}
                    </span>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
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
                  {ATTEND_CHECK_PRESENT_LIST.map((item, idx) => (
                    <PercentItem key={idx}>
                      <span>{item.item}</span>
                      <span>({item.percent}%)</span>
                      {idx !== ATTEND_CHECK_PRESENT_LIST.length - 1 && ", "}
                    </PercentItem>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Detail>
        </Container>
      </ModalMain>
      <Button size="md" colorScheme="mintTheme" onClick={onClickCheck}>
        출석
      </Button>
    </ModalLayout>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 0.3;
  align-items: center;
  height: 40%;

  > span {
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
`;

const PercentItem = styled.span``;

const Item = styled.div``;

export default AttendCheckModal;
