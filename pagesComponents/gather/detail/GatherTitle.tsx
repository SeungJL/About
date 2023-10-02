import styled from "styled-components";
import { STATUS_TP_COLOR } from "../../../constants/styles";
import { STATUS_TO_TEXT } from "../../../constants/util/convert";

import { GatherStatus } from "../../../types/page/gather";

interface IGatherTitle {
  title: string;
  status: GatherStatus;
}

function GatherTitle({ status, title }: IGatherTitle) {
  return (
    <Layout status={status}>
      <span>{STATUS_TO_TEXT[status]}</span>
      <span>{title}</span>
    </Layout>
  );
}

const Layout = styled.div<{ status: GatherStatus }>`
  color: var(--font-h1);
  font-size: 16px;
  font-weight: 600;
  > span:first-child {
    color: ${(props) => STATUS_TP_COLOR[props.status]};
    margin-right: var(--margin-md);
  }
`;

export default GatherTitle;
