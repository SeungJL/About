import { Switch } from "@chakra-ui/react";
import { faMinus, faPlus } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { GatherMemberCnt } from "../../../types/page/gather";
import { DispatchType } from "../../../types/reactTypes";

interface IGatherWritingConditionCnt {
  isMin: boolean;
  value: number;
  setMemberCnt: DispatchType<GatherMemberCnt>;
}

function GatherWritingConditionCnt({
  isMin,
  value,
  setMemberCnt,
}: IGatherWritingConditionCnt) {
  const [isMaxLimit, setIsMaxLimit] = useState(!isMin);
  const handleCnt = (cnt: number) => {
    if (isMin) setMemberCnt((old) => ({ ...old, min: old.min + cnt }));
    else setMemberCnt((old) => ({ ...old, max: old.max + cnt }));
  };

  const toggleSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    if (!isChecked) setMemberCnt((old) => ({ ...old, max: 4 }));
    else setMemberCnt((old) => ({ ...old, max: 0 }));
    setIsMaxLimit(isChecked);
  };

  return (
    <Layout>
      <MemberCnt>
        {!isMin && (
          <Switch
            colorScheme="mintTheme"
            isChecked={isMaxLimit}
            onChange={toggleSwitch}
            mr="16px"
          />
        )}
        {!isMaxLimit ? (
          <>
            <CounterWrapper isMinus={true} onClick={() => handleCnt(-1)}>
              <FontAwesomeIcon icon={faMinus} />
            </CounterWrapper>
            <span>{value}명</span>
            <CounterWrapper isMinus={false} onClick={() => handleCnt(1)}>
              <FontAwesomeIcon icon={faPlus} />
            </CounterWrapper>
          </>
        ) : (
          <MaxConditionText>제한 없음</MaxConditionText>
        )}
      </MemberCnt>
    </Layout>
  );
}

const Layout = styled.div``;

const CounterWrapper = styled.div<{ isMinus: boolean }>`
  padding: 0 var(--padding-min);
  margin-right: ${(props) => (props.isMinus ? "var(--margin-min)" : 0)};
  margin-left: ${(props) => (!props.isMinus ? "var(--margin-min)" : 0)};
  cursor: pointer;
`;

const MemberCnt = styled.div`
  display: flex;
  align-items: center;
`;

const MaxConditionText = styled.div`
  width: 66px;
  text-align: center;
  margin-right: var(--margin-min);
`;
export default GatherWritingConditionCnt;
