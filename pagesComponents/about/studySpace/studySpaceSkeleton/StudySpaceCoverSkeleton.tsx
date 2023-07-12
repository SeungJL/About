import Image from "next/image";
import styled from "styled-components";
import Skeleton from "../../../../components/common/skeleton/Skeleton";

interface IStudySpaceCoverSkeleton {
  coverImageUrl: string;
}

function StudySpaceCoverSkeleton({ coverImageUrl }: IStudySpaceCoverSkeleton) {
  return (
    <Layout>
      <Image
        src={coverImageUrl}
        width={343}
        height={165}
        unoptimized={true}
        alt="studySpace"
      />
      <SpaceIcon>
        <Skeleton>temp</Skeleton>
      </SpaceIcon>
    </Layout>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  height: 165px;
  position: relative;
`;

const SpaceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 18px;
  position: absolute;
  border: 1px solid var(--font-h5);
  overflow: hidden;
  bottom: -24px;
  left: 12px;
  background-color: white;
`;

export default StudySpaceCoverSkeleton;
