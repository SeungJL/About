import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const ScreenBox = styled(motion.div)`
  background: radial-gradient(circle at 50% 20%, #512c11 5%, #160c03 70%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  height: 653px;
  padding: 0;
  margin: 0;
`;
const MainBox = styled.div`
  margin-bottom: 170px;
`;
const Title = styled.div`
  margin-top: 6px;
  margin-left: 16px;
  font-size: 64px;
  color: #fde8e6;
  font-family: "Marck Script", cursive;
`;

const Cover = () => {
  return (
    <ScreenBox layoutId="cover">
      <MainBox>
        <Link href="/">
          <Image
            alt="about"
            width={185}
            height={205}
            src="/coffee.png"
            priority={true}
          />
          <Title>About</Title>
        </Link>
      </MainBox>
    </ScreenBox>
  );
};
export default Cover;
