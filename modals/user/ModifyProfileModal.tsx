import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";
import { Toast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { ModalFooterNav, ModalLg, ModalMain } from "../../styles/layout/modal";

import { useRegisterMutation } from "../../hooks/vote/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";

import { IRegisterForm, IUser, IUserRegister } from "../../types/user";

import { useRecoilValue } from "recoil";
import { locationState } from "../../recoil/systemAtoms";
import { ModalHeaderXLine } from "../../components/Layout/Modal";

function ProfileModifyModal({ setIsModal }) {
  const { data: session } = useSession();

  const location = useRecoilValue(locationState);
  const [isMan, setIsMan] = useState(true);

  const user = useUserInfoQuery().data;

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
      location: data.location,
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
      <Layout>
        <ModalHeaderXLine title="프로필 수정" setIsModal={setIsModal} />
        <ModalMain>
          <Form onSubmit={handleSubmit(onValid)} id="modifyProfile">
            <Item>
              <span>이름: </span>
              <span>{session?.user.name}</span>
            </Item>
            <ErrorMessage></ErrorMessage>
            <Item>
              <span>지역: </span>
              <Select
                {...register("location", {
                  required: true,
                  validate: (value) => value === "수원" || value === "양천",
                })}
                defaultValue={location}
              >
                <option value="수원">수원</option>
                <option value="양천">양천구/당산</option>
              </Select>
            </Item>
            <ErrorMessage></ErrorMessage>
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
                <GenderBtn
                  type="button"
                  isSelected={isMan}
                  onClick={() => setIsMan(true)}
                >
                  남성
                </GenderBtn>
                <GenderBtn
                  type="button"
                  isSelected={!isMan}
                  onClick={() => setIsMan(false)}
                >
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
        <ModalFooterNav>
          <button onClick={onCancelBtnClicked}>취소</button>
          <button type="submit" form="modifyProfile">
            제출
          </button>
        </ModalFooterNav>
      </Layout>
    </>
  );
}
export default ProfileModifyModal;

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
const Select = styled.select`
  background-color: var(--font-h7);
`;
const ErrorMessage = styled.div`
  font-size: 11px;
  height: 11px;
  color: var(--color-red);
`;

const Gender = styled.nav`
  flex: 1;
  display: flex;
  align-items: center;
  > button:last-child {
    margin-right: 12px;
  }
`;
const GenderBtn = styled.button<{ isSelected: boolean }>`
  font-size: 12px;
  width: 36px;
  height: 18px;
  background-color: ${(props) =>
    props.isSelected ? "var(--color-red)" : "var(--font-h6)"};
  color: ${(props) => (props.isSelected ? "white" : "var(--font-h1)")};
`;
