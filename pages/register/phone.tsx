import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Input from "../../components/atoms/Input";
import BottomNav from "../../components/layouts/BottomNav";

import ProgressHeader from "../../components/molecules/headers/ProgressHeader";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import {
  getLocalStorageObj,
  setLocalStorageObj,
} from "../../helpers/storageHelpers";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";

function Phone() {
  const router = useRouter();

  const info = getLocalStorageObj(REGISTER_INFO);

  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(info?.telephone || "");

  const onClickNext = (e) => {
    if (value === "") {
      setErrorMessage("핸드폰 번호를 입력해 주세요.");
      e.preventDefault();
      return;
    }
    if (value.length < 11) {
      setErrorMessage("핸드폰 번호를 확인해 주세요.");
      e.preventDefault();
      return;
    }

    setLocalStorageObj(REGISTER_INFO, { ...info, telephone: value });
  };

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 500);
  }, []);

  return (
    <>
      <ProgressHeader title="회원가입" value={90} />

      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>핸드폰 번호를 작성해 주세요</span>
          <span>해당 번호로 연락을 드리니 정확하게 작성해 주세요.</span>
        </RegisterOverview>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="전화번호를 입력해 주세요."
          inputRef={inputRef}
        />
        {/* <NameInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="전화번호를 입력해 주세요."
        /> */}
      </RegisterLayout>
      <BottomNav onClick={onClickNext} url="/register/fee" />
    </>
  );
}

const Layout = styled(motion.div)`
  height: 100vh;
`;

const NameInput = styled.input`
  margin-top: 40px;
  border: var(--border);
  height: 40px;
  width: 100%;
  border-radius: var(--rounded-lg);
  padding: var(--gap-3);
  ::placeholder {
    font-size: 12px;
    color: var(--gray-4);
  }
  :focus {
    outline-color: var(--gray-1);
  }
`;

export default Phone;
