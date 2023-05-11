import styled from "styled-components";
import { ChangeEvent, EventHandler, useEffect, useState } from "react";
import ProgressLayout from "../../components/layouts/ProgressLayout";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState, useSetRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { ChangeHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Location } from "../../types/system";

import { INTEREST_DATA, MESSAGE_DATA } from "../../storage/ProfileData";
import { IInterests } from "../../types/user";
import { Box, Flex, useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
function Fee() {
  const toast = useToast();
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [errorMessage, setErrorMessage] = useState("");

  const copyAccount = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: "복사 완료",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",

          variant: "left-accent",
        });
      },
      (error) => {
        console.error("Failed to copy text:", error);
      }
    );
  };
  const onClickNext = () => {
    router.push(`/register/success`);
  };

  return (
    <>
      <ProgressLayout value={100} />
      <Header title="회원가입" url="/register/phone" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>회비 납부</span>
          <span>보증금은 회원 탈퇴시 환급해드려요!</span>
        </RegisterOverview>

        <Cost>
          <div>
            <span>가입비</span>
            <span>+2000원</span>
          </div>
          <div>
            <span>보증금</span>
            <span>+ 3000원</span>
          </div>

          <div>
            <span>총 금액</span>
            <span>= 5000원</span>
          </div>
        </Cost>
        <Account>
          <span style={{ width: "80px" }}>입금 계좌</span>
          <div>
            972-006967-01-011 기업 이승주
            <span
              style={{ marginLeft: "8px" }}
              onClick={() => copyAccount("972-006967-01-011 기업 이승주")}
            >
              <FontAwesomeIcon icon={faCopy} />
            </span>
          </div>
        </Account>
        <Message>입금 후에 완료 버튼을 눌러주세요 !</Message>
        <Accordion
          allowToggle
          marginTop="40px"
          marginBottom="48px"
          fontSize="13px"
          color="var(--font-h2)"
        >
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Flex
                  alignItems="center"
                  as="span"
                  flex="1"
                  textAlign="left"
                  height="28px"
                >
                  Q. 스터디 벌금이 궁금해요!
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pt={4} pb={4}>
              <Content>
                <ul>
                  <li>
                    1시간 이상 지각 <B> -300원</B>
                  </li>
                  <li>
                    스터디 당일 불참 <B>-600원</B>
                  </li>
                  <li>
                    스터디 당일 잠수 <B> -1000원</B>
                  </li>
                  <li>
                    한 달에 2번 미만 참여 <B> -700원 </B>(회 당)
                  </li>
                  <li>가입한 달에는 참여 정산 벌금 x</li>
                </ul>
              </Content>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box
                  alignItems="center"
                  as="span"
                  flex="1"
                  textAlign="left"
                  height="28px"
                >
                  Q. 가입비와 벌금은 어디에 사용되나요?
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pt={4} pb={4}>
              동아리 내에서는 다양한 이벤트와 컨텐츠를 항시 진행하고 있습니다.
              동아리원 분들은 직접 이벤트에 침여할 수도 있고, 스터디에 참여하면
              적립 받는 포인트를 사용해서 추첨 컨텐츠에 응모할 수도 있습니다.
              모인 금액의 일부는 서비스 향상과 마케팅에도 사용됩니다.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </RegisterLayout>
      <BottomNav onClick={onClickNext} text="신청완료" />
    </>
  );
}
const Content = styled.div`
  font-size: 11px;
  padding: 4px 0;
  padding-left: 16px;

  > ul {
    line-height: 1.8;
  }
`;
const B = styled.b`
  margin-left: 3px;
  color: var(--font-h1);
`;

const Cost = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--font-h7);
  border-radius: var(--border-radius);
  border: 1.5px solid var(--font-h6);
  width: 160px;
  height: 140px;
  justify-content: space-around;
  margin: 40px 0;

  > div {
    padding: 8px 14px;
    display: flex;
    justify-content: space-between;

    > span:last-child {
      font-weight: 600;
    }
  }
  > div:last-child {
    padding-top: 14px;
    border-top: 1px solid var(--font-h5);
  }
`;

const Account = styled.div`
  margin-bottom: 14px;

  display: flex;

  > span:first-child {
    font-size: 14px;
    display: inline-block;
    width: 100px;
    font-weight: 600;
    color: var(--font-h1);
  }
`;

const Message = styled.div`
  font-size: 13px;

  color: var(--font-h2);
  margin-bottom: 64px;
`;

const PhoneNumber = styled.div``;

export default Fee;