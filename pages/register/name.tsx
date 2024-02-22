import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import BottomNav from "../../components/layout/BottomNav";
import Input from "../../components2/atoms/Input";

import ProgressHeader from "../../components2/molecules/headers/ProgressHeader";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import {
  getLocalStorageObj,
  setLocalStorageObj,
} from "../../helpers/storageHelpers";
import { checkIsKorean } from "../../helpers/validHelpers";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";
import { IUserRegisterFormWriting } from "../../types/user/user";

function Name() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const { data: session } = useSession();

  const info: IUserRegisterFormWriting = getLocalStorageObj(REGISTER_INFO);

  const inputRef = useRef(null);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     inputRef.current.focus();
  //   }
  // }, []);

  const isProfileEdit = !!searchParams.get("edit");

  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(info?.name || session?.user.name);

  const onClickNext = (e) => {
    if (value.length < 2 || value.length > 4) {
      setErrorMessage("글자수를 확인해주세요.");
      e.preventDefault();
      return;
    }
    if (!checkIsKorean(value)) {
      setErrorMessage("한글로만 입력해 주세요.");
      e.preventDefault();
      return;
    }
    setLocalStorageObj(REGISTER_INFO, { ...info, name: value });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue(name);
  };

  return (
    <>
      <ProgressHeader
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        value={20}
      />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>이름을 입력해 주세요</span>
          <span>실명으로 작성해주세요!</span>
        </RegisterOverview>
        <Input
          inputRef={inputRef}
          value={value}
          onChange={onChange}
          placeholder="이름을 입력해주세요."
          disabled={isProfileEdit}
        />
      </RegisterLayout>
      <BottomNav onClick={onClickNext} url="/register/gender" />
    </>
  );
}

export default Name;
