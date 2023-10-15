import { Button } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../components/modals/ModalPortal";
import { ModalLeyou } from "../../components/modals/Modals";
import { useRegisterFormsQuery } from "../../hooks/user/queries";
import { DispatchBoolean } from "../../types/reactTypes";

interface ICheckApplicantModal {
  provider: string;
  setIsCheckModal: DispatchBoolean;
}

function CheckApplicantModal({
  provider,
  setIsCheckModal,
}: ICheckApplicantModal) {
  const { data: session } = useSession();
  const router = useRouter();

  const [isModal, setIsModal] = useState(false);

  useRegisterFormsQuery({
    onSuccess(data) {
      if (data.find((who) => who.uid === session.uid)) setIsModal(true);
      else {
        if (session) router.push(`/register/location`);
        else
          signIn(provider, {
            callbackUrl: `${window.location.origin}/register/location`,
          });
      }
    },
  });

  const onClick = () => {
    setIsCheckModal(false);
    setIsModal(false);
  };

  return (
    <>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <ModalLeyou size="sm" height={168}>
            <Header>
              <span>가입 신청 완료!</span>
            </Header>
            <Text>
              조금만 기다려주세요! <br />
              며칠 내에 관리자가 카톡으로 연락드려요!
            </Text>
            <Button mt="auto" colorScheme="mintTheme" onClick={onClick}>
              확인
            </Button>
          </ModalLeyou>
        </ModalPortal>
      )}
    </>
  );
}

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
export default CheckApplicantModal;
