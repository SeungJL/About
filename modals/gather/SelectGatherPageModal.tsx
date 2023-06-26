import { Button } from "@chakra-ui/react";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SetStateAction, useState } from "react";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/layouts/Modals";
import { ModalMain, ModalXs } from "../../styles/layout/modal";

function SelectGatherPageModal({
  setIsModal,
}: {
  setIsModal?: React.Dispatch<SetStateAction<boolean>>;
}) {
  const [isFirst, setIsFirst] = useState(true);

  const onClickBtn = () => {};

  const onClickPrev = () => {
    setIsFirst(false);
  };

  return (
    <>
      <Layout>
        <ModalHeaderX title="참여신청" setIsModal={setIsModal} />

        <ModalMain>
          {isFirst ? (
            <Main>
              <Button
                color="white"
                backgroundColor="var(--color-mint)"
                marginBottom="12px"
              >
                일반 참여 신청
              </Button>
              <Button onClick={onClickPrev}>사전 확정 인원</Button>
            </Main>
          ) : (
            <Main>
              <CodeText>전달 받은 암호 네자리를 입력해 주세요.</CodeText>
              <div>
                <FontAwesomeIcon icon={faUnlock} color="var(--font-h4)" />
                <Input placeholder="암호 입력" />
              </div>
            </Main>
          )}
        </ModalMain>
        {!isFirst && (
          <Footer>
            <Button width="50%" onClick={() => setIsFirst(true)}>
              뒤로가기
            </Button>
            <Button
              color="white"
              backgroundColor="var(--color-mint)"
              width="50%"
            >
              신청 완료
            </Button>
          </Footer>
        )}
      </Layout>
    </>
  );
}

const Layout = styled(ModalXs)``;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;
  > div:last-child {
    margin-top: 10px;
  }
`;

const Input = styled.input`
  margin-left: 8px;
  background-color: var(--font-h7);
  padding: 4px 8px;
  border-radius: var(--border-radius);
`;

const Footer = styled.footer``;

const CodeText = styled.span``;

export default SelectGatherPageModal;
