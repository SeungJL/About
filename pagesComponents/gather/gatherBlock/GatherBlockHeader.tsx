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
        return { text: "모집중", color: "mintTheme" };
      case "open":
        return { text: "오픈", color: "redTheme" };
      case "close":
        return { text: "취소", color: "blackAlpha" };
      default:
        return null;
    }
  };

  const { text, color } = getStatusBadge(status);

  return (
    <Layout>
      <Category>{typeTitle}</Category>
      <Badge p="2px 6px" colorScheme={color} fontSize="13px" variant="outline">
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

const Category = styled.span`
  color: var(--font-h3);
`;

export default GatherBlockHeader;
