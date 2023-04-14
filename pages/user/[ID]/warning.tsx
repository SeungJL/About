import { motion } from "framer-motion";
import styled from "styled-components";
import Header from "../../../components/common/Header";

function Warning() {
  return (
    <CollectLayout
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      <Header title="내 컬렉션" />
      <Layout>미 구현</Layout>
    </CollectLayout>
  );
}
const CollectLayout = styled(motion.div)``;

const Layout = styled.div`
  text-align: center;
`;

export default Warning;
