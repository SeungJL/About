import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import Slide from "../../../components/layout/Slide";
import ButtonCheckNav from "../../../components/templates/ButtonCheckNav";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { sharedGroupWritingState } from "../../../recoil/sharedDataAtoms";
function GroupWritingContent() {
  const router = useRouter();
  const failToast = useFailToast();

  const [Group, setGroup] = useRecoilState(sharedGroupWritingState);

  const [period, setPeriod] = useState(Group?.period || "주 1회");

  //초기 input 세팅

  const onClickNext = () => {
    setGroup((old) => ({
      ...old,
      period,
    }));
    router.push(`/Group/writing/hashTag`);
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
    <Slide>
      <ProgressStatus value={72} />
      <Header title="" url="/Group/writing/content" />
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
    </Slide>
  );
}

const Container = styled.div`
  margin-top: var(--gap-4);
`;

const Content = styled.textarea`
  margin-top: 40px;
  border: var(--border);
  border-radius: var(--rounded-lg);
  height: 200px;
  width: 100%;
  padding: var(--gap-3);
  font-size: 12px;
  :focus {
    outline: none;
    border: var(--border-thick);
  }
`;

export default GroupWritingContent;
