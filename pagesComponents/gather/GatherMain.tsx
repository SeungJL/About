import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { GATHER_ALERT } from "../../constants/keys/localStorage";
import { useErrorToast } from "../../hooks/custom/CustomToast";
import { useGatherAllQuery } from "../../hooks/gather/queries";
import { isGatherLoadingState } from "../../recoil/loadingAtoms";
import { IGather } from "../../types/page/gather";
import { LocationFilterType } from "../../types/system";
import AboutGatherBlock from "../about/main/aboutGather/aboutGatherBlock/AboutGatherBlock";
import GatherBlockSkeleton from "./GatherBlockSkeleton";

interface IGatherMain {
  category: LocationFilterType;
}

function GatherMain({ category }: IGatherMain) {
  const errorToast = useErrorToast();

  const setIsGatherLoading = useSetRecoilState(isGatherLoadingState);

  const [gatherData, setGatherData] = useState<IGather[]>();

  const { data: gatherAll, isLoading } = useGatherAllQuery({
    onError: errorToast,
  });

  useEffect(() => {
    if (isLoading) return;
    const lastGather = gatherAll.slice(-1)[0];
    localStorage.setItem(GATHER_ALERT, String(lastGather.id));
    let filtered = gatherAll;
    if (category !== "전체")
      filtered = gatherAll.filter((item) => {
        const [main, sub] = item.place.split("/");
        return main === category || sub === category || main === "전체";
      });
    setGatherData(filtered);
    setIsGatherLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, gatherAll, isLoading]);

  const gathers = gatherData && [...gatherData].reverse();

  return (
    <Layout>
      {gathers ? (
        <>
          {gathers.map((gather, idx) => (
            <AboutGatherBlock
              key={idx}
              gather={gather}
              isImagePriority={idx < 4}
            />
          ))}
        </>
      ) : (
        <>
          {new Array(6).fill(0).map((_, idx) => (
            <GatherBlockSkeleton key={idx} />
          ))}
        </>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-main);
`;

export default GatherMain;
