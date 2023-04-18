import { motion } from "framer-motion";
import styled from "styled-components";
import Header from "../../../components/Layout/Header";

function Scores() {
  return (
    <ScoresLayout
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <Header title="내 점수" />
      <Layout>미 구현</Layout>
    </ScoresLayout>
  );
}
const ScoresLayout = styled(motion.div)``;

const Layout = styled.div`
  text-align: center;
`;

export default Scores;
