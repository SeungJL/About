import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { GATHER_ALERT } from "../../constants/keys/localStorage";
import { useErrorToast } from "../../hooks/CustomToast";
import { useGatherContentQuery } from "../../hooks/gather/queries";
import { isGatherLoadingState } from "../../recoil/loadingAtoms";
import { IGatherContent } from "../../types/page/gather";
import { LocationFilterType } from "../../types/system";
import GatherBlock from "./GatherBlock";
import GatherBlockSkeleton from "./GatherBlockSkeleton";

interface IGatherMain {
  category: LocationFilterType;
}
function GatherMain({ category }: IGatherMain) {
  const errorToast = useErrorToast();
  const [gatherData, setGatherData] = useState<IGatherContent[]>();
  const [isGatherLoading, setIsGatherLoading] =
    useRecoilState(isGatherLoadingState);

  const { data: gatherContentArr } = useGatherContentQuery({
    onSuccess(data) {
      const lastGather = data[data.length - 1];
      localStorage.setItem(GATHER_ALERT, String(lastGather.id));
      setIsGatherLoading(false);
    },
    onError: errorToast,
  });

  useEffect(() => {
    if (category === "전체") setGatherData(gatherContentArr);
    else
      setGatherData(
        gatherContentArr?.filter((item) => item.place === category)
      );

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
          {new Array(6).fill(0).map((item, idx) => (
            <GatherBlockSkeleton key={idx} />
          ))}
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div``;

export default GatherMain;
