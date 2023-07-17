import { Badge } from "@chakra-ui/react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { studyStartTimeState } from "../../../../../recoil/studyAtoms";
import { IPlace } from "../../../../../types/study/study";

interface IAboutMainItemStatus {
  status: string;
  place: IPlace;
}

function AboutMainItemStatus({ status, place }: IAboutMainItemStatus) {
  const studyStartTime = useRecoilValue(studyStartTimeState);

  const startTime = studyStartTime?.find(
    (item) => item.placeId === place._id
  )?.startTime;

  return (
    <Layout>
      <Branch>{place.branch}</Branch>
      {status !== "pending" && status === "open" ? (
        <Badge colorScheme="green" ml="var(--margin-md)">
          Open
        </Badge>
      ) : status !== "pending" && status === "dismissed" ? (
        <Badge colorScheme="blackAlpha" ml="var(--margin-md)">
          Closed
        </Badge>
      ) : status === "free" ? (
        <Badge colorScheme="purple" ml="var(--margin-md)">
          Free
        </Badge>
      ) : null}
      {startTime && (
        <Result>
          <FontAwesomeIcon icon={faClock} size="sm" />
          <ResultInfo>{startTime?.format("HH:mm")} ~</ResultInfo>
        </Result>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
`;
const Branch = styled.div`
  display: inline-block;
  font-weight: 800;
  font-size: 16px;
`;
const Result = styled.div`
  display: flex;
  align-items: center;
  margin-left: var(--margin-md);
`;

const ResultInfo = styled.div`
  margin-left: var(--margin-min);
  font-size: 11px;
  font-weight: 600;
  color: var(--font-h1);
`;

export default AboutMainItemStatus;
