import styled from "styled-components";
import { Badge } from "../../../components/common/customComponents/Badges";
import { STATUS_TO_TEXT } from "../../../constants/util/convert";

import { GatherStatus } from "../../../types/page/gather";

interface IGatherTitle {
  title: string;
  status: GatherStatus;
}

function GatherTitle({ status, title }: IGatherTitle) {
  const color =
    status === "pending" ? "mintTheme" : status === "open" ? "redTheme" : null;

  return (
    <Layout status={status}>
      <Badge text={STATUS_TO_TEXT[status]} colorScheme={color} size="lg" />
      <span>{title}</span>
    </Layout>
  );
}

const Layout = styled.div<{ status: GatherStatus }>`
  padding: Var(--gap-4);
  background-color: white;
  color: var(--gray-1);
  font-size: 16px;
  font-weight: 700;
  border-bottom: var(--border-light);
  > span:last-child {
    margin-left: var(--gap-2);
  }
`;

export default GatherTitle;
