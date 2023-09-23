import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import {
  GatherCategoryIcons,
  GATHER_CATEGORY,
} from "../../../constants/contents/GatherContents";
import { useFailToast } from "../../../hooks/CustomToast";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { sharedGatherDataState } from "../../../recoil/sharedDataAtoms";
import { GatherType } from "../../../types/page/gather";

function WritingCategory() {
  const router = useRouter();
  const failToast = useFailToast();

  const prevPageUrl = useRecoilValue(prevPageUrlState);
  const [gatherContent, setGatherContent] = useRecoilState(
    sharedGatherDataState
  );
  const [selectType, setSelectType] = useState<GatherType>(gatherContent?.type);

  useEffect(() => {
    if (!gatherContent) return;
    setSelectType(gatherContent.type);
  }, [gatherContent]);

  const onClickNext = () => {
    if (!selectType) {
      failToast("free", "주제를 선택해 주세요!", true);
      return;
    }
    setGatherContent((old) => ({ ...old, type: selectType }));
    router.push(`/gather/writing/content`);
  };

  return (
    <>
      <PageLayout>
        <ProgressStatus value={25} />
        <Header title="" url={prevPageUrl || "/gather"} />
        <RegisterLayout>
          <RegisterOverview>
            <span>주제를 선택해 주세요.</span>
          </RegisterOverview>
          <ItemContainer>
            {GATHER_CATEGORY?.map((item, idx) => {
              return (
                <Item
                  key={idx}
                  isSelected={item?.title === selectType?.title}
                  onClick={() => setSelectType(item)}
                >
                  <IconWrapper>{GatherCategoryIcons[idx]}</IconWrapper>
                  <Info>
                    <span>{item.title}</span>
                    <span>{item.subtitle}</span>
                  </Info>
                </Item>
              );
            })}
          </ItemContainer>
        </RegisterLayout>
      </PageLayout>
      <BottomNav onClick={() => onClickNext()} />
    </>
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
    props.isSelected ? "var(--border-mint)" : "var(--border-main)"};
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

export default WritingCategory;
