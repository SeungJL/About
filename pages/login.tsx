import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GetServerSideProps, NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ModalBody,
  ModalFooterOne,
  ModalHeaderCenter,
  ModalLayout,
} from "../components/modals/Modals";
import { useCompleteToast, useFailToast } from "../hooks/CustomToast";
import { useRegisterFormsQuery } from "../hooks/user/queries";
import ForceLogoutDialog from "../modals/login/ForceLogoutDialog";
import GuestLoginModal from "../modals/login/GuestLoginModal";
import { IconKakao } from "../public/icons/Icons";

const Login: NextPage<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const { data: session } = useSession();
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const router = useRouter();
  const status = router.query?.status;

  const kakaoProvider = Object.values(providers).find((p) => p.id == "kakao");

  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);
  const [isApplicant, setIsApplicant] = useState(false);


  
  const { isLoading } = useRegisterFormsQuery({
    enabled: !!session,
    onSuccess(data) {
      if (data?.find((who) => who.uid === session.uid)) setIsApplicant(true);
    },
  });

  useEffect(() => {
    if (status === "logout") completeToast("free", "로그아웃 되었습니다.");
    if (status === "noMember")
      failToast("free", "동아리에 소속되어 있지 않습니다.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const customSignin = async (type: "member" | "guest") => {
    const provider = type === "member" ? kakaoProvider.id : "guest";
    setLoading(true);
    if (provider === "guest") {
      setIsModal(false);
      signIn(provider, { callbackUrl: `${window.location.origin}/about` });
      return;
    }
    if (isLoading) await new Promise((resolve) => setTimeout(resolve, 1000));
    if (isApplicant) {
      setIsCheckModal(true);
      setLoading(false);
      return;
    }

    if (session) router.push(`/about?status=login`);
    else
      signIn(provider, {
        callbackUrl: `${window.location.origin}/about?status=login`,
      });

    setLoading(false);
  };
  return (
    <>
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
              src={`https://studyabout.s3.ap-northeast-2.amazonaws.com/%EB%8F%99%EC%95%84%EB%A6%AC/%EB%A1%9C%EA%B3%A0+short.webp`}
              priority
            />
          </ImageWrapper>
          <MainWrapper key={kakaoProvider.id}>
            <Button
              width="270px"
              height="40px"
              backgroundColor="#FEE500"
              borderRadius="var(--border-radius-sub)"
              isLoading={loading}
              onClick={() => customSignin("member")}
              mb="var(--margin-md)"
              display="flex"
              justifyContent="space-between"
            >
              <IconKakao />
              <span style={{ marginRight: "16px" }}>카카오로 로그인</span>
              <div />
            </Button>
            <Button
              width="270px"
              height="40px"
              background="var(--font-h7)"
              onClick={() => setIsModal(true)}
              border="var(--border-sub)"
              mb="var(--margin-md)"
            >
              게스트 로그인
            </Button>
            <Message>활동 및 가입신청은 카카오 로그인을 이용해주세요!</Message>
          </MainWrapper>
          <ForceLogoutDialog />
        </Wrapper>
      </Layout>
      {isModal && (
        <GuestLoginModal setIsModal={setIsModal} customSignin={customSignin} />
      )}
      {isCheckModal && (
        <ModalLayout onClose={() => setIsModal(false)} size="sm">
          <ModalHeaderCenter text="가입 대기중" />
          <ModalBody>
            가입 대기중입니다. <br /> 며칠 내에 카톡으로 연락드려요!
          </ModalBody>
          <ModalFooterOne
            isFull={true}
            onClick={() => setIsCheckModal(false)}
          />
        </ModalLayout>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();

  return {
    props: { providers },
  };
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

const Message = styled.span`
  font-size: 10px;
  text-align: center;
  color: var(--color-red);
`;

export default Login;
