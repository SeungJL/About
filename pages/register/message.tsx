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
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

function Message() {
  const router = useRouter();
  const { data: session } = useSession();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  const [index, setIndex] = useState(null);

  const InputIdx = MESSAGE_DATA?.length;

  const onClickNext = () => {
    if (index === null) setErrorMessage("문장을 선택해 주세요.");
    let message = "";
    if (index === InputIdx) message = value;
    else message = MESSAGE_DATA[index];

    setRegisterForm((old) => ({ ...old, message }));

    if (session?.isActive) {
      router.push(`/about`);
      return;
    }
    router.push(`/register/phone`);
  };

  return (
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
          isSelected={index === InputIdx}
          onChange={onChange}
          value={value}
        />
      </RegisterLayout>
      <BottomNav
        onClick={onClickNext}
        text={session?.isActive ? "완료" : null}
      />
    </Layout>
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
