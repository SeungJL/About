import styled from "styled-components";
import { GatherStatus } from "../../../types/gather";

interface IGatherTitle {
  title: string;
  status: GatherStatus;
}

function GatherTitle({ status, title }: IGatherTitle) {
  return (
    <Layout status={status}>
      <span>
        {status === "pending"
          ? "모집중"
          : status === "open"
          ? "오픈"
          : status === "close"
          ? "취소"
          : null}
      </span>
      <span>{title}</span>
    </Layout>
  );
}

const Layout = styled.div<{ status: GatherStatus }>`
  color: var(--font-h1);
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  > span:first-child {
    color: ${(props) =>
      props?.status === "pending"
        ? " var(--color-mint)"
        : props?.status === "open"
        ? "var(--color-red)"
        : "var(--font-h4)"};
    margin-right: 8px;
  }
`;

export default GatherTitle;
