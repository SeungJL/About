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
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  z-index: 100;
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
        <Image alt="about" width={185} height={205} src="/icons/coffee.png" />
        <Title>About</Title>
      </MainBox>
    </ScreenBox>
  );
};
export default Cover;
