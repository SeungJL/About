import styled from "styled-components";
import { ChangeEvent, useEffect, useState } from "react";
import ProgressLayout from "../../components/layouts/ProgressLayout";
import Header from "../../components/layouts/Header";
import RegisterOverview from "../../pagesComponents/Register/RegisterOverview";
import RegisterLayout from "../../pagesComponents/Register/RegisterLayout";
import BottomNav from "../../components/layouts/BottomNav";
import { useRecoilState } from "recoil";
import { registerFormState } from "../../recoil/userAtoms";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { checkIsKorean } from "../../libs/utils/validUtils";

function Phone() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);
  const [errorMessage, setErrorMessage] = useState("");

  const [value, setValue] = useState(registerForm?.phoneNumber || "");

  const onClickNext = () => {
    setRegisterForm({ phoneNumber: value });
    router.push(`/register/finish`);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <ProgressLayout value={80} />
      <Header title="회원가입" url="/message" />
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
    </>
  );
}

const Layout = styled.div``;

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

export default Phone;
