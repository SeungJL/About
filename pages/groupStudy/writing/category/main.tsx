import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../../components/layout/BottomNav";
import Header from "../../../../components/layout/Header";
import PageSlide from "../../../../components/layout/PageSlide";

import ProgressStatus from "../../../../components/templates/ProgressStatus";
import {
  GROUP_STUDY_CATEGORY_ARR,
  GROUP_STUDY_CATEGORY_ARR_ICONS,
} from "../../../../constants/contents/GroupStudyContents";

import { useFailToast } from "../../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../../pageTemplates/register/RegisterOverview";
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
    <PageSlide>
      <ProgressStatus value={14} />
      <Header title="" url={prevPageUrl || "/groupStudy"} />
      <RegisterLayout>
        <RegisterOverview>
          <span>주제를 선택해 주세요.</span>
        </RegisterOverview>
        <ItemContainer>
          {GROUP_STUDY_CATEGORY_ARR.map((type, idx) => (
            <Item
              key={idx}
              isSelected={type === category}
              onClick={() => setCategory(type)}
            >
              <IconWrapper>{GROUP_STUDY_CATEGORY_ARR_ICONS[type]}</IconWrapper>
              <Info>{type}</Info>
            </Item>
          ))}
        </ItemContainer>
      </RegisterLayout>
      <BottomNav onClick={onClickNext} />
    </PageSlide>
  );
}

const ItemContainer = styled.div`
  margin-top: var(--gap-5);
  display: flex;
  flex-direction: column;
`;

const Item = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: var(--gap-2);
  height: 60px;
  background-color: white;
  border-radius: var(--rounded-lg);
  border: ${(props) =>
    props.isSelected ? "2px solid var(--color-mint)" : "var(--border)"};
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
    color: var(--gray-3);
    font-size: 12px;
  }
`;

export default WritingStudyCategoryMain;
