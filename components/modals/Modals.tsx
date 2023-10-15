import {
  Button,
  Modal,
  ModalBody as ChakraModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter as ChakraModalFooter,
  ModalHeader as ChakraModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";
import { Size } from "../../types/system";
interface IModalLayout {
  children: React.ReactNode;
  size: Size;
  height?: number;
}

interface IModalLa {
  size: Size;
  height?: number;
  children: ReactNode;
  onClose: () => void;
}

export const ModalLayout = ({ onClose, size, height, children }: IModalLa) => (
  <Modal
    isOpen={true}
    onClose={onClose}
    //별도로 제어하기 때문에 onClose를 사용하는 일이 없으나 overlay 제어에 사용
    size={IS_WIDTH_VIEW_MAIN[size] ? "sm" : "xs"}
  >
    <ModalOverlay />
    <ModalContent
      h={height || SIZE_HEIGHT_MAP[size]}
      my="auto"
      borderRadius="var(--border-radius-main)"
    >
      {children}
    </ModalContent>
  </Modal>
);

export const ModalHeader = ({ text }) => (
  <>
    <ChakraModalHeader
      display="flex"
      alignItems="center"
      p="var(--padding-sub) var(--padding-main)"
    >
      {text}
    </ChakraModalHeader>
    <ModalCloseButton mt="2px" />
  </>
);

export const ModalHeaderCenter = ({ children }) => (
  <ChakraModalHeader
    display="flex"
    alignItems="center"
    p="var(--padding-sub) var(--padding-main)"
    justifyContent="space-between"
  >
    {children}
  </ChakraModalHeader>
);

export const ModalBody = ({ children }) => (
  <ChakraModalBody p="0 var(--padding-main)" display="flex" flexDir="column">
    {children}
  </ChakraModalBody>
);

interface IModalFooterTwo {
  onClickLeft: () => void;
  onClickRight: () => void;
  leftText?: string;
  rightText?: string;
}

export const ModalFooterTwo = ({
  onClickLeft,
  onClickRight,
  leftText,
  rightText,
}: IModalFooterTwo) => (
  <ChakraModalFooter p="var(--padding-sub) var(--padding-main)">
    <Button variant="ghost" mr={3} onClick={onClickLeft}>
      {leftText || "이전"}
    </Button>
    <Button variant="ghost" color="var(--color-mint)" onClick={onClickRight}>
      {rightText || "다음"}
    </Button>
  </ChakraModalFooter>
);

interface IModalFooterOne {
  onClick: () => void;
  text?: string;
  isFull?: boolean;
}

export const ModalFooterOne = ({ onClick, text, isFull }: IModalFooterOne) => (
  <ChakraModalFooter p="var(--padding-sub) var(--padding-main)">
    <Button
      size={isFull ? "lg" : "md"}
      variant={isFull ? "solid" : "ghost"}
      color={!isFull ? "var(--color-mint)" : "white"}
      w={isFull && "100%"}
      colorScheme={isFull && "mintTheme"}
      onClick={onClick}
    >
      {text || "확인"}
    </Button>
  </ChakraModalFooter>
);

export const ModalLeyou = ({ children, size, height }: IModalLayout) => (
  <Layout
    size={size}
    height={height}
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

export const PopUpLayout = ({ children, size }: IModalLayout) => (
  <Layout size={size}>{children}</Layout>
);

const SIZE_HEIGHT_MAP = {
  xxl: "500px",
  xl: "400px",
  lg: "300px",
  md: "240px",
  sm: "180px",
  xs: "120px",
};

const IS_WIDTH_VIEW_MAIN = {
  xxl: true,
  xl: true,
  lg: true,
  md: false,
  sm: false,
  xs: false,
};

const Layout = styled(motion.div)<{
  size: Size;
  height?: number;
  width?: number;
}>`
  width: ${(props) =>
    props.width
      ? `${props.width}px`
      : IS_WIDTH_VIEW_MAIN[props.size]
      ? "var(--view-width)"
      : "var(--view-width-light)"};
  max-width: ${(props) =>
    IS_WIDTH_VIEW_MAIN[props.size]
      ? "var(--view-max-width)"
      : "var(--view-max-width-light)"};

  height: ${(props) =>
    props.height ? `${props?.height}px` : SIZE_HEIGHT_MAP[props.size]};

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
