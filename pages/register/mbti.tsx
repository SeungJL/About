import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import ProgressStatus from "../../components/templates/ProgressStatus";
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
    <PageLayout>
      <ProgressStatus value={50} />
      <Header
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        url="/register/birthday"
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
    </PageLayout>
  );
}

const Layout = styled(motion.div)`
  height: 100vh;
`;

const ButtonNav = styled.nav`
  margin-top: 40px;
  margin-bottom: var(--margin-md);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--margin-md);
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

export default Mbti;
