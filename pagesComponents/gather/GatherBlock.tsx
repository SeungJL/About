import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { transferGatherDataState } from "../../recoil/transferDataAtoms";
import { IGatherContent } from "../../types/page/gather";
import GatherBlockHeader from "./gatherBlock/GatherBlockHeader";
import GatherDetail from "./gatherBlock/GatherDetail";
import GatherMember from "./gatherBlock/GatherMember";

interface IGatherBlock {
  data: IGatherContent;
}

function GatherBlock({ data }: IGatherBlock) {
  const router = useRouter();

  const setGatherData = useSetRecoilState(transferGatherDataState);

  const onClickBlock = () => {
    setGatherData(data);
    router.push(`/gather/${data.id}`);
  };

  return (
    <>
      {data && (
        <Layout onClick={onClickBlock}>
          <GatherBlockHeader
            status={data.status}
            typeTitle={data.type.title}
            locationMain={data.location.main}
          />
          <Title>{data.title}</Title>
          <GatherDetail age={data.age} date={data.date} />
          <GatherMember
            organizer={data.user}
            participants={data.participants}
            memberCnt={data.memberCnt}
          />
        </Layout>
      )}
    </>
  );
}

export default GatherBlock;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: var(--border-main-light);
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
`;

const Title = styled.div`
  margin: var(--margin-min) 0;
  font-size: 15px;
  font-weight: 600;
`;
