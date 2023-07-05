import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layouts/BottomNav";
import Header from "../../components/layouts/Header";
import ProgressStatus from "../../components/layouts/ProgressStatus";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";

function Phone() {
  const router = useRouter();

  const [registerForm, setRegisterForm] = useRecoilState(
    sharedRegisterFormState
  );
  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState(registerForm?.telephone || "");

  const onClickNext = () => {
    if (value === "") {
      setErrorMessage("핸드폰 번호를 입력해 주세요.");
      return;
    }
    if (value.length < 11) {
      setErrorMessage("핸드폰 번호를 확인해 주세요.");
      return;
    }
    setRegisterForm((old) => ({ ...old, telephone: value }));
    router.push(`/register/fee`);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressStatus value={88} />
      <Header title="회원가입" url="/register/message" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>핸드폰 번호를 작성해 주세요</span>
          <span>해당 번호로 연락을 드리니 정확하게 작성해 주세요.</span>
        </RegisterOverview>
        <NameInput
          value={value}
          onChange={onChange}
          placeholder="전화번호를 입력해 주세요."
        />
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
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
  border-radius: var(--border-radius-sub);
  padding: 12px;
  ::placeholder {
    font-size: 12px;
    color: var(--font-h4);
  }
`;

export default Phone;
