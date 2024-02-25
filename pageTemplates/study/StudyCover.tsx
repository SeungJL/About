import styled from "styled-components";

import CircleLogoImage from "../../components2/atoms/CircleLogImage";
import RoundedCoverImage from "../../components2/atoms/RoundedCoverImage";
import { STUDY_CAFE_LOGO } from "../../constants2/serviceConstants/studyConstants/studyCafeLogoConstants";

interface IStudyCover {
  brand: string;
  imageUrl: string;
}

function StudyCover({ brand, imageUrl }: IStudyCover) {
  const brandName = brand === "행궁 81.2" ? "행궁" : brand;
  const logo = STUDY_CAFE_LOGO[brandName];

  return (
    <StudyCoverWrapper>
      <RoundedCoverImage imageUrl={imageUrl} />
      <LogoWrapper>
        <CircleLogoImage logoName={brand} imageUrl={logo} />
      </LogoWrapper>
    </StudyCoverWrapper>
    // <Layout>
    //   <MaskingContainer>
    //     <OutCircle>
    //       <SpaceIcon>
    //         <studyLogo place={place} isBig={true} image={logo} />
    //       </SpaceIcon>
    //     </OutCircle>
    //   </MaskingContainer>
    //   <ImageWrapper>
    //     <Image
    //       src={coverImageUrl || SQUARE_RANDOM_IMAGE[0]}
    //       fill={true}
    //       sizes="400px"
    //       alt="study"
    //       priority={true}
    //     />
    //   </ImageWrapper>
    // </Layout>
  );
}

const StudyCoverWrapper = styled.div`
  position: relative;
`;

const LogoWrapper = styled.div`
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: 24px;
  bottom: -32px;
  box-shadow: var(--shadow);
  z-index: 100;
`;
export default StudyCover;
