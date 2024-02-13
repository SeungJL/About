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
import styled from "styled-components";
import { IModal } from "../../types/reactTypes";
import { Size } from "../../types2/assetTypes";
import TwoButtonNav from "../layout/TwoButtonNav";

export interface IFooterOptions {
  main: {
    text?: string;
    func?: () => void;
  };
  sub?: {
    text?: string;
    func?: () => void;
  };
  isFull?: boolean;
}

interface IModalLayout extends IModal {
  title: string;
  footerOptions: IFooterOptions;
  children: React.ReactNode;
  size?: Size;
}

export const ModalLayout = ({
  title,
  setIsModal,
  footerOptions: {
    main: { text = "확인", func = () => setIsModal(false) },
    sub,
    isFull = true,
  },
  size,
  children,
}: IModalLayout) => {
  const onClose = () => setIsModal(false);

  const { text: subText = "닫기", func: subFunc = onClose } = sub || {};

  return (
    <Modal isOpen={true} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent
        mx="var(--margin-main)"
        // h={height || SIZE_HEIGHT_MAP[size]}
        maxWidth="358px"
        my="auto"
        borderRadius="var(--border-radius-sub)"
      >
        <ChakraModalHeader fontSize="18px" borderBottom="var(--border-sub)">
          {title}
        </ChakraModalHeader>

        <ModalCloseButton size="lg" />
        <ChakraModalBody pt="16px" pb="4px" px="20px">
          {children}
        </ChakraModalBody>
        <ChakraModalFooter p="20px">
          {isFull ? (
            <TwoButtonNav
              leftText={subText}
              rightText={text}
              onClickLeft={subFunc}
              onClickRight={func}
            />
          ) : (
            <></>
          )}
          {/* {isFull ? (
            <>
              {sub && (
                <Button
                  size="lg"
                  className="enabled:hover:bg-gray-100 bg-white border-1.5 border-mint text-mint text-base flex-1 font-semibold"
                  onClick={subFunc}
                >
                  {subText}
                </Button>
              )}
              <Button
                size="lg"
                className="font-semibold flex-1 ml-auto bg-mint text-white enabled:hover:mintShadow"
                onClick={func}
              >
                {text}
              </Button>
            </>
          ) : (
            <>
              {sub && <button></button>}
              <button className="ml-auto text-mint" onClick={func}>
                {text}
              </button>
            </>
          )} */}
        </ChakraModalFooter>
      </ModalContent>
    </Modal>
  );
};

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

export const ModalFooterTwo3 = ({
  onClickLeft,
  onClickRight,
  leftText = "닫기",
  rightText = "확인",
  isFull = true,
  isLoading,
  isSmall,
}: IModalFooterTwo) => (
  <ModalFooterLayout p="var(--padding-main) var(--padding-max)">
    <>
      <TwoButtonNav
        leftText={leftText}
        rightText={rightText}
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
        isLoading={isLoading}
      />
    </>
  </ModalFooterLayout>
);

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
