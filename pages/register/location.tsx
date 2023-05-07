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

function Location() {
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
    router.push(`/register/major`);
  };

  return (
    <>
      <ProgressLayout value={42} />
      <Header title="회원가입" url="/register/gender" />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>지역을 입력해 주세요</span>
          <span>스터디에 참여 할 지역으로 선택해 주세요.</span>
        </RegisterOverview>
        <ButtonNav>
          <Button
            isSelected={location === "수원"}
            onClick={() => setLocation("수원")}
          >
            수원
          </Button>
          <Button
            isSelected={location === "양천"}
            onClick={() => setLocation("양천")}
          >
            양천 / 당산
          </Button>
          <Button
            isSelected={location === "안양"}
            onClick={() => setLocation("안양")}
          >
            안양
          </Button>
        </ButtonNav>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </>
  );
}

const Layout = styled.div``;

const ButtonNav = styled.nav`
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
`;

const Button = styled.button<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "var(--font-h1)" : "var(--font-h4)")};
  border-radius: var(--border-radius);
  flex: 0.49;
  height: 48px;
  font-size: 13px;
  font-weight: ${(props) => props.isSelected && "600"};
  border: ${(props) =>
    props.isSelected
      ? "1.5px solid var(--font-h1)"
      : "1.5px solid var(--font-h5)"};
`;

export default Location;
