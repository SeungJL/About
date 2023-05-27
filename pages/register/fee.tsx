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
import { faAnglesRight, faCopy } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { ACCOUNT, ACCOUNT_SHORT } from "../../constants/private";
import { useSession } from "next-auth/react";
import {
  useApproveMutation,
  useDeleteRegisterMutation,
  useRegisterMutation,
} from "../../hooks/user/mutations";
import { useRegisterQuery, useUserInfoQuery } from "../../hooks/user/queries";
import RegisterCost from "../../pagesComponents/Register/fee/RegisterCost";
function Fee() {
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  console.log(registerForm);
  const isReady = registerForm?.location === "안양";

  const [errorMessage, setErrorMessage] = useState("");

  const { mutate } = useRegisterMutation({
    onSuccess() {
      console.log("register success", registerForm);
    },
    onError(error) {
      console.error(error);
    },
  });

  useRegisterQuery({
    onSuccess(data) {
      console.log(115, data);
    },
  });

  const A = useUserInfoQuery();
  // console.log("My", A?.data);
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
    mutate(registerForm);
    // router.push(`/register/success`);
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
          {isReady && (
            <div style={{ marginBottom: "20px", color: "var(--font-h2)" }}>
              <span>오픈준비중 지역은 가입비 1000원만 납부하면 신청완료!</span>
              <br />
              <span>오픈 할 때 입력하신 연락처로 개인 연락드려요!</span>
            </div>
          )}
          <div>
            <RegisterCost />
            {isReady && (
              <>
                <FontAwesomeIcon icon={faAnglesRight} />
                <RegisterCost isSecond={true} />
              </>
            )}
          </div>
        </Cost>
        <Account>
          <span style={{ width: "80px" }}>입금 계좌</span>
          <div>
            {ACCOUNT_SHORT}
            <span
              style={{ marginLeft: "8px" }}
              onClick={() => copyAccount(ACCOUNT)}
            >
              <FontAwesomeIcon icon={faCopy} />
            </span>
          </div>
        </Account>
        <Message>입금 후에 완료 버튼을 눌러주세요!</Message>
        <Telephone>
          <span> 연락받을 연락처:</span> {registerForm?.telephone}
          <Message>연락처를 한번 더 확인해 주세요!</Message>
        </Telephone>
        <Accordion
          allowToggle
          marginTop="40px"
          marginBottom="48px"
          fontSize="13px"
          color="var(--font-h2)"
        >
          {isReady && (
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
                    Q. 저희 지역 스터디는 언제 오픈하나요?
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pt={4} pb={4}>
                신청 인원이 2~30명 정도 모이면 오픈합니다! 신청 현황은 첫
                페이지에서 언제든 확인할 수 있고, 늦어도 준비 시작 날짜를
                기준으로 2~3주면 오픈해요!
              </AccordionPanel>
            </AccordionItem>
          )}
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
                  Q. 입금 후에 어떻게 하나요?
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pt={4} pb={4}>
              신청을 완료하시면 관리자가 확인하는대로 가입 승인과 단톡방 초대를
              해 드립니다! 빠르면 당일이 될 수도 있고 늦어지면 최대 3~4일까지
              소요될 수 있습니다. 모든 신청자분들께 연락을 꼭 드리니, 연락이
              안오거나 불합격 하는 경우가 있지 않나 걱정하지 않으셔도 됩니다!
              또한 마음이 바뀌어 참여를 안하게 되는 경우에도 가입 후 일주일
              이내에는 가입비와 보증금 전액 환급해드립니다.
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
                  Q. 스터디 벌금이 궁금해요!
                </Flex>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pt={4} pb={4}>
              <Content>
                <ul>
                  <li>
                    1시간 이상 지각 <B> -200원</B>
                  </li>
                  <li>
                    스터디 당일 불참 <B>-500원</B>
                  </li>
                  <li>
                    스터디 당일 잠수 <B> -1000원</B>
                  </li>
                  <li>
                    한 달에 1번 미만 참여 <B> -1000원 </B>
                  </li>
                  <li>가입한 달에는 참여 정산 벌금 x</li>
                </ul>
              </Content>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                }}
              >
                보증금은 언제든 환급받을 수 있습니다.
              </span>
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
          </AccordionItem>{" "}
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
                  Q. 추가적으로 궁금한 내용이 있어요!
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pt={4} pb={4}>
              https://open.kakao.com/o/sjDgVzmf
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </RegisterLayout>
      <BottomNav onClick={onClickNext} text="입금완료" />
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
  margin: 40px 0;
  > div:first-child {
    color: var(--font-h2);
    font-size: 13px;
    margin-bottom: 12px;
  }
  > div:last-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Account = styled.div`
  margin-bottom: 4px;
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

  color: var(--font-h3);
  margin-bottom: 40px;
`;

const Telephone = styled.div`
  > span:first-child {
    font-size: 14px;
    display: inline-block;
    font-weight: 600;
    color: var(--font-h1);
    margin-bottom: 4px;
  }
`;

export default Fee;
