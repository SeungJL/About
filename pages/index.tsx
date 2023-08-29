import { Button } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { ModalLayout } from "../components/common/modal/Modals";
import ModalPortal from "../components/common/ModalPortal";

import { useRegisterFormsQuery, useUserInfoQuery } from "../hooks/user/queries";

function Index() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isModal, setIsModal] = useState(false);

  const { isLoading } = useUserInfoQuery({
    onSuccess(data) {
      if (data?.mbti) router.push(`/about`);
    },
  });

  useRegisterFormsQuery({
    enabled: !isLoading,
    onSuccess(data) {
      if (data.find((who) => who.uid === session.uid)) setIsModal(true);
      else {
        router.push(`/register/location`);
      }
    },
  });
  return (
    <>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <ModalLayout size="sm" height={168} isWideShort={true}>
            <Header>
              <span>가입 신청 완료!</span>
            </Header>
            <Text>
              조금만 기다려주세요! <br />
              며칠 내에 관리자가 카톡으로 연락드려요!
            </Text>
            <Button
              mt="auto"
              colorScheme="mintTheme"
              onClick={() => router.push(`/login`)}
            >
              확인
            </Button>
          </ModalLayout>
        </ModalPortal>
      )}
    </>
  );
}
export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  const { query } = context;
  console.log(query?.login);

  if (query?.login === "check")
    return {
      props: {},
    };

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: `/about`,
      },
      props: {},
    };
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login?from=/",
    },
    props: {},
  };
};

const Header = styled.header`
  font-weight: 600;
  text-align: center;
  font-size: 18px;
`;

const Text = styled.span`
  margin-top: var(--margin-main);
  text-align: center;
  color: var(--font-h2);
`;
