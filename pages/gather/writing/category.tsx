import { useToast } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BottomNav from "../../../components/layouts/BottomNav";
import Header from "../../../components/layouts/Header";
import ProgressStatus from "../../../components/layouts/ProgressStatus";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { sharedGatherDataState } from "../../../recoil/sharedDataAtoms";
import { GatherCategoryIcons, GATHER_CATEGORY } from "../../../storage/Gather";
import { GatherType } from "../../../types/gather";

function WritingCategory() {
  const router = useRouter();
  const toast = useToast();
  const [gatherContent, setGatherContent] = useRecoilState(
    sharedGatherDataState
  );
  const [selectType, setSelectType] = useState<GatherType>(gatherContent?.type);

  const onClickNext = () => {
    if (!selectType) {
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
    setGatherContent((old) => ({ ...old, type: selectType }));
    router.push(`/gather/writing/content`);
  };

  return (
    <Layout initial={{ x: 200 }} animate={{ x: 0 }}>
      <ProgressStatus value={25} />
      <Header title="" url="/gather" />
      <RegisterLayout>
        <RegisterOverview>
          <span>주제를 선택해 주세요.</span>
        </RegisterOverview>
        <ItemContainer>
          {GATHER_CATEGORY?.map((item, idx) => (
            <Item
              key={idx}
              isSelected={item === selectType}
              onClick={() => setSelectType(item)}
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

const Layout = styled(motion.div)`
  height: 100vh;
`;

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
