import { useState } from "react";
import styled from "styled-components";
import { ModalHeaderLine, ModalMain, ModalXs } from "../../styles/layout/modal";

function ChangeProfileImageModal() {
  const [isFirstPage, setIsFirstPage] = useState(true);
  return (
    <Layout>
      <ModalHeaderLine>프로필 이미지 변경</ModalHeaderLine>
      <Main>
        {isFirstPage ? (
          <Choice>
            <div onClick={() => setIsFirstPage(false)}>캐릭터 선택</div>
            <div>카카오 프로필 업데이트</div>
          </Choice>
        ) : (
          <>
            <UpPart>
              <span>캐릭터</span>
              <div>
                <Icon></Icon>
                <Icon></Icon>
              </div>
            </UpPart>
            <DownPart>
              <span>캐릭터</span>
              <div>
                <Color></Color>
                <Color></Color>
              </div>
            </DownPart>
          </>
        )}
        <Footer>
          <button>취소</button>
          <button>변경</button>
        </Footer>
      </Main>
    </Layout>
  );
}

const Layout = styled(ModalXs)``;

const Choice = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 14px;
  font-weight: 600;
  padding: 20px 0;
  > div {
    border: 1px solid var(--font-h5);
    padding: 12px;
    background-color: var(--font-h7);
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1.2;
  color: var(--font-h2);
  font-size: 13px;
`;

const UpPart = styled.div`
  flex: 1;
  border-bottom: 1px solid var(--font-h5);
  display: flex;

  align-items: center;
  > div {
    flex: 1;
    display: flex;
    justify-content: space-around;
  }
`;

const DownPart = styled.div`
  flex: 0.8;
  border-bottom: 1px solid var(--font-h5);
  display: flex;
  align-items: center;
  > div {
    flex: 1;
    display: flex;
    justify-content: space-around;
  }
`;

const Icon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: blue;
`;

const Color = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: blue;
`;

const Footer = styled.footer`
  display: flex;
`;

export default ChangeProfileImageModal;
