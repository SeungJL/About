import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import {
  GatherCategoryIcons,
  GATHER_TYPES,
} from "../../../constants/contents/GatherContents";
import { useFailToast } from "../../../hooks/CustomToast";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";
import { GatherType } from "../../../types/page/gather";

function WritingGatherCategory() {
  const router = useRouter();
  const failToast = useFailToast();

  const [gatherWriting, setGatherWriting] = useRecoilState(
    sharedGatherWritingState
  );

  const [gatherType, setGatherType] = useState<GatherType>(gatherWriting?.type);

  const onClickNext = () => {
    if (!gatherType) {
      failToast("free", "주제를 선택해 주세요!", true);
      return;
    }
    setGatherWriting((old) => ({ ...old, type: gatherType }));
    router.push(`/gather/writing/content`);
  };

  return (
    <PageLayout>
      <ProgressStatus value={25} />
      <Header title="" url="/gather" />
      <RegisterLayout>
        <RegisterOverview>
          <span>주제를 선택해 주세요.</span>
        </RegisterOverview>
        <ItemContainer>
          {GATHER_TYPES.map((type, idx) => (
            <Item
              key={idx}
              isSelected={type.title === gatherType?.title}
              onClick={() => setGatherType(type)}
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
