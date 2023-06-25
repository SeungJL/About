import { useEffect, useState } from "react";
import styled from "styled-components";
import { MainLoading } from "../../components/ui/MainLoading";
import { useGatherContentQuery } from "../../hooks/gather/queries";

import { GatherCategory, IGatherContent } from "../../types/gather";
import GatherBlock from "./GatherBlock";

interface IGatherMain {
  category: GatherCategory;
}
function GatherMain({ category }: IGatherMain) {
  const [gatherData, setGatherData] = useState<IGatherContent[]>();
  const { data: gatherContentArr, isLoading } = useGatherContentQuery({
    onSuccess() {
      console.log("");
    },
  });

  useEffect(() => {
    if (category === "모집중")
      setGatherData(
        gatherContentArr?.filter((item) => item?.status === "pending")
      );
    if (category === "완료")
      setGatherData(
        gatherContentArr?.filter((item) => item.status !== "pending")
      );
    if (category === "전체") setGatherData(gatherContentArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, gatherContentArr]);

  return (
    <>
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          {gatherData
            ?.slice()
            .reverse()
            .map((data, idx) => (
              <GatherBlock key={idx} data={data} />
            ))}
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div``;

export default GatherMain;
