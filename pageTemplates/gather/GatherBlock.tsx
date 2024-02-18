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
      <UpPart>
        <GatherBlockHeader
          status={gather.status}
          typeTitle={gather.type.title}
        />
        <Title>{gather.title}</Title>
      </UpPart>
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
        isAdminOpen={gather.isAdminOpen}
      />
    </Layout>
  );
}

const Layout = styled.div`
  margin-bottom: var(--gap-3);
  background-color: white;
  border-radius: var(--rounded);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
`;

const UpPart = styled.div`
  padding: var(--gap-3) var(--gap-4);
  border-bottom: var(--border);
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export default GatherBlock;
