import {
  Button,
  Flex,
  Modal,
  ModalBody as ChakraModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter as ChakraModalFooter,
  ModalHeader as ChakraModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { Size } from "../../types/system";

interface IModalLayout {
  size: Size;
  height?: number;
  children: ReactNode;
  onClose: () => void;
}

export const ModalLayout = ({
  onClose,
  size,
  height,
  children,
}: IModalLayout) => (
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

interface IModalHeader {
  text: string;
  isCloseBtn?: boolean;
}

export const ModalHeader = ({ text, isCloseBtn = true }: IModalHeader) => (
  <>
    <ChakraModalHeader
      display="flex"
      alignItems="center"
      p="var(--padding-sub) var(--padding-main)"
    >
      {text}
    </ChakraModalHeader>
    {isCloseBtn && <ModalCloseButton mt="2px" _focus={{ outline: "none" }} />}
  </>
);

export const ModalHeaderCenter = ({ text }) => (
  <ChakraModalHeader
    display="flex"
    alignItems="center"
    p="var(--padding-sub) var(--padding-main)"
    justifyContent="center"
  >
    {text}
  </ChakraModalHeader>
);

export const ModalBody = ({ children }) => (
  <ChakraModalBody
    p="var(--padding-min) var(--padding-main)"
    display="flex"
    flexDir="column"
    position="relative"
  >
    {children}
  </ChakraModalBody>
);

interface IModalFooterTwo {
  onClickLeft: () => void;
  onClickRight: () => void;
  leftText?: string;
  rightText?: string;
  isFull?: boolean;
  isSmall?: boolean;
}

export const ModalFooterTwo = ({
  onClickLeft,
  onClickRight,
  leftText,
  rightText,
  isFull,
  isSmall,
}: IModalFooterTwo) => (
  <ChakraModalFooter mt="auto" p="var(--padding-sub) var(--padding-main)">
    <Button
      w={isFull && "100%"}
      variant={isFull ? "solid" : "ghost"}
      mr={!isFull && "var(--margin-md)"}
      onClick={onClickLeft}
      size={isFull && !isSmall ? "lg" : "md"}
    >
      {leftText || "이전"}
    </Button>
    <Button
      w={isFull && "100%"}
      variant={isFull ? "solid" : "ghost"}
      color={isFull ? "white" : "var(--color-mint)"}
      onClick={onClickRight}
      colorScheme={isFull && "mintTheme"}
      size={isFull && !isSmall ? "lg" : "md"}
    >
      {rightText || "다음"}
    </Button>
  </ChakraModalFooter>
);

interface IModalFooterOne {
  onClick: () => void;
  text?: string;
  isFull?: boolean;
  isRed?: boolean;
  isLoading?: boolean;
}

export const ModalFooterOne = ({
  onClick,
  text,
  isFull,
  isRed,
  isLoading,
}: IModalFooterOne) => (
  <ChakraModalFooter p="var(--padding-sub) var(--padding-main)">
    <Button
      size={isFull ? "lg" : "md"}
      variant={isFull ? "solid" : "ghost"}
      color={!isFull ? "var(--color-mint)" : "white"}
      w={isFull && "100%"}
      colorScheme={isFull && !isRed ? "mintTheme" : "redTheme"}
      isLoading={isLoading}
      onClick={onClick}
    >
      {text || "확인"}
    </Button>
  </ChakraModalFooter>
);

interface IModalBodyNavTwo {
  topText: string;
  bottomText: string;
  onClickTop: () => void;
  onClickBottom: () => void;
}

export const ModalBodyNavTwo = ({
  topText,
  bottomText,
  onClickBottom,
  onClickTop,
}: IModalBodyNavTwo) => (
  <Flex direction="column" h="100%" mt="var(--margin-min)">
    <Button
      colorScheme="mintTheme"
      marginBottom="var(--margin-sub)"
      size="lg"
      onClick={onClickTop}
    >
      {topText}
    </Button>
    <Button size="lg" onClick={onClickBottom}>
      {bottomText}
    </Button>
  </Flex>
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
