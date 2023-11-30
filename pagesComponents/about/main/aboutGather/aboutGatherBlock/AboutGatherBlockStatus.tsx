import { Badge } from "@chakra-ui/react";

import styled from "styled-components";
import { SingleLineText } from "../../../../../styles/layout/components";

interface IAboutGatherBlockStatus {
  status: string;
  title: string;
}

function AboutGatherBlockStatus({ status, title }: IAboutGatherBlockStatus) {
  console.log(title);
  return (
    <Layout>
      <Branch>{title}</Branch>
      {status === "open" ? (
        <Badge colorScheme="mintTheme" ml="var(--margin-md)">
          Open
        </Badge>
      ) : status === "pending" ? (
        <Badge p="2px 4px" colorScheme="mintTheme" variant="outline">
          모집중
        </Badge>
      ) : status === "free" ? (
        <Badge colorScheme="purple" ml="var(--margin-md)">
          Free
        </Badge>
      ) : null}
    </Layout>
  );
}

const Layout = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Branch = styled(SingleLineText)`
  width: 80%;
  font-weight: 600;
  font-size: 16px;
  text-align: start;
`;
const Result = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  margin-left: var(--margin-md);
  color: var(--font-h2);
`;

const ResultInfo = styled.div`
  margin-left: var(--margin-min);
`;

export default AboutGatherBlockStatus;
