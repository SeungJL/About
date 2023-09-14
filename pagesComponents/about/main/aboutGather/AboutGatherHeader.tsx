import { Badge } from "@chakra-ui/react";
import styled from "styled-components";
import { GatherStatus } from "../../../../types/page/gather";
import { Location } from "../../../../types/system";

interface IAboutGatherHeader {
  place: Location;
  title: string;
  status: GatherStatus;
}

function AboutGatherHeader({ place, title, status }: IAboutGatherHeader) {
  const gatherStatus =
    status === "open" ? "오픈" : status === "pending" ? "모집중" : "취소";
  return (
    <Layout>
      <Badge colorScheme="green">{place}</Badge>
      <Badge mx="var(--margin-md)" colorScheme="orange">
        {title}
      </Badge>
      <Badge colorScheme={status === "open" ? "pink" : "twitter"}>
        {gatherStatus}
      </Badge>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
`;

const Status = styled.span<{ status: GatherStatus }>`
  margin-left: var(--margin-md);
  font-size: 10.5px;
  font-weight: 600;
  /* color: ${(props) =>
    props.status === "open" ? "var(--color-mint)" : null}; */
`;

export default AboutGatherHeader;
