import { motion } from "framer-motion";
import styled from "styled-components";

interface IPageLayout {
  children: React.ReactNode;
}

function PageLayout({ children }: IPageLayout) {
  return (
    <Layout
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </Layout>
  );
}

const Layout = styled(motion.div)`
  min-height: 100vh;
`;

export default PageLayout;
