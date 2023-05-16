import { Icon, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layouts/BottomNav";
import Header from "../../../components/layouts/Header";
import ProgressLayout from "../../../components/layouts/ProgressLayout";
import RegisterLayout from "../../../pagesComponents/Register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/Register/RegisterOverview";
import { gatherContentState } from "../../../recoil/contentsAtoms";
import { GatherCategoryIcons, GATHER_CATEGORY } from "../../../storage/Gather";
import { GatherCategory, IGatherContent } from "../../../types/gather";

function WritingCategory() {
  const router = useRouter();
  const toast = useToast();
  const setGatherContent = useSetRecoilState(gatherContentState);
  const [selectCategory, setSelectCategory] = useState<GatherCategory>();

  const onClickNext = () => {
    if (!selectCategory) {
      toast({
        title: "진행 불가",
        description: `주제를 선택해 주세요!`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setGatherContent((old) => ({ ...old, category: selectCategory }));
    router.push(`/gather/writing/content`);
  };

  return (
    <Layout>
      <ProgressLayout value={11} />
      <Header title="" url="/gather" />
      <RegisterLayout>
        <RegisterOverview>
          <span>주제를 선택해 주세요.</span>
        </RegisterOverview>
        <ItemContainer>
          {GATHER_CATEGORY?.map((item, idx) => (
            <Item
              key={idx}
              isSelected={item === selectCategory}
              onClick={() => setSelectCategory(item)}
            >
              <IconWrapper>{GatherCategoryIcons[idx]}</IconWrapper>
              <Info>
                <span>{item.title}</span>
                <span>{item.subtitle}</span>
              </Info>
            </Item>
          ))}
        </ItemContainer>
        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </Layout>
  );
}

const Layout = styled.div``;

const ItemContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  height: 60px;
  border-radius: var(--border-radius);
  border: ${(props) =>
    props.isSelected
      ? "1.5px solid var(--color-mint)"
      : "1.5px solid  var(--font-h6)"};
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
