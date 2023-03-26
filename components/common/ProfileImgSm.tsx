import Image from "next/image";
import styled from "styled-components";

function ProfileImgSm({ imgSrc }: { imgSrc: string }) {
  return (
    <Layout>
      <Image
        src={`${imgSrc}`}
        width={27}
        height={27}
        alt="ProfileImgSm"
        unoptimized={true}
      />
    </Layout>
  );
}

const Layout = styled.div`
  border-radius: 12px;
  width: 27px;
  height: 27px;
  overflow: hidden;
  display: inline-block;
  position: absolute;
`;

export default ProfileImgSm;
