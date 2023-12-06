import styled from "styled-components";
import { Badge } from "../../../../../components/common/customComponents/Badges";
import { SingleLineText } from "../../../../../styles/layout/components";
import { GatherStatus } from "../../../../../types/page/gather";

interface IAboutGatherBlockStatus {
  status: GatherStatus;
  title: string;
}

function AboutGatherBlockStatus({ status, title }: IAboutGatherBlockStatus) {
  const badgeStyle =
    status === "open"
      ? { text: "오픈", color: "redTheme" }
      : status === "pending"
      ? { text: "모집중", color: "mintTheme" }
      : { text: "취소", color: "blackAlpha" };
  return (
    <Layout>
      <Branch>{title}</Branch>
      <Badge
        colorScheme={badgeStyle.color}
        text={badgeStyle.text}
        type="outline"
      />
      {/* {status === "open" ? (
        
        <Badge p="2px 4px" colorScheme="redTheme" variant="outline">
          오픈
        </Badge>
      ) : status === "pending" ? (
        <Badge p="2px 4px" colorScheme="mintTheme" variant="outline">
          모집중
        </Badge>
      ) : status === "close" ? (
        <Badge p="2px 4px" colorScheme="blackAlpha" variant="outline">
          취소
        </Badge>
      ) : null} */}
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
  width: 79%;
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
