import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ModalXs } from "../../styles/layout/modal";

export default function UserLogout({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Layout>
      <Header>로그아웃</Header>
      <Content>
        <span>게스트 로그인에서는 마이페이지 접속이 불가능합니다.</span>
        <span>게스트에서 로그아웃 하시겠어요?</span>
      </Content>
      <Footer>
        <button onClick={() => signOut()}>로그아웃</button>
      </Footer>
    </Layout>
  );
}

const Layout = styled(ModalXs)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  border-bottom: 1px solid var(--font-h5);
  padding-bottom: 6px;
  font-weight: 800;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  flex: 1;
  justify-content: space-around;
  padding: 24px 0;
  > span:first-child {
  }
  > span:last-child {
    font-weight: 600;
  }
`;

const Footer = styled.footer`
  text-align: end;
  color: var(--color-red);
  font-size: 13px;

  margin-right: 4px;
  > button {
    font-weight: 600;
  }
`;
