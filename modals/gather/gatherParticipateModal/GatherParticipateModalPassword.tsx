import { faUnlock } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { ModalBody, ModalFooterTwo } from "../../../components/modals/Modals";
import { useFailToast } from "../../../hooks/custom/CustomToast";
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
      <ModalBody>
        <CodeText>전달 받은 암호 네자리를 입력해 주세요.</CodeText>
        <Container>
          <FontAwesomeIcon icon={faUnlock} color="var(--font-h4)" />
          <Input
            placeholder="암호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Container>
      </ModalBody>
      <ModalFooterTwo
        isFull={true}
        leftText="뒤로"
        rightText="입력"
        onClickLeft={() => setPageNum(0)}
        onClickRight={onApply}
        isSmall={true}
      />
    </>
  );
}

const Container = styled.div`
  margin-top: var(--margin-min);
  flex: 1;
  display: flex;
  align-items: center;
`;

const CodeText = styled.span`
  font-size: 12px;
`;

const Input = styled.input`
  margin-left: var(--margin-md);
  background-color: var(--font-h7);
  padding: var(--padding-min) var(--padding-md);
  border-radius: var(--border-radius-sub);
`;

export default GatherParticipateModalPassword;
