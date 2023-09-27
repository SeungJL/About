import { faCaretLeft, faCaretRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dayjs } from "dayjs";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isRecordLoadingState } from "../../recoil/loadingAtoms";
import { DispatchType } from "../../types/reactTypes";

interface IRecordMonthNav {
  month: number;
  setNavMonth: DispatchType<Dayjs>;
}

function RecordMonthNav({ month, setNavMonth }: IRecordMonthNav) {
  const setIsRecordLoading = useSetRecoilState(isRecordLoadingState);

  const onClick = (dir: "left" | "right") => {
    setIsRecordLoading(true);
    if (dir === "left") setNavMonth((old) => old.subtract(1, "month"));
    else setNavMonth((old) => old.add(1, "month"));
  };

  return (
    <Layout>
      <IconWrapper onClick={() => onClick("left")}>
        <FontAwesomeIcon icon={faCaretLeft} size="xs" />
      </IconWrapper>
      <span>{month + 1}월</span>
      <IconWrapper onClick={() => onClick("right")}>
        <FontAwesomeIcon icon={faCaretRight} size="xs" />
      </IconWrapper>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--margin-md);
  font-size: 20px;
  font-weight: 700;
  padding: 0 var(--padding-sub);
`;

const IconWrapper = styled.div`
  padding: 0 var(--padding-min);
`;

export default RecordMonthNav;
