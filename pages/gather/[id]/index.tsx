import { useRecoilState } from "recoil";
import styled from "styled-components";

import dayjs from "dayjs";
import "dayjs/locale/ko"; // 로케일 플러그인 로드
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MainLoading } from "../../../components/ui/MainLoading";
import { useGatherContentQuery } from "../../../hooks/gather/queries";
import GatherBadge from "../../../pagesComponents/gather/detail/GatherBadge";
import GatherBottomNav from "../../../pagesComponents/gather/detail/GatherBottomNav";
import GatherComment from "../../../pagesComponents/gather/detail/GatherComment";
import GatherDetailInfo from "../../../pagesComponents/gather/detail/GatherDetail";
import GatherHeader from "../../../pagesComponents/gather/detail/GatherHeader";
import GatherOrganizer from "../../../pagesComponents/gather/detail/GatherOrganizer";
import GatherParticipation from "../../../pagesComponents/gather/detail/GatherParticipation";
import GatherTitle from "../../../pagesComponents/gather/detail/GatherTitle";
import { transferGatherDataState } from "../../../recoil/transferDataAtoms";

function GatherDetail() {
  const router = useRouter();
  const gatherId = router.query.id;
  const [gatherData, setGatherData] = useRecoilState(transferGatherDataState);
  const [isRefetching, setIsRefetching] = useState(false);
  const { data: gatherContentArr, refetch } = useGatherContentQuery();

  useEffect(() => {
    if (isRefetching || !gatherData) {
      setTimeout(() => {
        refetch();
      }, 1000);
      setGatherData(gatherContentArr?.find((item) => item?.id === gatherId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gatherContentArr, gatherData, gatherId, isRefetching]);

  return (
    <>
      {!gatherData ? (
        <MainLoading />
      ) : (
        <>
          <GatherHeader
            title={gatherData.title}
            date={dayjs(gatherData.date)}
            locationMain={gatherData.location.main}
          />
          <Layout>
            <GatherBadge typeTitle={gatherData.type.title} />
            <GatherOrganizer
              createdAt={gatherData.createdAt}
              organizer={gatherData.user}
            />
            <GatherTitle title={gatherData.title} status={gatherData.status} />
            <GatherDetailInfo data={gatherData} />
            <Content>{gatherData.content}</Content>
            <GatherParticipation data={gatherData} />
            <GatherComment />
            <GatherBottomNav
              data={gatherData}
              setIsRefetching={setIsRefetching}
            />
          </Layout>
        </>
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 0 14px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const Content = styled.p`
  border-top: 1px solid var(--font-h6);
  border-bottom: 1px solid var(--font-h6);
  margin-top: 16px;
  padding-top: 14px;
  min-height: 100px;
`;

export default GatherDetail;
