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
import { Location } from "../../types/system";

function Interest() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(registerFormState);

  const [errorMessage, setErrorMessage] = useState("");
  const [location, setLocation] = useState<Location>(registerForm?.location);

  const onClickNext = () => {
    if (location === null) {
      setErrorMessage("지역을 선택해 주세요.");
      return;
    }
    setRegisterForm((old) => ({ ...old, location }));
    router.push(`/register/birthday`);
  };

  return (
    <>
      <ProgressLayout value={64} />
      <Header title="회원가입" url="/register/gender" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>관심 분야를 선택해 주세요</span>
          <span>동아리에서 하고자 하는 관심 분야를 선택해 주세요.</span>
        </RegisterOverview>
        <Section>
          <SectionTitle>영어</SectionTitle>
          <SectionContent></SectionContent>
        </Section>
      </RegisterLayout>
    </>
  );
}

const Section = styled.section``;

const SectionTitle = styled.span``;

const SectionContent = styled.div``;

const Content = styled.button``;

export default Interest;
