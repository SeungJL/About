import { Button } from "@chakra-ui/react";
import { faUnlock } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useFailToast } from "../../../hooks/CustomToast";
import { transferGatherDataState } from "../../../recoil/transferDataAtoms";
import { DispatchNumber } from "../../../types/reactTypes";

interface IGatherParticipateModalPassword {
  setPageNum: DispatchNumber;
}

function GatherParticipateModalPassword({
  setPageNum,
}: IGatherParticipateModalPassword) {
  const failToast = useFailToast();

  const gatherData = useRecoilValue(transferGatherDataState);
  const [password, setPassword] = useState("");

  const onApply = () => {
    if (password === gatherData?.password) setPageNum(2);
    else failToast("free", "암호가 일치하지 않습니다.");
  };

  return (
    <>
      <Layout>
        <CodeText>전달 받은 암호 네자리를 입력해 주세요.</CodeText>
        <div>
          <FontAwesomeIcon icon={faUnlock} color="var(--font-h4)" />
          <Input
            placeholder="암호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </Layout>
      <Footer>
        <Button width="50%" onClick={() => setPageNum(0)}>
          뒤로가기
        </Button>
        <Button
          color="white"
          backgroundColor="var(--color-mint)"
          width="50%"
          onClick={onApply}
        >
          다음
        </Button>
      </Footer>
    </>
  );
}
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  margin-top: 16px;
  > div:last-child {
    margin-top: 10px;
  }
`;

const CodeText = styled.span``;
const Input = styled.input`
  margin-left: var(--margin-md);
  background-color: var(--font-h7);
  padding: var(--padding-min) var(--padding-md);
  border-radius: var(--border-radius-sub);
`;

const Footer = styled.footer``;

export default GatherParticipateModalPassword;
