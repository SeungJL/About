import Image from "next/image";
import styled from "styled-components";

function ProfileImgSm({ imgSrc }: { imgSrc: string }) {
  return (
    <Layout>
      <Image
        src={`${imgSrc}`}
        width={26}
        height={26}
        alt="ProfileImgSm"
        unoptimized={true}
      />
    </Layout>
  );
}

const Layout = styled.div`
  border-radius: 50%;
  width: 26px;
  height: 26px;
  overflow: hidden;
  display: inline-block;
  position: absolute;
  bottom: 0px;
`;

export default ProfileImgSm;
