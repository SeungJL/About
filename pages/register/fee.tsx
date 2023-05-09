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
  const router = useRouter();
  const toast = useToast();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  const [index, setIndex] = useState(null);

  const InputIdx = MESSAGE_DATA?.length;
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
    if (index === null) setErrorMessage("문장을 선택해 주세요.");
    let message = "";
    if (index === InputIdx) message = value;
    else message = MESSAGE_DATA[index];

    setRegisterForm((old) => ({ ...old, message }));

    router.push(`/register/fee`);
  };

  return (
    <>
      <ProgressLayout value={64} />
      <Header title="회원가입" url="/register/interest" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>회비 납부</span>
          <span>이제 마지막이에요!</span>
        </RegisterOverview>
        <Overview>
          <span>가입비와 스터디 보증금이 있습니다.</span>
          <span>보증금은 회원 탈퇴시 환급해드려요!</span>
        </Overview>
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
        <Accordion marginBottom="40px">
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
            <AccordionPanel pb={4}>
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
                <Flex
                  alignItems="center"
                  as="span"
                  flex="1"
                  textAlign="left"
                  height="28px"
                >
                  Q. 보증금은 어떻게 환급받나요?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}></AccordionPanel>
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
            <AccordionPanel pb={4}>
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

const Overview = styled.div`
  color: var(--font-h2);
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 14px;
  line-height: 1.8;
  > span:first-child {
    font-size: 15px;
    font-weight: 600;
  }
  > span:last-child {
    font-size: 13px;
    color: var(--font-h3);
  }
`;

const Cost = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--font-h6);
  border-radius: var(--border-radius);
  width: 150px;
  height: 120px;
  justify-content: space-around;
  > div {
    display: flex;
    justify-content: space-between;
    padding: 4px 8px;
    > span:last-child {
      font-weight: 600;
    }
  }
  > div:last-child {
    padding-top: 8px;
    border-top: 1px solid var(--font-h4);
  }
`;

const Account = styled.div`
  margin: 40px 0;
  margin-bottom: 14px;
  font-size: 15px;
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
  margin-bottom: 40px;
`;

const PhoneNumber = styled.div``;

export default Fee;
