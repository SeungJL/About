import {
  VStack,
  Heading,
  Box,
  Button,
  HStack,
  Text,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@chakra-ui/react";
import { NextPage, GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  LiteralUnion,
  ClientSafeProvider,
  signIn,
  getProviders,
  getSession,
} from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import AboutFooter from "../components/Pages/About/AboutFooter";
import UserInfoCheck from "../components/UserSetting";
import Logo from "../components/block/logo";
import { getInterestingDate } from "../libs/utils/dateUtils";
import styled from "styled-components";
import { ModalXs } from "../styles/LayoutStyles";
import ModalPortal from "../components/ModalPortal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faXRay } from "@fortawesome/free-solid-svg-icons";

const Login: NextPage<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const forceSignOut = (router.query.force_signout as string) === "true";
  const redirectFrom = router.query.from as string;
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    if (forceSignOut) onOpen();
  }, []);

  const customSignin = async (kakaoProvider: ClientSafeProvider) => {
    setLoading(true);

    await signIn(kakaoProvider.id);

    await setLoading(false);
  };

  const kakaoProvider = Object.values(providers).find((p) => p.id == "kakao");

  return (
    <>
      <Head>
        <meta
          property="og:url"
          content={`${process.env.NEXTAUTH_URL}/login${
            redirectFrom ? `?from=${redirectFrom}` : ""
          }`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About" />
        {/* <meta property="og:description" content="About" /> */}
        <meta property="og:image" content="/aboutOg.png" />
      </Head>
      <VStack height="92vh" justifyContent="center">
        <VStack marginBottom="20px">
          <Logo imgSize="xl" boxSize="250px" />
          <Heading textAlign="center" fontSize="36px">
            About
          </Heading>
        </VStack>
        <Box key={kakaoProvider.id}>
          <Button
            width="230px"
            height="60px"
            backgroundColor="#FEE500"
            borderRadius="6px"
            isLoading={loading}
            onClick={() => customSignin(kakaoProvider)}
          >
            <HStack width="200px" justifyContent="space-between">
              <Box display="inline" marginRight="10px">
                <svg
                  width="25"
                  height="23"
                  viewBox="0 0 348 317"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M348 135.5C348 210.335 270.098 271 174 271C77.9025 271 0 210.335 0 135.5C0 60.6654 77.9025 0 174 0C270.098 0 348 60.6654 348 135.5Z"
                    fill="#000000"
                  />
                  <path
                    d="M91.0331 216.167C91.6506 213.791 93.9017 212.215 96.3456 212.447L193.205 221.656C197.833 222.096 199.408 228.063 195.6 230.729L74.2661 315.688C70.4575 318.355 65.3894 314.834 66.559 310.335L91.0331 216.167Z"
                    fill="#000000"
                  />
                </svg>
              </Box>
              <Text fontSize="lg" flex="1" display="inline" color="black">
                카카오 로그인
              </Text>
            </HStack>
          </Button>
        </Box>
        <Button
          background="white"
          fontSize="12px"
          onClick={() => setIsModal(true)}
        >
          게스트 로그인
        </Button>

        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
          size="xs"
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                강제 로그아웃
              </AlertDialogHeader>

              <AlertDialogBody>
                <Text>
                  관리자가 당신의 권한을 변경하여 강제 로그아웃되었습니다.
                </Text>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button colorScheme="red" onClick={onClose} width="100%">
                  확인
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </VStack>
      <AboutFooter />
      {isModal && (
        <ModalPortal closePortal={setIsModal}>
          <GuestModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
};

const GuestModal = ({ setIsModal }) => {
  return (
    <Modal>
      <ModalHeader>
        <Title>게스트 로그인</Title>
        <FontAwesomeIcon icon={faX} onClick={() => setIsModal(false)} />
      </ModalHeader>
      <Content>
        이 기능은 동아리 외부인을 위한 기능으로, 해당 동아리 소속의 인원은
        카카오 로그인을 이용해주시기 바랍니다.
      </Content>
      <ModalNav>
        <button onClick={() => setIsModal(false)}>뒤로</button>
        <button onClick={() => signIn("guest")}>로그인</button>
      </ModalNav>
    </Modal>
  );
};

const Modal = styled(ModalXs)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
`;
const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

const Content = styled.div`
  font-size: 13px;
`;
const ModalNav = styled.nav`
  text-align: end;
  > button {
    width: 60px;
  }
  > button:last-child {
    color: var(--color-red);
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession({ req: context.req });
  const returnTo = context.query.from as string;

  const interestingDateStr = getInterestingDate().format("YYYY-MM-DD");

  if (session) {
    if (returnTo) {
      return {
        redirect: {
          permanent: false,
          destination: returnTo,
        },
      };
    }
    return {
      redirect: {
        permanent: false,
        destination: `/about`,
      },
      props: {},
    };
  }

  return {
    props: { providers },
  };
};

export default Login;
