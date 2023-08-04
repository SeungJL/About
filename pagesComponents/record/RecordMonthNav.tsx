import { faCaretLeft, faCaretRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isRecordLoadingState } from "../../recoil/loadingAtoms";

interface IRecordMonthNav {
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  setDateRange: any;
}

function RecordMonthNav({ month, setMonth, setDateRange }: IRecordMonthNav) {
  const setIsRecordLoading = useSetRecoilState(isRecordLoadingState);

  useEffect(() => {
    setIsRecordLoading(true);
    setDateRange({
      startDate: dayjs().month(month).date(1),
      endDate: dayjs().month(month).date(dayjs().daysInMonth()),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  return (
    <Layout>
      <FontAwesomeIcon
        icon={faCaretLeft}
        size="xs"
        onClick={() => setMonth(month - 1)}
      />
      <span>{month + 1}월</span>
      <FontAwesomeIcon
        icon={faCaretRight}
        size="xs"
        onClick={() => setMonth(month + 1)}
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
