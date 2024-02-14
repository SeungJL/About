import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { SingleLineText } from "../../styles/layout/components";
export interface IImageTileData {
  imageUrl: string;
  text: string;
  url: string;
}

interface IImageTileGridLayout {
  imageDataArr: IImageTileData[];
}
export default function ImageTileGridLayout({
  imageDataArr,
}: IImageTileGridLayout) {
  return (
    <GridContainer>
      {imageDataArr.map((imageData, idx) => (
        <Link key={idx} href={imageData.url} passHref>
          <ImageContainer>
            <Image
              src={imageData.imageUrl}
              sizes="180px"
              fill={true}
              alt="reviewThumbnailImage"
            />
          </ImageContainer>
          <TextContainer>{imageData.text}</TextContainer>
        </Link>
      ))}
    </GridContainer>
  );
}
const GridContainer = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--border-radius-sub);
  overflow: hidden;
`;

const TextContainer = styled(SingleLineText)`
  margin-top: 8px;
`;
