import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import ProgressStatus from "../../components/layouts/ProgressStatus";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { checkIsKorean } from "../../libs/utils/validUtils";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

function Name() {
  const router = useRouter();
  const { data: session } = useSession();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState(registerForm?.name || session?.user.name);

  const onClickNext = () => {
    if (value.length < 2 || value.length > 3) {
      setErrorMessage("2자 이상 입력해 주세요.");
      return;
    }
    if (!checkIsKorean(value)) {
      setErrorMessage("한글로만 입력해 주세요.");
      return;
    }
    setRegisterForm((old) => ({ ...old, name: value }));
    router.push(`/register/gender`);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue(name);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressStatus value={20} />
      <Header title="회원가입" url="location" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>이름을 입력해주세요</span>
          <span>실명으로 작성해주세요!</span>
        </RegisterOverview>
        <NameInput
          value={value}
          onChange={onChange}
          placeholder="이름을 입력해주세요."
        />
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </Layout>
  );
}

const Layout = styled(motion.div)`
  height: 100vh;
`;

const NameInput = styled.input`
  margin-top: 40px;
  border: 1.5px solid var(--font-h5);
  height: 40px;
  width: 100%;
  border-radius: var(--border-radius);
  padding: 12px;
  ::placeholder {
    font-size: 12px;
    color: var(--font-h4);
  }
`;

export default Name;
