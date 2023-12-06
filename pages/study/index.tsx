import { useState } from "react";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import ButtonCheckNav from "../../components/templates/ButtonCheckNav";
import CheckBoxNav from "../../components/templates/CheckBoxNav";
import {
  GROUP_STUDY_CATEGORY,
  GROUP_STUDY_SUB_CATEGORY,
} from "../../constants/settingValue/study/GroupStudy";
import GroupStudyBlock from "../../pagesComponents/groupStudy/GroupStudyBlock";

function Index() {
  const [category, setCategory] = useState("전체");
  const [subCategory, setSubCategory] = useState();
  return (
    <Layout>
      <Header title="소모임 그룹" />
      <NavWrapper>
        <ButtonCheckNav
          buttonList={GROUP_STUDY_CATEGORY}
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
        <GroupStudyBlock />
      </Main>
    </Layout>
  );
}

const Layout = styled.div``;

const NavWrapper = styled.div`
  padding: var(--padding-sub) var(--padding-main);
`;

const SubNavWrapper = styled.div``;

const Main = styled.main`
  margin: var(--margin-main);
`;

export default Index;
