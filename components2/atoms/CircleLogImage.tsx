import Image from "next/image";
import styled from "styled-components";
interface ICircleLogImage {
  logoName: string;
  imageUrl: string;
}
export default function CircleLogoImage({
  logoName,
  imageUrl,
}: ICircleLogImage) {
  return (
    <CircleLogoWrapper logoName={logoName}>
      <Image src={imageUrl} width={72} height={72} alt={logoName} />
    </CircleLogoWrapper>
  );
}

const CircleLogoWrapper = styled.div`
  background-color: var(--gray-7); /* bg-gray-100 */
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;
