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
import ModalPortal from "../components/common/ModalPortal";
import { useCompleteToast } from "../hooks/CustomToast";
import { useUserInfoQuery } from "../hooks/user/queries";
import CheckApplicantModal from "../modals/login/CheckApplicantModal";
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
  const router = useRouter();
  const status = router.query?.status;

  const kakaoProvider = Object.values(providers).find((p) => p.id == "kakao");

  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isCheckModal, setIsCheckModal] = useState(false);
  const [isMember, setIsMember] = useState(false);

  useUserInfoQuery({
    onSuccess(data) {
      if (data?.mbti) setIsMember(true);
    },
  });
  console.log(55, isCheckModal);
  useEffect(() => {
    if (status === "logout") completeToast("free", "로그아웃 되었습니다.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const customSignin = (type: "member" | "guest") => {
    setLoading(true);
    const provider = type === "member" ? kakaoProvider.id : "guest";
    if (isMember) {
      if (session) router.push(`/about`);
      else signIn(provider, { callbackUrl: `${window.location.origin}/about` });
      return;
    }
    console.log(44);
    setIsCheckModal(true);
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
              src={`/LoginBg.png`}
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
        <ModalPortal setIsModal={setIsModal}>
          <GuestLoginModal
            setIsModal={setIsModal}
            customSignin={customSignin}
          />
        </ModalPortal>
      )}
      {isCheckModal && (
        <CheckApplicantModal
          provider={kakaoProvider.id}
          setIsCheckModal={setIsCheckModal}
        />
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
