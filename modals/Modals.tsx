import {
  Box,
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
import TwoButtonNav from "../components/layouts/TwoButtonNav";
import { IModal } from "../types2/reactTypes";

export interface IHeaderOptions {
  subTitle?: string;
  children?: React.ReactNode;
}
export interface IFooterOptions {
  main?: {
    text?: string;
    func?: () => void;
    isRedTheme?: boolean;
  };
  sub?: {
    text?: string;
    func?: () => void;
  };
  isFull?: boolean;
  children?: React.ReactNode;
}

interface IModalLayout extends IModal {
  title?: string;
  footerOptions?: IFooterOptions;
  children: React.ReactNode;
  initialRef?: any;
  headerOptions?: IHeaderOptions;
  paddingOptions?: IPaddingOptions;
}

export interface IPaddingOptions {
  header?: number;
  body?: {
    top?: number;
    bottom?: number;
  };
  footer?: number;
}

export const ModalLayout = ({
  title,
  setIsModal,
  footerOptions,
  headerOptions,
  initialRef,
  children,
  paddingOptions,
}: IModalLayout) => {
  const onClose = () => setIsModal(false);

  const { main, sub, isFull = true } = footerOptions || {};
  const { text = "확인", func = onClose } = main || {};
  const { text: subText = "닫기", func: subFunc = onClose } = sub || {};

  return (
    <Modal isOpen={true} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent
        mx="var(--gap-4)"
        // h={height || SIZE_HEIGHT_MAP[size]}
        maxWidth="358px"
        my="auto"
        borderRadius="var(--rounded-lg)"
      >
        {!headerOptions ? (
          <>
            <ChakraModalHeader
              p="var(--gap-4)"
              fontSize="18px"
              borderBottom="var(--border)"
            >
              {title}
            </ChakraModalHeader>
            <ModalCloseButton size="lg" />
          </>
        ) : headerOptions?.children ? (
          headerOptions.children
        ) : (
          <>
            <ChakraModalHeader
              pt="var(--gap-5)"
              pb="var(--gap-2)"
              fontSize="20px"
              textAlign="center"
            >
              {title}
            </ChakraModalHeader>
            {headerOptions?.subTitle && (
              <Box textAlign="center" color="var(--gray-2)" fontSize="16px">
                {headerOptions.subTitle}
              </Box>
            )}
          </>
        )}
        <ChakraModalBody
          pt={
            paddingOptions?.body?.top ? `${paddingOptions.body.top}px` : "16px"
          }
          pb={
            paddingOptions?.body?.bottom
              ? `${paddingOptions.body.bottom}px`
              : "4px"
          }
          px="20px"
        >
          {children}
        </ChakraModalBody>

        {footerOptions && (
          <ChakraModalFooter
            py={paddingOptions?.footer ? `${paddingOptions.footer}px` : "20px"}
            px="20px"
          >
            {footerOptions?.children ? (
              footerOptions.children
            ) : !sub ? (
              isFull ? (
                <Button
                  size="lg"
                  colorScheme={main?.isRedTheme ? "redTheme" : "mintTheme"}
                  w="100%"
                  onClick={func}
                >
                  {text}
                </Button>
              ) : (
                <Button
                  onClick={func}
                  variant="ghost"
                  color={
                    main?.isRedTheme ? "var(--color-red)" : "var(--color-mint)"
                  }
                >
                  {text}
                </Button>
              )
            ) : isFull ? (
              <TwoButtonNav
                leftText={subText}
                rightText={text}
                onClickLeft={subFunc}
                onClickRight={func}
              />
            ) : (
              <>
                <Button
                  onClick={subFunc}
                  variant="ghost"
                  color="var(--color-mint)"
                >
                  {subText}
                </Button>
                <Button onClick={func} variant="ghost">
                  {text}
                </Button>
              </>
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
        )}
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
      p="var(--gap-4) var(--gap-4)"
      fontWeight="700"
      fontSize="18px"
      color="var(--gray-1)"
      borderBottom={isLine && "var(--border)"}
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
    px="var(--gap-5)"
    pt="var(--gap-4)"
    pb="0"
    justifyContent="center"
  >
    {text}
  </ChakraModalHeader>
);

export const ModalBody = ({ children }) => (
  <ChakraModalBody
    px=" var(--gap-5)"
    pt="var(--gap-4)"
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
  <ModalFooterLayout p="var(--gap-4) var(--gap-5)">
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
  // <ChakraModalFooter mt="auto" p="var(--gap-3) var(--gap-5)">
  <ModalFooterLayout p="var(--gap-4) var(--gap-5)">
    <>
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
      mr={!isFull ? "var(--gap-2)" : "var(--gap-3)"}
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
  <ChakraModalFooter p="var(--gap-4) var(--gap-5)">
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
    mb="var(--gap-4)"
    py="var(--gap-3)"
    justifyContent="space-around"
  >
    <Button
      colorScheme="mintTheme"
      marginBottom="var(--gap-3)"
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
