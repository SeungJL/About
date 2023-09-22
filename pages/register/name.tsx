import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import PageLayout from "../../components/layout/PageLayout";
import ProgressStatus from "../../components/layout/ProgressStatus";
import { checkIsKorean } from "../../helpers/validHelpers";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";

function Name() {
  const router = useRouter();
  const { data: session } = useSession();

  const isProfileEdit = useRecoilValue(isProfileEditState);
  const [registerForm, setRegisterForm] = useRecoilState(
    sharedRegisterFormState
  );

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
    <PageLayout>
      <ProgressStatus value={20} />
      <Header
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        url="/register/location"
      />
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
    </PageLayout>
  );
}

const NameInput = styled.input`
  margin-top: 40px;
  border: var(--border-main);
  height: 40px;
  width: 100%;
  border-radius: var(--border-radius-sub);
  padding: var(--padding-sub);
  ::placeholder {
    font-size: 12px;
    color: var(--font-h4);
  }
  :focus {
    outline-color: var(--font-h1);
  }
`;

export default Name;
