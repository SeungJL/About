import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import LocationCategory from "../../components/common/LocationCategory";
import GatherHeader from "../../pagesComponents/gather/GatherHeader";
import GatherMain from "../../pagesComponents/gather/GatherMain";
import GatherReviewNav from "../../pagesComponents/gather/GatherReviewNav";
import { Location } from "../../types/system";

function Gather() {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const [category, setCategory] = useState<Location>("all");

  return (
    <>
      <GatherHeader />
      <Layout>
        <GatherReviewNav />
        <HrDiv />
        <LocationCategory category={category} setCategory={setCategory} />
        <GatherMain category={category} />
        {!isGuest && <WritingIcon url="/gather/writing/category" />}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  position: relative;
`;

const HrDiv = styled.div`
  height: 8px;
  background-color: var(--font-h56);
`;

export default Gather;
