import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import Header from "../../components/layout/Header";
import ButtonCheckNav from "../../components/templates/ButtonCheckNav";
import CheckBoxNav from "../../components/templates/CheckBoxNav";
import {
  GROUP_STUDY_CATEGORY,
  GROUP_STUDY_SUB_CATEGORY,
} from "../../constants/contents/GroupStudyContents";
import { useGroupStudyAllQuery } from "../../hooks/groupStudy/queries";
import GroupStudyBlock from "../../pagesComponents/groupStudy/GroupStudyBlock";
import { isGuestState } from "../../recoil/userAtoms";
import { IGroupStudy } from "../../types/page/groupStudy";

function Index() {
  const isGuest = useRecoilValue(isGuestState);

  const [groupStudies, setGroupStudies] = useState<IGroupStudy[]>();
  const [category, setCategory] = useState("전체");
  const [subCategory, setSubCategory] = useState();

  const [isRuleModal, setIsRuleModal] = useState(false);

  const { data: groupStudyAll, isLoading } = useGroupStudyAllQuery();

  useEffect(() => {
    if (isLoading) return;
    const filtered =
      category === "전체"
        ? groupStudyAll
        : groupStudyAll.filter((item) => item.category.main === category);
    setGroupStudies(filtered);
  }, [category, groupStudyAll, isLoading]);
  console.log(4, groupStudies);
  return (
    <>
      <Layout>
        <Header title="소모임 그룹">
          <RuleIcon setIsModal={setIsRuleModal} />
        </Header>
        <NavWrapper>
          <ButtonCheckNav
            buttonList={["전체", ...GROUP_STUDY_CATEGORY]}
            selectedButton={category}
            setSelectedButton={setCategory}
            isLineBtn={true}
          />
        </NavWrapper>
        <SubNavWrapper>
          <CheckBoxNav
            buttonList={GROUP_STUDY_SUB_CATEGORY[category]}
            selectedButton={subCategory}
            setSelectedButton={setSubCategory}
          />
        </SubNavWrapper>
        <Main>
          {groupStudies?.map((groupStudy) => (
            <GroupStudyBlock groupStudy={groupStudy} key={groupStudy.id} />
          ))}
        </Main>
      </Layout>
      {!isGuest && <WritingIcon url="/groupStudy/writing/category/main" />}
    </>
  );
}

const Layout = styled.div`
  min-height: 100vh;
  background-color: var(--font-h8);
`;

const NavWrapper = styled.div`
  padding: var(--padding-sub) var(--padding-main);
`;

const SubNavWrapper = styled.div``;

const Main = styled.main`
  margin: var(--margin-main);
`;

export default Index;
