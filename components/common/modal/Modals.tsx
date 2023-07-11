import { motion } from "framer-motion";
import styled from "styled-components";
import { size } from "../../../types/ui";

interface IModalLayout {
  children: React.ReactNode;
}

export const ModalXXL = ({ children }: IModalLayout) => (
  <Layout
    size="xxl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.5,
      ease: "easeInOut",
    }}
  >
    {children}
  </Layout>
);
export const ModalXL = ({ children }: IModalLayout) => (
  <Layout
    size="xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.5,
      ease: "easeInOut",
    }}
  >
    {children}
  </Layout>
);

const SIZE_HEIGHT_MAP = {
  xxl: "500px",
  xl: "400px",
};

const Layout = styled(motion.div)<{ size: size }>`
  width: var(--width-90);
  height: ${(props) => SIZE_HEIGHT_MAP[props.size]};
  padding: var(--padding-main);
  background-color: white;
  border-radius: var(--border-radius-main);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
`;
