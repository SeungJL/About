import { Badge } from "@chakra-ui/react";
import styled from "styled-components";
import { GatherStatus } from "../../../types/page/gather";
import { Location } from "../../../types/system";

interface IGatherBlockHeader {
  status: GatherStatus;
  typeTitle: string;
  locationMain: string;
  openLocation: Location;
}

function GatherBlockHeader({
  status,
  typeTitle,
  locationMain,
  openLocation,
}: IGatherBlockHeader) {
  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "모집중";
      case "open":
        return "오픈";
      case "close":
        return "취소";
      default:
        return null;
    }
  };

  return (
    <Layout>
      <Detail>
        <OpenLocation>{openLocation}</OpenLocation>·
        <Category>{typeTitle}</Category>·<Location>{locationMain}</Location>
      </Detail>
      <Badge
        colorScheme={
          status === "pending"
            ? "blue"
            : status === "open"
            ? "mintTheme"
            : status === "close"
            ? "blackAlpha"
            : "blue"
        }
        fontSize="12px"
        variant="outline"
      >
        {getStatusText(status)}
      </Badge>
    </Layout>
  );
}

const Layout = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Detail = styled.div`
  color: var(--font-h3);
  font-size: 12px;
`;

const OpenLocation = styled.span`
  margin-right: var(--margin-min);
`;

const Category = styled.span`
  margin: 0 var(--margin-min);
`;

const Location = styled.span`
  margin: 0 var(--margin-min);
`;

export default GatherBlockHeader;
