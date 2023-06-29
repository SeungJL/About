import styled from "styled-components";
import { GatherStatus } from "../../../types/gather";

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
 
  const openLocation = locationMain === "홍대" ? "양천구" : "수원";
  return (
    <Layout>
      <Status status={status}>{getStatusText(status)}</Status>·
      <OpenLocation>{openLocation}</OpenLocation>·
      <Category>{typeTitle}</Category>·<Location>{locationMain}</Location>
    </Layout>
  );
}

const Layout = styled.header`
  font-size: 12px;
  color: var(--font-h3);
  display: flex;
  align-items: center;
`;

const OpenLocation = styled.span`
  margin: 0 4px;
`;

const Status = styled.span<{ status: string }>`
  color: ${(props) =>
    props?.status === "pending"
      ? " var(--color-mint)"
      : props?.status === "open"
      ? "var(--color-red)"
      : "var(--font-h4)"};
  margin-right: 4px;
  font-weight: 600;
`;

const Category = styled.span`
  margin: 0 4px;
`;

const Location = styled.span`
  margin-left: 4px;
`;

export default GatherBlockHeader;
