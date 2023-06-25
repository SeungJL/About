import { useState } from "react";
import styled from "styled-components";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import Seo from "../../components/Seo";
import GatherCategoryBar from "../../pagesComponents/Gather/GatgerCategoryBar";
import GatherHeader from "../../pagesComponents/Gather/GatherHeader";
import GatherMain from "../../pagesComponents/Gather/GatherMain";
import GatherReviewNav from "../../pagesComponents/Gather/GatherReviewNav";
import { GatherCategory } from "../../types/gather";

function Gather() {
  const [category, setCategory] = useState<GatherCategory>("전체");

  return (
    <>
      <Seo title="모임" />
      <GatherHeader />
      <Layout>
        <GatherReviewNav />
        <GatherCategoryBar category={category} setCategory={setCategory} />
        <GatherMain category={category} />
        <WritingIcon url="/gather/writing/category" />
      </Layout>
    </>
  );
}

const Layout = styled.div`
  position: relative;
`;

export default Gather;
