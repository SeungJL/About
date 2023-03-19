import Image from "next/image";
import styled from "styled-components";

function StudySpaceCover({ src }) {
  return (
    <Layout>
      <Image
        src={`/studySpace/book1.jpg`}
        width={343}
        height={152}
        unoptimized={true}
        alt="studySpace"
      />
      <SpaceIcon>
        <Image
          src={`${src}`}
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
  height: 152px;
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
  left: 16px;
`;

export default StudySpaceCover;
