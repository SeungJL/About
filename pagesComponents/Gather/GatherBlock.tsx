import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { transferGatherDataState } from "../../recoil/transferDataAtoms";
import { IGatherContent } from "../../types/gather";
import GatherBlockHeader from "./GatherBlock/GatherBlockHeader";
import GatherDetail from "./GatherBlock/GatherDetail";
import GatherMember from "./GatherBlock/GatherMember";

interface IGatherBlock {
  data: IGatherContent;
}

function GatherBlock({ data }: IGatherBlock) {
  const router = useRouter();

  const setGatherData = useSetRecoilState(transferGatherDataState);

  const onClickBlock = () => {
    setGatherData(data);
    router.push(`/gather/${data?.id}`);
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

  border-bottom: 2px solid var(--font-h6);
  padding: 14px;
`;

const Title = styled.div`
  margin: 6px 0;
  font-size: 15px;
  font-weight: 600;
`;
