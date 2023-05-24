import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import ProgressLayout from "../../components/layouts/ProgressLayout";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState, useSetRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { MBTI } from "../../storage/ProfileData";
import { motion } from "framer-motion";

function Mbti() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [errorMessage, setErrorMessage] = useState("");

  const [mbti, setMbti] = useState(registerForm?.mbti);

  const onClickNext = () => {
    if (mbti === "") {
      setErrorMessage("항목을 선택해 주세요.");
      return;
    }
    setRegisterForm((old) => ({ ...old, mbti }));
    router.push(`/register/birthday`);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressLayout value={30} />
      <Header title="회원가입" url="/register/name" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>성별을 입력해 주세요</span>
          <span></span>
        </RegisterOverview>
        <ButtonNav>
          {MBTI?.map((item, idx) => (
            <Button
              key={idx}
              isSelected={mbti === item}
              onClick={() => setMbti(item)}
            >
              {item}
            </Button>
          ))}
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
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

export default Mbti;
