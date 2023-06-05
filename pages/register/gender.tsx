import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import ProgressStatus from "../../components/layouts/ProgressStatus";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState, useSetRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Gender } from "../../types/user";
import { motion } from "framer-motion";

function Gender() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState<Gender>(registerForm?.gender);

  const onClickNext = () => {
    if (!gender) {
      setErrorMessage("성별을 선택해 주세요.");
      return;
    }
    setRegisterForm((old) => ({ ...old, gender }));
    router.push(`birthday`);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressStatus value={30} />
      <Header title="회원가입" url="name" />
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
  border-radius: var(--border-radius);
  flex: 0.49;
  height: 48px;
  font-size: 14px;
  font-weight: ${(props) => props.isSelected && "600"};
  border: ${(props) =>
    props.isSelected
      ? "1.5px solid var(--font-h1)"
      : "1.5px solid var(--font-h5)"};
`;

export default Gender;
