import styled from "styled-components";
import { ChangeEvent, EventHandler, useEffect, useState } from "react";
import ProgressLayout from "../../components/layouts/ProgressLayout";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { ChangeHandler, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Location } from "../../types/system";

import { INTEREST_DATA, MESSAGE_DATA } from "../../storage/ProfileData";
import { IInterests, IUser } from "../../types/user";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRegisterQuery, useUserInfoQuery } from "../../hooks/user/queries";
import axios from "axios";
import {
  useApproveMutation,
  useRegisterMutation,
} from "../../hooks/user/mutations";
import { MainLoading } from "../../components/ui/Loading";
import { isProfileEditState } from "../../recoil/interactionAtoms";

function Message() {
  const router = useRouter();
  const { data: session } = useSession();

  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  const isProfileEdit = useRecoilValue(isProfileEditState);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(registerForm?.comment || "");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  const { mutate, isLoading } = useRegisterMutation({
    onSuccess() {
      console.log("register success", registerForm);
    },
    onError(error) {
      console.error(error);
    },
  });
  const { mutate: approve } = useApproveMutation({
    onSuccess() {
      console.log("success");
    },
    onError(err) {
      console.error(err);
    },
  });
  const [index, setIndex] = useState(null);

  const InputIdx = MESSAGE_DATA?.length;

  const onClickNext = async () => {
    if (value === "") {
      setErrorMessage("문장을 선택해 주세요.");
      return;
    }
    let comment = "";
    if (index === InputIdx) comment = value;
    else comment = MESSAGE_DATA[index];

    setRegisterForm((old) => ({ ...old, comment }));

    if (isProfileEdit) {
      await mutate(registerForm);
      // await approve({ uid: session?.uid });
      router.push(`/about`);
    } else {
      router.push(`/register/phone`);
    }
  };

  return (
    <>
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
          <ProgressLayout value={80} />
          <Header title="회원가입" url="/register/interest" />
          <RegisterLayout errorMessage={errorMessage}>
            <RegisterOverview>
              <span>자기 소개 문장을 입력해 주세요</span>
              <span>나를 소개하는 문장을 선택하거나 직접 입력해 주세요.</span>
            </RegisterOverview>
            <Container>
              {MESSAGE_DATA?.map((item, idx) => (
                <Item
                  key={idx}
                  onClick={() => setIndex(idx)}
                  isSelected={idx === index}
                >
                  {item}
                </Item>
              ))}
            </Container>
            <Input
              onClick={() => setIndex(InputIdx)}
              placeholder="직접 입력"
              isSelected={
                index === InputIdx || (index === null && value !== "")
              }
              onChange={onChange}
              value={value}
            />
          </RegisterLayout>
          <BottomNav
            onClick={onClickNext}
            text={session?.isActive ? "완료" : null}
          />
        </Layout>
      )}
    </>
  );
}

const Layout = styled(motion.div)`
  height: 100vh;
`;

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div<{ isSelected: boolean }>`
  width: 100%;

  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  margin-bottom: 12px;
  color: ${(props) => (props.isSelected ? "var(--font-h1)" : "var(--font-h4)")};
  border: ${(props) =>
    props.isSelected
      ? "1.5px solid var(--font-h1)"
      : "1.5px solid var(--font-h6)"};
`;

const Input = styled.input<{ isSelected: boolean }>`
  width: 100%;
  color: ${(props) => (props.isSelected ? "var(--font-h1)" : "var(--font-h4)")};
  border: ${(props) =>
    props.isSelected
      ? "1.5px solid var(--font-h1)"
      : "1.5px solid var(--font-h6)"};
  border-radius: var(--border-radius);
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: inherit;
  align-items: center;
  height: 48px;
  margin-bottom: 12px;

  ::placeholder {
    color: var(--font-h4);
  }
`;

export default Message;
