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
import { useEffect, useRef, useState } from "react";

import Logo from "../components/block/logo";
import { getInterestingDate } from "../libs/utils/dateUtils";
import styled from "styled-components";
import { ModalXs } from "../styles/layout/modal";
import ModalPortal from "../components/ModalPortal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faXRay } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { IconKakao } from "../public/icons/Icons";
import { ColorRing } from "react-loader-spinner";
import { motion } from "framer-motion";

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
  const [ImgLoading, setImgLoading] = useState(true);

  const forceSignOut = (router.query.force_signout as string) === "true";
  const redirectFrom = router.query.from as string;
  const [isModal, setIsModal] = useState(false);
  useEffect(() => {
    if (forceSignOut) onOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <meta property="og:description" content="카공 및 친목 동아리" />
        <meta property="og:image" content="/About1.png" />
      </Head>
      <Layout>
        <Wrapper>
          <ImageWrapper
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <Image
              alt="aboutPoster"
              width={350}
              height={190}
              src={`/About2.png`}
              onLoad={() => setImgLoading(false)}
            />
          </ImageWrapper>
          {ImgLoading ? (
            <Loader>
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#ff6b6b", "#fd7b5b", "#ffa500", "#ffeae5", "#00c2b3"]}
              />
            </Loader>
          ) : (
            <MainWrapper key={kakaoProvider.id}>
              <Button
                width="270px"
                height="40px"
                backgroundColor="#FEE500"
                borderRadius="6px"
                isLoading={loading}
                onClick={() => customSignin(kakaoProvider)}
                mb="8px"
                display="flex"
                justifyContent="space-between"
                border="1px solid #FEE500"
              >
                <IconKakao />
                <span style={{ marginRight: "16px" }}>카카오 로그인</span>
                <div />
              </Button>
              <Button
                width="270px"
                height="40px"
                background="var(--font-h7)"
                onClick={() => setIsModal(true)}
                border="1px solid var(--font-h5)"
                mb="8px"
              >
                게스트 로그인
              </Button>
              <Message>
                동아리원이 아니신 분은 게스트 로그인을 이용해주세요
              </Message>
            </MainWrapper>
          )}
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
        </Wrapper>
      </Layout>

      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <GuestModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
};

const GuestModal = ({ setIsModal }) => {
  return (
    <Modal>
      <ModalHeaderLine>
        <Title>게스트 로그인</Title>
        <FontAwesomeIcon icon={faX} onClick={() => setIsModal(false)} />
      </ModalHeaderLine>
      <Content>
        이 기능은 동아리 외부인을 위한 기능으로, 완성되지 않은 기능들이
        있습니다.{" "}
        <b>해당 동아리 소속의 인원은 카카오 로그인을 이용해주시기 바랍니다.</b>
      </Content>
      <ModalNav>
        <button onClick={() => setIsModal(false)}>뒤로</button>
        <button onClick={() => signIn("guest")}>로그인</button>
      </ModalNav>
    </Modal>
  );
};

const Layout = styled.div`
  width: 375px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled(motion.div)``;

const Wrapper = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 100px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const Modal = styled(ModalXs)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
`;
const ModalHeaderLine = styled.header`
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
    font-weight: 600;
  }
`;

const Message = styled.span`
  font-size: 10px;
  text-align: center;
  color: var(--color-red);
`;
const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession({ req: context.req });
  const returnTo = context.query.from as string;

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
