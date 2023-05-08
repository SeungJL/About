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

function Finish() {
  const router = useRouter();
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

    router.push(`/register/fee`);
  };

  return (
    <>
      <ProgressLayout value={64} />
      <Header title="회원가입" url="/register/interest" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>마무리</span>
          <span>마무리</span>
        </RegisterOverview>
        <Overview>이제 거의 다 끝났어요! </Overview>
        <PhoneNumber>
          <span></span>
        </PhoneNumber>
      </RegisterLayout>
      <BottomNav onClick={onClickNext} />
    </>
  );
}

const Overview = styled.div`
  margin-top: 40px;
`;

const PhoneNumber = styled.div``;

export default Finish;
