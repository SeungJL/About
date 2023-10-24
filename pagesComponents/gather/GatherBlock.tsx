import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { transferGatherDataState } from "../../recoil/transferDataAtoms";
import { IImagePriority } from "../../types/common";
import { IGather } from "../../types/page/gather";
import GatherBlockHeader from "./gatherBlock/GatherBlockHeader";
import GatherDetail from "./gatherBlock/GatherDetail";
import GatherMember from "./gatherBlock/GatherMember";

interface IGatherBlock extends IImagePriority {
  gather: IGather;
}

function GatherBlock({ gather, isImagePriority }: IGatherBlock) {
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
        />
        <Title>{gather.title}</Title>
        <GatherDetail
          age={gather.age}
          date={gather.date}
          location={gather.place}
        />
        <GatherMember
          organizer={gather.user}
          participants={gather.participants}
          memberCnt={gather.memberCnt}
          isImagePriority={isImagePriority}
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
  margin-top: 2px;
  margin-bottom: var(--margin-min);
  font-size: 15px;
  font-weight: 600;
`;

export default GatherBlock;
