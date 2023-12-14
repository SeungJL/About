import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ButtonCheckNav from "../../../components/templates/ButtonCheckNav";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { sharedGroupStudyWritingState } from "../../../recoil/sharedDataAtoms";
function GroupStudyWritingContent() {
  const router = useRouter();
  const failToast = useFailToast();

  const [groupStudy, setGroupStudy] = useRecoilState(
    sharedGroupStudyWritingState
  );

  const [period, setPeriod] = useState(groupStudy?.period || "주 1회");

  //초기 input 세팅

  const onClickNext = () => {
    setGroupStudy((old) => ({
      ...old,
      period,
    }));
    router.push(`/groupStudy/writing/condition`);
  };

  const periodArr = [
    "매일",
    "주 1회",
    "주 2회",
    "주 3회",
    "주 4회",
    "주 5회",
    "월 1회",
    "월 2회",
    "월 3회",
    "월 4회",
    "자율",
  ];

  return (
    <PageLayout>
      <ProgressStatus value={84} />
      <Header title="" url="/groupStudy/writing/content" />
      <RegisterLayout>
        <RegisterOverview>
          <span>진행 주기를 체크해주세요!</span>
          <span>나중에 변경할 수 있습니다.</span>
        </RegisterOverview>
        <Container>
          <ButtonCheckNav
            buttonList={periodArr}
            setSelectedButton={setPeriod}
            selectedButton={period}
            isWrap={true}
          />
        </Container>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </PageLayout>
  );
}

const Container = styled.div`
  margin-top: var(--margin-main);
`;

const Content = styled.textarea`
  margin-top: 40px;
  border: var(--border-main);
  border-radius: var(--border-radius-sub);
  height: 200px;
  width: 100%;
  padding: var(--padding-sub);
  font-size: 12px;
  :focus {
    outline: none;
    border: var(--border-focus);
  }
`;

export default GroupStudyWritingContent;
