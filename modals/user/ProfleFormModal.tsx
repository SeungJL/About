import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { now } from "../../libs/utils/dateUtils";
import { BaseModal, FullScreen } from "../../styles/LayoutStyles";
import { PrivacyPolicy } from "../../storage/PrivacyPolicy";

import { useSetRecoilState } from "recoil";

import { IUser } from "../../models/user";
import { useState } from "react";
import { Mutation } from "react-query";
import { Toast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRegisterMutation } from "../../hooks/vote/mutations";
import { useRouter } from "next/router";
import {
  isShowPrivacyPolicyState,
  isShowRegisterFormState,
} from "../../recoil/voteAtoms";
import { useActiveQuery } from "../../hooks/user/queries";

export interface IRegisterForm {
  registerDate: string;
  name: string;
  mbti?: string;
  birth: string;
  agree?: any;
  gender?: string;
}
export interface IUserRegister extends IRegisterForm {
  role: string;
  isActive: boolean;
  gender: string;
}

function ProfileFormModal({ setIsShowProfileModal }) {
  const [isMan, setIsMan] = useState(true);

  const setIsShowRegisterForm = useSetRecoilState(isShowRegisterFormState);
  const { data: session } = useSession();

  const user = useActiveQuery().data;

  const { mutate: handleRegister, isLoading: isRegisterLoading } =
    useRegisterMutation({
      onSuccess: async (data: IUser) => {
        session.user.name = data.name;
        session.role = data.role;
        setIsShowRegisterForm(false);
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
      name: data.name,
      registerDate: data.registerDate,
      role: "member",
      isActive: true,
      birth: data.birth,
      mbti: data.mbti,
      gender: isMan ? "남성" : "여성",
    };
    handleRegister(userInfo);
    setIsShowProfileModal(false);
  };
  const setisShowPrivacy = useSetRecoilState(isShowPrivacyPolicyState);

  const onCancelBtnClicked = () => {
    setIsShowProfileModal(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    defaultValues: {
      registerDate: user.registerDate,
      name: user.name,
      mbti: user.mbti,
      birth: user.birth,
      agree: "",
    },
  });
  return (
    <>
      <ModalLayout>
        <Header>유저 정보</Header>
        <UserForm onSubmit={handleSubmit(onValid)}>
          <InputItem>
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
          </InputItem>
          <ErrorMessage>{errors?.registerDate?.message}</ErrorMessage>
          <InputItem>
            <span>이름: </span>
            <input
              {...register("name", {
                required: "필수입력",
                maxLength: {
                  value: 3,
                  message: "세글자로 입력해주세요",
                },
                minLength: {
                  value: 3,
                  message: "세글자로 입력해주세요",
                },
              })}
            />
          </InputItem>
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          <InputGenders>
            <span>성별: </span>
            <GenderBtnNav>
              <GenderBtn selected={isMan} onClick={() => setIsMan(true)}>
                남성
              </GenderBtn>
              <GenderBtn selected={!isMan} onClick={() => setIsMan(false)}>
                여성
              </GenderBtn>
            </GenderBtnNav>
          </InputGenders>
          <ErrorMessage></ErrorMessage>
          <InputItem>
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
          </InputItem>
          <ErrorMessage>{errors?.birth?.message}</ErrorMessage>
          <InputItem>
            <span>MBTI(선택): </span>
            <input {...register("mbti")} placeholder="Ex) ENFP" />
          </InputItem>
          <ErrorMessage>{errors?.mbti?.message}</ErrorMessage>
          <SubmitBtn>
            <div>
              <Button type="button" onClick={() => setisShowPrivacy(true)}>
                약관
              </Button>
            </div>
            <div>
              <CancelBtn onClick={onCancelBtnClicked}>취소</CancelBtn>
              <Button type="submit">제출</Button>
            </div>
          </SubmitBtn>
        </UserForm>
      </ModalLayout>
    </>
  );
}
export default ProfileFormModal;

const ModalLayout = styled(BaseModal)`
  width: 320px;
  height: 340px;
  padding: 22px;
`;

const Header = styled.header`
  height: 40px;
  font-size: 1.4em;
  font-family: "NanumEx";
  margin-bottom: 14px;
`;
const Footer = styled.footer`
  height: 28px;

  display: flex;
  justify-content: end;
  > button {
    width: 40px;
    border-radius: 10px;
  }
`;

const UserForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
`;

const ErrorMessage = styled.div`
  font-size: 0.8em;
  height: 16px;
  color: brown;
`;

const InputItem = styled.div`
  height: 20px;
  display: flex;
  margin: 5px 0;

  > span {
    font-size: 1.2em;
    width: 33%;
  }
  > input {
    width: 67%;
    background-color: rgb(0, 0, 0, 0.1);
  }
`;

const InputGenders = styled.div`
  height: 20px;
  display: flex;
  margin: 5px 0;

  > span {
    font-size: 1.2em;
    width: 33%;
  }
`;
const GenderBtnNav = styled.nav`
  width: 67%;
  display: flex;
`;
const GenderBtn = styled.div<{ selected: boolean }>`
  width: 80px;
  margin-right: 3px;
  background-color: ${(props) => (props.selected ? "#ffc72c" : "lightGray")};
  border-radius: 10px;
  text-align: center;
`;

const SubmitBtn = styled.div`
  display: flex;
  height: 10%;
  align-items: flex-end;
  justify-content: space-between;
  > div:first-child {
    display: flex;
  }
`;
const Agree = styled.div`
  display: flex;

  > span {
    margin: 0 7px;
    font-size: 1.1em;
    font-family: "NanumEx";
  }
`;

const Button = styled.button`
  margin-right: 3px;
  background-color: brown;
  color: white;
  width: 56px;
  height: 25px;

  padding: 2px;
  border-radius: 15px;
`;

const CancelBtn = styled.div`
  display: inline-block;
  text-align: center;
  margin-right: 3px;
  background-color: brown;
  color: white;
  width: 56px;
  height: 25px;
  padding: 2px;
  border-radius: 15px;
`;
