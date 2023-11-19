import Image from "next/image";
import styled from "styled-components";
import { SQUARE_RANDOM_IMAGE } from "../../../constants/image/imageUrl";

interface IStudySpaceCover {
  coverImageUrl: string;
  logoImageUrl: string;
}

function StudySpaceCover({ coverImageUrl, logoImageUrl }: IStudySpaceCover) {
  return (
    <Layout>
      <ImageWrapper>
        <Image
          src={coverImageUrl || SQUARE_RANDOM_IMAGE[0]}
          layout="fill"
          alt="studySpace"
          priority={true}
        />
      </ImageWrapper>
      <SpaceIcon>
        <Image src={`${logoImageUrl}`} width={72} height={72} alt="spaceIcon" />
      </SpaceIcon>
    </Layout>
  );
}

const Layout = styled.div`
  position: relative;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/1;
`;

const SpaceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: var(--border-radius-main);
  position: absolute;
  border: var(--border-main-light);
  overflow: hidden;
  bottom: -20px;
  left: 20px;
  background-color: white;
`;

export default StudySpaceCover;
