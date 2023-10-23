import { Badge } from "@chakra-ui/react";
import styled from "styled-components";
import { GatherStatus } from "../../../types/page/gather";

interface IGatherBlockHeader {
  status: GatherStatus;
  typeTitle: string;
  locationMain: string;
}

function GatherBlockHeader({
  status,
  typeTitle,
  locationMain,
}: IGatherBlockHeader) {
  const getStatusBadge = (status: GatherStatus) => {
    switch (status) {
      case "pending":
        return { text: "모집중", color: "blue" };
      case "open":
        return { text: "오픈", color: "mintTheme" };
      case "close":
        return { text: "취소", color: "blackAlpha" };
      default:
        return null;
    }
  };

  const { text, color } = getStatusBadge(status);

  return (
    <Layout>
      <Detail>
        <Category>{typeTitle}</Category>·<Location>{locationMain}</Location>
      </Detail>
      <Badge colorScheme={color} fontSize="12px" variant="outline">
        {text}
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

const Category = styled.span`
  margin-right: var(--margin-min);
`;

const Location = styled.span`
  margin: 0 var(--margin-min);
`;

export default GatherBlockHeader;
