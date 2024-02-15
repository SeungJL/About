import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import PageSlide from "../../components/layout/PageSlide";
import ProgressStatus from "../../components/templates/ProgressStatus";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import {
  getLocalStorageObj,
  setLocalStorageObj,
} from "../../helpers/storageHelpers";
import { checkIsKorean } from "../../helpers/validHelpers";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { IUserRegisterFormWriting } from "../../types/user/user";

function Name() {
  const router = useRouter();
  const { data: session } = useSession();

  const info: IUserRegisterFormWriting = getLocalStorageObj(REGISTER_INFO);

  const isProfileEdit = useRecoilValue(isProfileEditState);

  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(info?.name || session?.user.name);

  const onClickNext = () => {
    if (value.length < 2 || value.length > 4) {
      setErrorMessage("글자수를 확인해주세요.");
      return;
    }
    if (!checkIsKorean(value)) {
      setErrorMessage("한글로만 입력해 주세요.");
      return;
    }
    setLocalStorageObj(REGISTER_INFO, { ...info, name: value });
    router.push(`/register/gender`);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue(name);
  };

  return (
    <PageSlide>
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
    </PageSlide>
  );
}

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

export default Name;
