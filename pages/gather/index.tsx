import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import Seo from "../../components/Seo";
import GatherCategoryBar from "../../pagesComponents/Gather2/GatgerCategoryBar";
import GatherHeader from "../../pagesComponents/Gather2/GatherHeader";
import GatherMain from "../../pagesComponents/Gather2/GatherMain";
import GatherReviewNav from "../../pagesComponents/Gather2/GatherReviewNav";
import { GatherCategory } from "../../types/gather";

function Gather() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const [category, setCategory] = useState<GatherCategory>("전체");

  return (
    <>
      <Seo title="모임" />
      <GatherHeader />
      <Layout>
        <GatherReviewNav />
        <GatherCategoryBar category={category} setCategory={setCategory} />
        <GatherMain category={category} />
        {!isGuest && <WritingIcon url="/gather/writing/category" />}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  position: relative;
`;

export default Gather;
