import Image from "next/image";
import styled from "styled-components";
import { SQUARE_RANDOM_IMAGE } from "../../../constants/image/imageUrl";

function GroupStudyCover() {
  return (
    <Layout>
      <Image
        src={SQUARE_RANDOM_IMAGE[0]}
        layout="fill"
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
