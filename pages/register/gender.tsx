import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import ProgressStatus from "../../components/layout/ProgressStatus";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";

import { Gender } from "../../types/user/user";

function Gender() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(
    sharedRegisterFormState
  );
  const isProfileEdit = useRecoilValue(isProfileEditState);

  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState<Gender>(registerForm?.gender);

  const onClickNext = () => {
    if (!gender) {
      setErrorMessage("성별을 선택해 주세요.");
      return;
    }
    setRegisterForm((old) => ({ ...old, gender }));
    router.push(`/register/birthday`);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressStatus value={30} />
      <Header
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        url="/register/name"
      />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>성별을 입력해 주세요</span>
          <span></span>
        </RegisterOverview>
        <ButtonNav>
          <Button
            isSelected={gender === "남성"}
            onClick={() => setGender("남성")}
          >
            남성
          </Button>
          <Button
            isSelected={gender === "여성"}
            onClick={() => setGender("여성")}
          >
            여성
          </Button>
        </ButtonNav>
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </Layout>
  );
}

const Layout = styled(motion.div)`
  height: 100vh;
`;

const ButtonNav = styled.nav`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "var(--font-h1)" : "var(--font-h4)")};
  border-radius: var(--border-radius-sub);
  flex: 0.49;
  height: 48px;
  font-size: 14px;
  font-weight: ${(props) => props.isSelected && "600"};
  border: ${(props) =>
    props.isSelected ? "1.5px solid var(--font-h1)" : "var(--border-main)"};
`;

export default Gender;
