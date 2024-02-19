import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";

import ProgressHeader from "../../components2/molecules/headers/ProgressHeader";
import { MBTI } from "../../constants/contents/ProfileData";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import {
  getLocalStorageObj,
  setLocalStorageObj,
} from "../../helpers/storageHelpers";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { IUserRegisterFormWriting } from "../../types/user/user";

function Mbti() {
  const router = useRouter();

  const info: IUserRegisterFormWriting = getLocalStorageObj(REGISTER_INFO);

  const [errorMessage, setErrorMessage] = useState("");

  const [mbti, setMbti] = useState(info?.mbti);
  const isProfileEdit = useRecoilValue(isProfileEditState);

  const onClickNext = () => {
    if (!mbti) {
      setErrorMessage("항목을 선택해 주세요.");
      return;
    }
    setLocalStorageObj(REGISTER_INFO, { ...info, mbti });

    router.push(`/register/major`);
  };

  return (
    <>
      <ProgressHeader
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        url="/register/birthday"
        value={50}
      />

      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>MBTI를 선택해 주세요</span>
          <span></span>
        </RegisterOverview>
        <ButtonNav>
          {MBTI?.map((item, idx) => (
            <Button
              key={idx}
              $isSelected={mbti === item}
              onClick={() => setMbti(item)}
            >
              {item}
            </Button>
          ))}
        </ButtonNav>
      </RegisterLayout>
      <BottomNav onClick={() => onClickNext()} />
    </>
  );
}

const ButtonNav = styled.nav`
  margin-top: 40px;
  margin-bottom: var(--gap-2);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-2);
`;

const Button = styled.button<{ $isSelected: boolean }>`
  color: ${(props) => (props.$isSelected ? "var(--gray-1)" : "var(--gray-4)")};
  border-radius: var(--rounded-lg);
  flex: 0.49;
  height: 48px;
  font-size: 14px;
  font-weight: ${(props) => props.$isSelected && "600"};
  border: ${(props) =>
    props.$isSelected ? "var(--border-thick)" : "var(--border)"};
`;

export default Mbti;
