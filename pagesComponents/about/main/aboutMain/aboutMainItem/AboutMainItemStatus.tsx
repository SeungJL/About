import { Badge } from "@chakra-ui/react";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { studyStartTimeState } from "../../../../../recoil/studyAtoms";
import { Status } from "../../../../../types/statistics";

interface IAboutMainItemStatus {
  status: string;
  statusFixed: Status | "myOpen";
  branch: string;
}

function AboutMainItemStatus({
  statusFixed,
  status,
  branch,
}: IAboutMainItemStatus) {
  const studyStartTime = useRecoilValue(studyStartTimeState);
  return (
    <Layout>
      <Branch>{branch}</Branch>
      {status !== "pending" && status === "open" ? (
        <Badge colorScheme="green" ml="8px">
          Open
        </Badge>
      ) : status !== "pending" && status === "dismissed" ? (
        <Badge colorScheme="blackAlpha" ml="8px">
          Closed
        </Badge>
      ) : status === "free" ? (
        <Badge colorScheme="purple" ml="8px">
          Free
        </Badge>
      ) : null}
      {statusFixed === "myOpen" && studyStartTime && (
        <Result>
          <FontAwesomeIcon icon={faClock} size="sm" />
          <ResultInfo>{studyStartTime?.format("HH:mm")} ~</ResultInfo>
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
  margin-left: 8px;
`;

const ResultInfo = styled.div`
  margin-left: 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--font-h);
`;

export default AboutMainItemStatus;
