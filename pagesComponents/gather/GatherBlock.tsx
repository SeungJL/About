import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { transferGatherDataState } from "../../recoil/transferDataAtoms";
import { IGather } from "../../types/page/gather";
import GatherBlockHeader from "./gatherBlock/GatherBlockHeader";
import GatherDetail from "./gatherBlock/GatherDetail";
import GatherMember from "./gatherBlock/GatherMember";

interface IGatherBlock {
  gather: IGather;
}

function GatherBlock({ gather }: IGatherBlock) {
  const router = useRouter();

  const setGatherData = useSetRecoilState(transferGatherDataState);

  const onClickBlock = () => {
    setGatherData(gather);
    router.push(`/gather/${gather.id}`);
  };

  return (
    <Layout onClick={onClickBlock}>
      <Container>
        <GatherBlockHeader
          status={gather.status}
          typeTitle={gather.type.title}
          locationMain={gather.location.main}
          openLocation={gather.place}
        />
        <Title>{gather.title}</Title>
        <GatherDetail age={gather.age} date={gather.date} />
        <GatherMember
          organizer={gather.user}
          participants={gather.participants}
          memberCnt={gather.memberCnt}
        />
      </Container>
    </Layout>
  );
}

const Layout = styled.div`
  border-bottom: var(--border-main-light);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
`;

const Title = styled.div`
  margin: var(--margin-min) 0;
  font-size: 15px;
  font-weight: 600;
`;

export default GatherBlock;
