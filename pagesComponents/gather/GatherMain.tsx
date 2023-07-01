import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DEFAULT_ARRAY } from "../../constants/default";
import { useGatherContentQuery } from "../../hooks/gather/queries";
import { isGatherLoadingState } from "../../recoil/loadingAtoms";

import { GatherCategory, IGatherContent } from "../../types/gather";
import GatherBlock from "./GatherBlock";
import GatherSkeletonBlock from "./GatherInitialBlock";

interface IGatherMain {
  category: GatherCategory;
}
function GatherMain({ category }: IGatherMain) {
  const [gatherData, setGatherData] = useState<IGatherContent[]>();
  const [isGatherLoading, setIsGatherLoading] =
    useRecoilState(isGatherLoadingState);

  const { data: gatherContentArr, refetch } = useGatherContentQuery({
    onSuccess() {
      setIsGatherLoading(false);
    },
    onError(err) {
      console.error(err);
    },
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {!isGatherLoading ? (
        <Layout>
          {gatherData
            ?.slice()
            .reverse()
            .map((data, idx) => (
              <GatherBlock key={idx} data={data} />
            ))}
        </Layout>
      ) : (
        <Layout>
          {DEFAULT_ARRAY.map((item) => (
            <GatherSkeletonBlock key={item} />
          ))}
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div``;

export default GatherMain;
