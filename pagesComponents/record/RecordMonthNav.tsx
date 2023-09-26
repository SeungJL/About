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
    if (dir === "left") setNavMonth((old) => old.subtract(1, "day"));
    else setNavMonth((old) => old.add(1, "month"));
  };

  return (
    <Layout>
      <FontAwesomeIcon
        icon={faCaretLeft}
        size="xs"
        onClick={() => onClick("left")}
      />
      <span>{month + 1}월</span>
      <FontAwesomeIcon
        icon={faCaretRight}
        size="xs"
        onClick={() => onClick("right")}
      />
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: var(--margin-sub);
  font-size: 20px;
  font-weight: 700;
  padding: 0 var(--padding-main);
  > span {
    margin: 0 var(--margin-min);
  }
`;

export default RecordMonthNav;
