import { motion } from "framer-motion";
import styled from "styled-components";

interface IPageLayout {
  children: React.ReactNode;
}

function PageLayout({ children }: IPageLayout) {
  return (
    <Layout
      initial={{ x: 375 }}
      animate={{ x: 0 }}
      exit={{ x: -375 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </Layout>
  );
}

const Layout = styled(motion.div)`
  position: relative;
  min-height: 100vh;
  padding-bottom: 20px;
`;

export default PageLayout;
