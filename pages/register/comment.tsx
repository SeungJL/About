import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import ProgressStatus from "../../components/templates/ProgressStatus";
import RegisterLayout from "../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../pageTemplates/register/RegisterOverview";

import { useSession } from "next-auth/react";
import PageLayout from "../../components/layout/PageLayout";
import { MESSAGE_DATA } from "../../constants/contents/ProfileData";
import { REGISTER_INFO } from "../../constants/keys/localStorage";
import { USER_INFO } from "../../constants/keys/queryKeys";
import {
  getLocalStorageObj,
  setLocalStorageObj,
} from "../../helpers/storageHelpers";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import { useCompleteToast } from "../../hooks/custom/CustomToast";
import { useUserInfoMutation } from "../../hooks/user/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { isProfileEditState } from "../../recoil/previousAtoms";

function Comment() {
  const completeToast = useCompleteToast();
  const router = useRouter();
  const { data: session } = useSession();

  const info = getLocalStorageObj(REGISTER_INFO);
  const [isProfileEdit, setIsProfileEdit] = useRecoilState(isProfileEditState);

  const [errorMessage, setErrorMessage] = useState("");
  const [value, setValue] = useState(info?.comment || "");
  const [index, setIndex] = useState(null);

  const resetQueryData = useResetQueryData();

  const { data: userInfo } = useUserInfoQuery({ enabled: isProfileEdit });
  const { mutate: updateUserInfo } = useUserInfoMutation({
    onSuccess() {
      setLocalStorageObj(REGISTER_INFO, null);
      resetQueryData(USER_INFO);
      completeToast("free", "변경되었습니다.");
      router.push(`/home`);
    },
  });

  const InputIdx = MESSAGE_DATA?.length;

  const onClickNext = () => {
    if (index === null && value === "") {
      setErrorMessage("문장을 선택해 주세요.");
      return;
    }
    let tempComment = "";
    if (index === InputIdx || index === null) tempComment = value;
    else tempComment = MESSAGE_DATA[index];

    setLocalStorageObj(REGISTER_INFO, { ...info, comment: tempComment });

    if (isProfileEdit) {
      setIsProfileEdit(false);
      updateUserInfo({
        ...userInfo,
        ...info,
        comment: tempComment,
      });
    } else router.push(`/register/phone`);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (index === null && value !== "") inputRef.current.focus();
  }, [index, value]);

  return (
    <PageLayout>
      <ProgressStatus value={80} />
      <Header
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        url="/register/interest"
      />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>자기 소개 문장을 입력해 주세요</span>
          <span>나를 소개하는 문장을 선택하거나 직접 입력해 주세요.</span>
        </RegisterOverview>
        <Container>
          {MESSAGE_DATA?.map((item, idx) => (
            <Item
              key={idx}
              onClick={() => setIndex(idx)}
              $isSelected={idx === index}
            >
              {item}
            </Item>
          ))}
        </Container>
        <Input
          onClick={() => setIndex(InputIdx)}
          placeholder="직접 입력"
          ref={inputRef}
          onChange={(e) => setValue(e.target?.value)}
          value={value}
        />
      </RegisterLayout>
      <BottomNav onClick={onClickNext} text={isProfileEdit ? "완료" : null} />
    </PageLayout>
  );
}

const Container = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div<{ $isSelected: boolean }>`
  width: 100%;
  border-radius: var(--border-radius-sub);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  margin-bottom: var(--margin-sub);
  color: ${(props) =>
    props.$isSelected ? "var(--font-h1)" : "var(--font-h4)"};
  border: ${(props) =>
    props.$isSelected ? "var(--border-thick)" : "1.5px solid var(--font-h6)"};
`;

const Input = styled.input`
  width: 100%;
  color: var(--font-h4);
  border: 1.5px solid var(--font-h6);
  border-radius: var(--border-radius-sub);
  display: flex;
  justify-content: center;
  text-align: center;
  background-color: inherit;
  align-items: center;
  height: 48px;
  margin-bottom: var(--margin-sub);

  ::placeholder {
    color: var(--font-h4);
  }
  :focus {
    outline-color: var(--font-h1);
  }
`;

export default Comment;
