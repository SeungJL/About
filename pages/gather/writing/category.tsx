import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageSlide from "../../../components/layout/PageSlide";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import {
  GatherCategoryIcons,
  GATHER_TYPES,
} from "../../../constants/contents/GatherContents";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";

import { IGatherType } from "../../../types/page/gather";

function WritingGatherCategory() {
  const router = useRouter();
  const failToast = useFailToast();

  const prevPageUrl = useRecoilValue(prevPageUrlState);
  const [gatherWriting, setGatherWriting] = useRecoilState(
    sharedGatherWritingState
  );

  const [IGatherType, setIGatherType] = useState<IGatherType>(
    gatherWriting?.type
  );

  const onClickNext = () => {
    if (!IGatherType) {
      failToast("free", "주제를 선택해 주세요!", true);
      return;
    }
    setGatherWriting((old) => ({ ...old, type: IGatherType }));
    router.push(`/gather/writing/content`);
  };

  return (
    <PageSlide>
      <ProgressStatus value={20} />
      <Header title="" url={prevPageUrl || "/gather"} />
      <RegisterLayout>
        <RegisterOverview>
          <span>주제를 선택해 주세요.</span>
        </RegisterOverview>
        <ItemContainer>
          {GATHER_TYPES.map((type, idx) => (
            <Item
              key={idx}
              isSelected={type.title === IGatherType?.title}
              onClick={() => setIGatherType(type)}
            >
              <IconWrapper>{GatherCategoryIcons[idx]}</IconWrapper>
              <Info>
                <span>{type.title}</span>
                <span>{type.subtitle}</span>
              </Info>
            </Item>
          ))}
        </ItemContainer>
      </RegisterLayout>
      <BottomNav onClick={onClickNext} />
    </PageSlide>
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
  background-color: white;
  margin-bottom: var(--margin-md);
  height: 60px;
  border-radius: var(--border-radius-sub);
  border: ${(props) =>
    props.isSelected ? "2px solid var(--color-mint)" : "var(--border-main)"};
`;

const IconWrapper = styled.div`
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

export default WritingGatherCategory;
