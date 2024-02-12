import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import PageSlide from "../../components/layout/PageSlide";
import ProgressStatus from "../../components/templates/ProgressStatus";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import { setLocalStorageObj } from "../../helpers/storageHelpers";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";

import { Gender, IUserRegisterFormWriting } from "../../types/user/user";

function Gender() {
  const router = useRouter();

  const info: IUserRegisterFormWriting = JSON.parse(
    localStorage.getItem(REGISTER_INFO)
  );

  const isProfileEdit = useRecoilValue(isProfileEditState);

  const [errorMessage, setErrorMessage] = useState("");
  const [gender, setGender] = useState<Gender>(info?.gender);

  const onClickNext = () => {
    if (!gender) {
      setErrorMessage("성별을 선택해 주세요.");
      return;
    }
    setLocalStorageObj(REGISTER_INFO, { ...info, gender });
    router.push(`/register/birthday`);
  };

  return (
    <PageSlide>
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
            $isSelected={gender === "남성"}
            onClick={() => setGender("남성")}
          >
            남성
          </Button>
          <Button
            $isSelected={gender === "여성"}
            onClick={() => setGender("여성")}
          >
            여성
          </Button>
        </ButtonNav>
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </PageSlide>
  );
}

const ButtonNav = styled.nav`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button<{ $isSelected: boolean }>`
  color: ${(props) =>
    props.$isSelected ? "var(--font-h1)" : "var(--font-h4)"};
  border-radius: var(--border-radius-sub);
  flex: 0.49;
  height: 48px;
  font-size: 14px;
  font-weight: ${(props) => props.$isSelected && "600"};
  border: ${(props) =>
    props.$isSelected ? "var(--border-thick)" : "var(--border-main)"};
`;

export default Gender;
