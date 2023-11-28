import Image from "next/image";
import styled from "styled-components";
import { StudySpaceLogo } from "../../../components/utils/CustomImages";
import { SQUARE_RANDOM_IMAGE } from "../../../constants/image/imageUrl";
import { STUDY_CAFE_LOGO } from "../../../constants/settingValue/study/StudyCafeLogo";
import { IPlace } from "../../../types/study/studyDetail";

interface IStudySpaceCover {
  coverImageUrl: string;
  place: IPlace;
}

function StudySpaceCover({ coverImageUrl, place }: IStudySpaceCover) {
  const logo = STUDY_CAFE_LOGO?.[place?.fullname];

  return (
    <Layout>
      <MaskingContainer>
        <OutCircle>
          <SpaceIcon>
            <StudySpaceLogo place={place} isBig={true} image={logo} />
          </SpaceIcon>
        </OutCircle>
      </MaskingContainer>
      <ImageWrapper>
        <Image
          src={coverImageUrl || SQUARE_RANDOM_IMAGE[0]}
          layout="fill"
          alt="studySpace"
          priority={true}
        />
      </ImageWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  position: relative;
`;

const OutCircle = styled.div`
  position: absolute;
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -30px;
  right: 20px;
  background-color: white;
  border-radius: 50%;
  box-shadow: var(--box-shadow-b);
`;

const MaskingContainer = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2/1;
  overflow: hidden;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

const SpaceIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  border-radius: 50%;

  overflow: hidden;

  border: 1.5px solid var(--font-h5);
  box-shadow: var(--box-shadow-b);
`;

export default StudySpaceCover;
