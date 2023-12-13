import { faGear, faUserGroup } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Badge } from "../../../components/common/customComponents/Badges";
import { GatherStatus } from "../../../types/page/gather";

interface IGroupStudyTitle {
  title: string;
  status: GatherStatus;
  memberCnt: number;
}

function GroupStudyTitle({ status, title, memberCnt }: IGroupStudyTitle) {
  const color =
    status === "pending" ? "mintTheme" : status === "open" ? "redTheme" : null;

  const statusText = status === "pending" ? "모집중" : "미모집";

  return (
    <Layout status={status}>
      <Title>
        <div>
          <span>{title}</span>
          <Badge text="모집중" colorScheme={color} size="lg" />
        </div>
        <SettingBtnNav>
          <button>
            <FontAwesomeIcon icon={faUserGroup} size="sm" />
          </button>
          <button>
            <FontAwesomeIcon icon={faGear} size="sm" />
          </button>
        </SettingBtnNav>
      </Title>
      <SubInfo>
        멤버 {memberCnt} · 모임 1 · {statusText}
      </SubInfo>
    </Layout>
  );
}

const Layout = styled.div<{ status: GatherStatus }>`
  padding: Var(--padding-main);
  background-color: white;
  border-bottom: var(--border-sub);
  display: flex;
  flex-direction: column;
`;

const SettingBtnNav = styled.nav`
  display: flex;
  margin-left: auto;
  > button {
    margin-left: var(--margin-md);
    border-radius: 50%;
    background-color: var(--font-h56);
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-min);
  color: var(--font-h1);
  font-size: 18px;

  font-weight: 800;
  > div:first-child {
    > span {
      margin-right: var(--margin-md);
    }
  }
`;

const SubInfo = styled.span`
  font-size: 13px;
  color: var(--font-h3);
`;

export default GroupStudyTitle;
