import Image from "next/image";
import styled from "styled-components";

interface IStudySpaceCover {
  coverImageUrl: string;
  logoImageUrl: string;
}

function StudySpaceCover({ coverImageUrl, logoImageUrl }: IStudySpaceCover) {
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
        <Image
          src={`${logoImageUrl}`}
          width={70}
          height={70}
          unoptimized={true}
          alt="spaceIcon"
        />
      </SpaceIcon>
    </Layout>
  );
}

const Layout = styled.div`
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

export default StudySpaceCover;
