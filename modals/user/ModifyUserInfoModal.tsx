import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ModalLg, ModalXL } from "../../styles/LayoutStyles";
import { useState } from "react";
import { Toast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRegisterMutation } from "../../hooks/vote/mutations";
import { useActiveQuery } from "../../hooks/user/queries";
import { IRegisterForm, IUser, IUserRegister } from "../../types/user";

function ModifyUserInfoModal({ setIsModal }) {
  const [isMan, setIsMan] = useState(true);

  const { data: session } = useSession();

  const user = useActiveQuery().data;

  const { mutate: handleRegister, isLoading: isRegisterLoading } =
    useRegisterMutation({
      onSuccess: async (data: IUser) => {
        session.user.name = data.name;
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
      name: data.name,
      registerDate: data.registerDate,
      birth: data.birth,
      mbti: data.mbti,
      gender: isMan ? "남성" : "여성",
    };

    handleRegister(userInfo);
    setIsModal(false);
  };

  const onCancelBtnClicked = () => {
    setIsModal(false);
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
            <CancelBtn onClick={onCancelBtnClicked}>취소</CancelBtn>
            <SubmitButton type="submit">제출</SubmitButton>
          </SubmitBtn>
        </UserForm>
      </ModalLayout>
    </>
  );
}
export default ModifyUserInfoModal;

const ModalLayout = styled(ModalXL)`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  height: 40px;
  font-size: 18px;
  margin-bottom: 14px;
  font-weight: 600;
`;

const UserForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
`;

const ErrorMessage = styled.div`
  font-size: 11px;
  height: 16px;
  color: var(--color-red);
`;

const InputItem = styled.div`
  height: 20px;
  display: flex;
  margin: 5px 0;

  > span {
    font-size: 15px;
    width: 28%;
  }
  > input {
    width: 70%;
    background-color: var(--font-h6);
  }
`;

const InputGenders = styled.div`
  height: 20px;
  display: flex;
  margin: 5px 0;

  > span {
    font-size: 15px;
    width: 28%;
  }
`;
const GenderBtnNav = styled.nav`
  width: 67%;
  display: flex;
`;
const GenderBtn = styled.div<{ selected: boolean }>`
  width: 80px;
  margin-right: 3px;
  background-color: ${(props) =>
    props.selected ? "var(--color-red)" : "var(--font-h5)"};
  color: ${(props) => (props.selected ? "white" : "var(--font-h1)")};
  border-radius: 10px;
  text-align: center;
`;

const SubmitBtn = styled.div`
  display: flex;
  height: 10%;
  align-items: flex-end;
  justify-content: end;
`;

const SubmitButton = styled.button`
  margin-right: 3px;
  background-color: var(--color-red);
  color: white;
  width: 56px;
  height: 25px;

  border-radius: 15px;
`;

const CancelBtn = styled.div`
  display: inline-block;
  text-align: center;
  margin-right: 3px;
  font-weight: 600;
  font-size: 15px;
  margin-right: 24px;
  color: var(--color-red);
`;
