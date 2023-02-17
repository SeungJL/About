import dayjs from "dayjs";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { now } from "../libs/utils/dateUtils";
import { BaseModal, FullScreen } from "../styles/LayoutStyles";
import { PrivacyPolicy } from "../storage/PrivacyPolicy";
import { isShowPrivacyPolicyState } from "../recoil/atoms";
import { useSetRecoilState } from "recoil";
import { useRegisterMutation } from "../hooks/registerForm";
import { IUser } from "../models/user";

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
  > input {
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

export interface IUserInfoForm {
  registerDate: string;
  name: string;
  mbti?: string;
  birth: string;
  agree: any;
}

function RegisterFormModal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserInfoForm>({
    defaultValues: {
      registerDate: `${now().format("YYYY-MM-DD")}`,
      name: "",
      mbti: "",
      birth: "",
      agree: "",
    },
  });

  const onValid = (data: IUserInfoForm) => {
    const userInfo = {
      name: data.name,
      registerDate: data.registerDate,
      role: "user",
      isActive: "true",
      birth: data.birth,
      mbti: data.mbti,
    };

    // useRegisterMutation -> useInfo
  };
  const setisShowPrivacy = useSetRecoilState(isShowPrivacyPolicyState);
  return (
    <>
      <ModalLayout>
        <Header>회원가입</Header>
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
              <Button onClick={() => setisShowPrivacy(true)}>약관</Button>
              <Agree>
                <span>동의</span>
                <input
                  type="checkbox"
                  {...register("agree", { required: "필수체크" })}
                />
              </Agree>
            </div>
            <div>
              <Button>취소</Button>
              <Button>제출</Button>
            </div>
          </SubmitBtn>
        </UserForm>
      </ModalLayout>
      <FullScreen />
    </>
  );
}
export default RegisterFormModal;
