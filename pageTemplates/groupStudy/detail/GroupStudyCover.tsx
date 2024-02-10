import Image from "next/image";
import styled from "styled-components";
import { SQUARE_RANDOM_IMAGE } from "../../../constants/image/imageUrl";

interface IGroupStudyCover {
  image: string;
}

function GroupStudyCover({ image }: IGroupStudyCover) {
  return (
    <Layout>
      <Image
        src={image || SQUARE_RANDOM_IMAGE[0]}
        fill={true}
        sizes="400px"
        alt="studySpace"
        priority={true}
      />
    </Layout>
  );
}

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
`;

export default GroupStudyCover;
