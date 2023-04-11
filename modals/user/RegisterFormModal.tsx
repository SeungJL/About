import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Toast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

import {
  ModalMd,
  ModalMain,
  FullScreen,
  ModalLg,
  ModalHeaderLine,
} from "../../styles/layout/modal";
import { PrivacyPolicy } from "../../storage/PrivacyPolicy";

import { useRegisterMutation } from "../../hooks/vote/mutations";
import { now } from "../../libs/utils/dateUtils";

import { IRegisterForm, IUser, IUserRegister } from "../../types/user";

function RegisterFormModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: session } = useSession();

  const [isMan, setIsMan] = useState(true);
  const [isPrivacyModal, setIsPrivacyModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      registerDate: `${now().format("YYYY-MM-DD")}`,
      name: "",
      mbti: "",
      birth: "",
      agree: "",
    },
  });

  const { mutate: handleRegister } = useRegisterMutation({
    onSuccess: async (data: IUser) => {
      setIsModal(false);
    },
    onError: (err) => {
      Toast({
        title: "오류",
        description: "참여 취소 신청 중 문제가 발생했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  const onValid = (data: IRegisterForm) => {
    const userInfo: IUserRegister = {
      name: session?.user.name,
      registerDate: data.registerDate,
      role: "member",
      isActive: true,
      birth: data.birth,
      mbti: data.mbti,
      gender: isMan ? "남성" : "여성",
      location: "",
    };

    handleRegister(userInfo);
    setIsModal(false);
  };

  return (
    <>
      <Layout>
        <ModalHeaderLine>회원가입</ModalHeaderLine>
        <ModalMain>
          <Form onSubmit={handleSubmit(onValid)} id="register">
            <Item>
              <span>이름: </span>
              <span>{session?.user.name}</span>
            </Item>
            <ErrorMessage></ErrorMessage>{" "}
            <Item>
              <span>지역: </span>
              <Select
                {...register("location", {
                  required: true,
                  validate: (value) => value === "수원" || value === "양천구",
                })}
              >
                <option value="">지역 선택</option>
                <option value="수원">수원</option>
                <option value="양천구">양천구</option>
              </Select>
            </Item>
            <ErrorMessage>{errors?.registerDate?.message}</ErrorMessage>
            <Item>
              <span>가입일: </span>
              <input
                {...register("registerDate", {
                  required: "필수입력",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "YYYY-MM-DD 형식으로 작성해주세요",
                  },
                })}
                placeholder="YYYY-MM-DD"
              />
            </Item>
            <ErrorMessage>{errors?.registerDate?.message}</ErrorMessage>
            <Item>
              <span>성별: </span>
              <Gender>
                <GenderBtn isSelected={isMan} onClick={() => setIsMan(true)}>
                  남성
                </GenderBtn>
                <GenderBtn isSelected={!isMan} onClick={() => setIsMan(false)}>
                  여성
                </GenderBtn>
              </Gender>
            </Item>
            <ErrorMessage></ErrorMessage>
            <Item>
              <span>생년월일: </span>
              <input
                {...register("birth", {
                  required: "필수입력",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "주민번호 앞자리",
                  },
                })}
                placeholder="Ex) 970816"
              />
            </Item>
            <ErrorMessage>{errors?.birth?.message}</ErrorMessage>
            <Item>
              <span>MBTI(선택): </span>
              <input {...register("mbti")} placeholder="Ex) ENFP" />
            </Item>
            <ErrorMessage>{errors?.mbti?.message}</ErrorMessage>
          </Form>
        </ModalMain>
        <Footer>
          <div>
            <Button type="button" onClick={() => setIsPrivacyModal(true)}>
              약관
            </Button>
            <Agree>
              <span>동의</span>
              <input
                type="checkbox"
                {...register("agree", { required: "필수체크" })}
              />
            </Agree>
          </div>
          <SubmitButton type="submit" form="register">
            제출
          </SubmitButton>
        </Footer>
      </Layout>
      <FullScreen />
      {isPrivacyModal && <PrivacyPolicy setIsModal={setIsPrivacyModal} />}
    </>
  );
}

const Layout = styled(ModalLg)``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  > div:last-child {
    flex: 1;
  }
`;

const Item = styled.div`
  display: flex;
  min-height: 28px;
  align-items: center;
  > span {
    display: inline-block;
    min-width: 25%;
    font-weight: 600;
    color: var(--font-h2);
  }
  > input {
    height: 90%;
    flex: 1;
    background-color: var(--font-h7);
  }
`;

const ErrorMessage = styled.div`
  font-size: 11px;
  height: 11px;
  color: var(--color-red);
`;

const Select = styled.select`
  background-color: var(--font-h7);
`;

const Gender = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
  > button:last-child {
    margin-right: 12px;
  }
`;
const GenderBtn = styled.div<{ isSelected: boolean }>`
  font-size: 12px;
  width: 36px;
  text-align: center;
  height: 18px;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-red)" : "var(--font-h6)"};
  color: ${(props) => (props.isSelected ? "white" : "var(--font-h1)")};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;
const Agree = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin: 0 7px;
    font-size: 13px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  margin-right: 8px;
  border-radius: 14px;
  font-size: 12px;
  color: var(--font-h2);
  font-weight: 600;
  background-color: var(--font-h6);
  padding: 1px 8px;
  margin-top: 1px;
`;

const SubmitButton = styled.button`
  color: var(--color-red);
  margin-right: 3px;
  font-weight: 600;
`;

export default RegisterFormModal;
