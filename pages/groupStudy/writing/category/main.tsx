import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../../components/layout/BottomNav";
import Header from "../../../../components/layout/Header";
import PageLayout from "../../../../components/layout/PageLayout";

import ProgressStatus from "../../../../components/templates/ProgressStatus";
import {
  GROUP_STUDY_CATEGORY,
  GROUP_STUDY_CATEGORY_ICONS,
} from "../../../../constants/contents/GroupStudyContents";

import { useFailToast } from "../../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../../pagesComponents/register/RegisterOverview";
import { prevPageUrlState } from "../../../../recoil/previousAtoms";
import { sharedGroupStudyWritingState } from "../../../../recoil/sharedDataAtoms";
function WritingStudyCategoryMain() {
  const router = useRouter();
  const failToast = useFailToast();

  const prevPageUrl = useRecoilValue(prevPageUrlState);
  const [groupStudyWriting, setGroupStudyWriting] = useRecoilState(
    sharedGroupStudyWritingState
  );

  const [category, setCategory] = useState<string>(
    groupStudyWriting?.category?.main
  );

  const onClickNext = () => {
    if (!category) {
      failToast("free", "주제를 선택해 주세요!", true);
      return;
    }
    setGroupStudyWriting((old) => ({
      ...old,
      category: { ...old?.category, main: category },
    }));
    router.push(`/groupStudy/writing/category/sub`);
  };

  return (
    <PageLayout>
      <ProgressStatus value={20} />
      <Header title="" url={prevPageUrl || "/gather"} />
      <RegisterLayout>
        <RegisterOverview>
          <span>주제를 선택해 주세요.</span>
        </RegisterOverview>
        <ItemContainer>
          {GROUP_STUDY_CATEGORY.map((type, idx) => (
            <Item
              key={idx}
              isSelected={type === category}
              onClick={() => setCategory(type)}
            >
              <IconWrapper>{GROUP_STUDY_CATEGORY_ICONS[type]}</IconWrapper>
              <Info>{type}</Info>
            </Item>
          ))}
        </ItemContainer>
      </RegisterLayout>
      <BottomNav onClick={onClickNext} />
    </PageLayout>
  );
}

const ItemContainer = styled.div`
  margin-top: var(--margin-max);
  display: flex;
  flex-direction: column;
`;

const Item = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-md);
  height: 60px;
  border-radius: var(--border-radius-sub);
  border: ${(props) =>
    props.isSelected ? "2px solid var(--color-mint)" : "var(--border-main)"};
`;

const IconWrapper = styled.div`
  font-size: 18px;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  > span:first-child {
    font-weight: 600;
  }
  > span:last-child {
    color: var(--font-h3);
    font-size: 12px;
  }
`;

export default WritingStudyCategoryMain;
