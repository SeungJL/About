import { Badge } from "@chakra-ui/react";
import { faClock } from "@fortawesome/pro-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { studyStartTimeArrState } from "../../../../recoil/studyAtoms";
import { IPlace } from "../../../../types/study/studyDetail";

interface IAboutMainItemStatus {
  status: string;
  place: IPlace;
  memberCnt?: number;
}

function AboutMainItemStatus({
  status,
  place,
  memberCnt,
}: IAboutMainItemStatus) {
  const studyStartTimeArr = useRecoilValue(studyStartTimeArrState);

  const studyStartTime = studyStartTimeArr?.find(
    (study) => study.place_id === place?._id
  )?.startTime;

  const plusCnt =
    status === "pending" &&
    (memberCnt === 0 ? 10 : memberCnt === 1 ? 5 : memberCnt === 2 ? 2 : null);

  return (
    <Layout>
      <Branch>{place.branch}</Branch>
      <div>
        {status === "pending" ? (
          <Badge colorScheme="redTheme" variant="outline">
            {plusCnt ? `+${plusCnt} POINT` : "오픈 예정"}
          </Badge>
        ) : status !== "pending" && status === "open" ? (
          <Badge colorScheme="green">Open</Badge>
        ) : status !== "pending" && status === "dismissed" ? (
          <Badge colorScheme="blackAlpha">Closed</Badge>
        ) : status === "free" ? (
          <Badge colorScheme="purple">Free</Badge>
        ) : null}
      </div>
      {studyStartTime && (
        <Result>
          <FontAwesomeIcon icon={faClock} />
          <ResultInfo>{dayjs(studyStartTime).format("HH:mm")}</ResultInfo>
        </Result>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  > div:nth-child(2) {
    display: flex;
    align-items: center;

    > span {
      margin-left: var(--gap-2);
    }
  }
`;
const Branch = styled.div`
  display: inline-block;
  font-weight: 600;
  font-size: 16px;
`;
const Result = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  margin-left: var(--gap-2);
  color: var(--gray-2);
`;

const ResultInfo = styled.div`
  margin-left: var(--gap-1);
`;

export default AboutMainItemStatus;
