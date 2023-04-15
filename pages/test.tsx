import { Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styled from "styled-components";

export default function Test() {
  const circleVariants = {
    animate: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 2,
        delay: 4,
        ease: "easeInOut",
        loop: Infinity,
      },
    },
  };

  const inCircleVariants = {
    animate: {
      scale: [1, 1.4, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        loop: Infinity,
      },
    },
  };
  return (
    <Layout>
      <OutCircle>
        <motion.div
          style={{
            backgroundColor: "HSLA(176, 100%, 38%, 1)",
            borderRadius: "50%",
            width: 30,
            height: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          variants={circleVariants}
          animate="animate"
        >
          <InCircle variants={inCircleVariants} animate="animate" />
        </motion.div>
      </OutCircle>
    </Layout>
  );
}

const Layout = styled.div`
  text-align: center;
  margin-top: 120px;
  margin-left: 150px;
  > span {
    margin-bottom: 30px;
  }
`;

const OutCircle = styled.div`
  width: 60px;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const InCircle = styled(motion.div)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: white;
`;
