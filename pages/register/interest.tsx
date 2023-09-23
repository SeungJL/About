import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../components/layout/BottomNav";
import Header from "../../components/layout/Header";
import ProgressStatus from "../../components/templates/ProgressStatus";
import RegisterLayout from "../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../pagesComponents/register/RegisterOverview";

import PageLayout from "../../components/layout/PageLayout";
import { INTEREST_DATA } from "../../constants/contents/ProfileData";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { sharedRegisterFormState } from "../../recoil/sharedDataAtoms";

function Interest() {
  const router = useRouter();
  const [registerForm, setRegisterForm] = useRecoilState(
    sharedRegisterFormState
  );

  const [errorMessage, setErrorMessage] = useState("");

  const [firstValue, setFirstValue] = useState(
    registerForm?.interests?.first || ""
  );
  const [secondValue, setSecondValue] = useState(
    registerForm?.interests?.second || ""
  );

  const isProfileEdit = useRecoilValue(isProfileEditState);

  const onChange = (event: ChangeEvent<HTMLInputElement>, isFirst) => {
    const value = event?.target.value;
    if (isFirst) setFirstValue(value);
    else setSecondValue(value);
  };
  const onClickNext = () => {
    if (firstValue === "") {
      setErrorMessage("관심사를 작성해 주세요.");
      return;
    }
    setRegisterForm((old) => ({
      ...old,
      interests: { first: firstValue, second: secondValue },
    }));
    router.push(`/register/comment`);
  };

  return (
    <PageLayout>
      <ProgressStatus value={70} />
      <Header
        title={!isProfileEdit ? "회원가입" : "프로필 수정"}
        url="/register/major"
      />
      <RegisterLayout errorMessage={errorMessage}>
        <RegisterOverview>
          <span>관심 분야를 선택해 주세요</span>
          <span>스터디에서 하고자 하는 관심 분야를 작성해 주세요.</span>
        </RegisterOverview>
        <Container>
          <Example>
            <span>예시</span>
            <div>
              {INTEREST_DATA?.map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
            </div>
          </Example>
          <Item>
            <span>첫번째 관심사</span>
            <Input
              placeholder="1번 입력"
              value={firstValue}
              onChange={(e) => onChange(e, true)}
            />
          </Item>
          <Item>
            <span>두번째 관심사 (선택)</span>
            <Input
              placeholder="2번 입력"
              value={secondValue}
              onChange={(e) => onChange(e, false)}
            />
          </Item>
        </Container>
      </RegisterLayout>
      <BottomNav onClick={onClickNext} />
    </PageLayout>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    margin-bottom: var(--margin-max);
    > span {
      display: inline-block;
      color: var(--font-h1);
      font-weight: 600;
      font-size: 12px;
      margin-bottom: var(--margin-md);
    }
  }
`;

const Example = styled.div`
  margin-top: var(--margin-main);

  > div {
    color: var(--font-h3);
    padding: var(--padding-min);
    background-color: var(--font-h7);
    border: 1px solid var(--font-h6);
    border-radius: var(--border-radius-sub);
    display: flex;
    flex-wrap: wrap;
    > span {
      font-size: 12px;
      margin-right: 6px;
      line-height: var(--line-height);
    }
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: var(--padding-sub) var(--padding-md);
  border: 1px solid var(--font-h6);
  background-color: var(--font-h7);
  border-radius: var(--border-radius-sub);
  ::placeholder {
    color: var(--font-h4);
  }
  :focus {
    outline-color: var(--font-h1);
  }
`;

export default Interest;
