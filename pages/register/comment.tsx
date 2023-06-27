import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layouts/BottomNav";
import Header from "../../components/layouts/Header";
import ProgressStatus from "../../components/layouts/ProgressStatus";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { MainLoading } from "../../components/common/MainLoading";
import {
  useUserApproveMutation,
  useUserRegisterMutation,
} from "../../hooks/user/mutations";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";
import { MESSAGE_DATA } from "../../storage/ProfileData";

function Message() {
  const router = useRouter();
  const { data: session } = useSession();

  const [registerForm, setRegisterForm] = useRecoilState(
    sharedRegisterFormState
  );
  const [isProfileEdit, setIsProfileEdit] = useRecoilState(isProfileEditState);
  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(registerForm?.comment || "");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target?.value);
  };

  const { mutate, isLoading } = useUserRegisterMutation();

  const { mutate: approve } = useUserApproveMutation();
  const [index, setIndex] = useState(null);

  const InputIdx = MESSAGE_DATA?.length;

  const onClickNext = async () => {
    if (index === null && value === "") {
      setErrorMessage("문장을 선택해 주세요.");
      return;
    }
    let tempComment = "";
    if (index === InputIdx) tempComment = value;
    else tempComment = MESSAGE_DATA[index];

    await setRegisterForm((old) => ({ ...old, comment: tempComment }));

    if (isProfileEdit) {
      setIsProfileEdit(false);
      await mutate({ ...registerForm, comment: tempComment });
      await setTimeout(() => {
        approve(session?.uid as string);
      }, 1000);
      await router.push(`/about`);
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
          <ProgressStatus value={80} />
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
