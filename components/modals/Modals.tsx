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
import styled from "styled-components";
import { Size } from "../../types/system";
import TwoButtonNav from "../layout/TwoButtonNav";

interface IModalLayout {
  size?: Size;
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
    size={size && (IS_WIDTH_VIEW_MAIN[size] ? "sm" : "xs")}
  >
    <ModalOverlay />
    <ModalContent
      mx="var(--margin-main)"
      h={height || SIZE_HEIGHT_MAP[size]}
      maxWidth="358px"
      my="auto"
      borderRadius="var(--border-radius2)"
      color="var(--font-h1)"
    >
      {children}
    </ModalContent>
  </Modal>
);

interface IModalHeader {
  text: string;
  isCloseBtn?: boolean;
  isLine?: boolean;
}

export const ModalHeader = ({
  text,
  isCloseBtn = true,
  isLine = true,
}: IModalHeader) => (
  <>
    <ChakraModalHeader
      display="flex"
      alignItems="center"
      p="var(--padding-main) var(--padding-main)"
      fontWeight="700"
      fontSize="18px"
      color="var(--font-h1)"
      borderBottom={isLine && "var(--border-sub)"}
    >
      {text}
    </ChakraModalHeader>
    {isCloseBtn && (
      <ModalCloseButton size="lg" pb="2px" _focus={{ outline: "none" }} />
    )}
  </>
);

export const ModalHeaderCenter = ({ text }) => (
  <ChakraModalHeader
    display="flex"
    alignItems="center"
    px="var(--padding-max)"
    pt="var(--margin-main)"
    pb="0"
    justifyContent="center"
  >
    {text}
  </ChakraModalHeader>
);

export const ModalBody = ({ children }) => (
  <ChakraModalBody
    px=" var(--padding-max)"
    pt="var(--padding-main)"
    pb="0"
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
  isLoading?: boolean;
}

export const ModalFooterTwo = ({
  onClickLeft,
  onClickRight,
  leftText = "닫기",
  rightText = "확인",
  isFull = true,
  isLoading,
  isSmall,
}: IModalFooterTwo) => (
  // <ChakraModalFooter mt="auto" p="var(--padding-sub) var(--padding-max)">
  <ModalFooterLayout p="var(--padding-main) var(--padding-max)">
    <>
      {/* <OutlineMintBtn text={leftText} onClick={onClickLeft} />
      
      <SolidMintBtn text={rightText} onClick={onClickRight} /> */}

      <TwoButtonNav
        leftText={leftText}
        rightText={rightText}
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
        isLoading={isLoading}
      />
    </>

    {/* <Button
      w={isFull && "100%"}
      variant={isFull ? "solid" : "ghost"}
      mr={!isFull ? "var(--margin-md)" : "var(--margin-sub)"}
      onClick={onClickLeft}
      size={isFull && !isSmall ? "lg" : "md"}
    >
      {leftText || "이전"}
    </Button> */}
    {/* <Button
      w={isFull && "100%"}
      variant={isFull ? "solid" : "ghost"}
      color={isFull ? "white" : "var(--color-mint)"}
      onClick={onClickRight}
      colorScheme={isFull && "mintTheme"}
      size={isFull && !isSmall ? "lg" : "md"}
    >
      {rightText || "다음"}
    </Button> */}
  </ModalFooterLayout>
  // </ChakraModalFooter>
);

const ModalFooterLayout = styled(ChakraModalFooter)`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

interface IModalFooterOne {
  onClick: () => void;
  text?: string;
  isFull?: boolean;
  isRed?: boolean;
  isLoading?: boolean;
  isOutline?: boolean;
}

export const ModalFooterOne = ({
  onClick,
  text,
  isFull,
  isRed,
  isLoading,
  isOutline,
}: IModalFooterOne) => (
  <ChakraModalFooter p="var(--padding-main) var(--padding-max)">
    <Button
      size={isFull ? "lg" : "md"}
      variant={isFull ? "solid" : isOutline ? "outline" : "ghost"}
      color={!isFull || isOutline ? "var(--color-mint)" : "white"}
      w={isFull && "100%"}
      bg={isOutline ? "white" : null}
      border={isOutline ? "1.5px solid var(--color-mint)" : null}
      colorScheme={
        isFull && !isRed && !isOutline
          ? "mintTheme"
          : isOutline
          ? null
          : "redTheme"
      }
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
  <Flex
    direction="column"
    h="100%"
    mb="var(--padding-main)"
    py="var(--padding-sub)"
    justifyContent="space-around"
  >
    <Button
      colorScheme="mintTheme"
      marginBottom="var(--margin-sub)"
      size="lg"
      h="46px"
      onClick={onClickTop}
    >
      {topText}
    </Button>
    <Button size="lg" h="46px" onClick={onClickBottom}>
      {bottomText}
    </Button>
  </Flex>
);

const SIZE_HEIGHT_MAP = {
  xxl: "530px",
  xl: "370px",
  lg: "310px",
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
