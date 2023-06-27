import { Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { signOut, useSession } from "next-auth/react";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalHeaderXLine } from "../../components/layouts/Modals";
import { useUserRequestMutation } from "../../hooks/userRequest/mutations";

import { ModalLg, ModalMain, ModalSubtitle } from "../../styles/layout/modal";

interface IRequestSecedeModal {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}
function RequestSecedeModal({ setIsModal }: IRequestSecedeModal) {
  const { mutate } = useUserRequestMutation({});
  const { data: session } = useSession();

  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSecede = async () => {
    await mutate({
      category: "탈퇴",
      title: "탈퇴",
      content: value,
      writer: session?.user.name,
      date: dayjs(),
    });
    await signOut();
  };

  return (
    <Layout>
      <ModalHeaderXLine title="회원 탈퇴" setIsModal={setIsModal} />
      <>
        <ModalMain>
          <ModalSubtitle>회원을 탈퇴하시겠습니까?</ModalSubtitle>
          <span>
            보증금 환급을 원하신다면 아래에 본인의 계좌번호와 성함을 남겨주세요.
            확인하는대로 환급해 드리도록 하겠습니다. 단톡방은 직접 나가주시면
            됩니다 !
          </span>
          <Textarea value={value} onChange={onChange} />
          <Message>고생하셨어요 ~!</Message>
        </ModalMain>
        <Footer>
          <Button width="50%" onClick={() => setIsModal(false)}>
            취소
          </Button>
          <Button
            width="50%"
            background="var(--color-mint)"
            color="white"
            onClick={onSecede}
          >
            회원탈퇴
          </Button>
        </Footer>
      </>
    </Layout>
  );
}

const Layout = styled(ModalLg)``;

const Textarea = styled.textarea`
  flex: 1;
  margin-top: 14px;
  background-color: var(--font-h6);
  border-radius: var(--border-radius);
  padding: 4px;
`;

const Message = styled.div`
  margin-top: 14px;
  font-size: 14px;
  text-align: center;
  font-weight: 600;
  color: var(--font-h2);
`;

const Footer = styled.footer`
  display: flex;
`;

export default RequestSecedeModal;
