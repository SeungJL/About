import { faGear, faUserGroup } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Badge } from "../../../components/common/customComponents/Badges";
import { GatherStatus } from "../../../types/page/gather";

interface IGroupStudyTitle {
  title: string;
  status: GatherStatus;
  memberCnt: number;
  isAdmin: boolean;
  category: string;
  maxCnt: number;
}

function GroupStudyTitle({
  isAdmin,
  status,
  title,
  memberCnt,
  category,
  maxCnt,
}: IGroupStudyTitle) {
  const router = useRouter();
  const color =
    status === "pending"
      ? maxCnt > memberCnt
        ? "mintTheme"
        : "redTheme"
      : "redTheme";

  const statusText =
    status === "pending" ? (maxCnt > memberCnt ? "모집중" : "마감") : "마감";

  const onClick = () => {
    router.push(`${router.asPath}/admin`);
  };

  return (
    <Layout status={status}>
      <Title>
        <div>
          <span>{title}</span>
          <Badge text={statusText} colorScheme={color} size="lg" />
        </div>
      </Title>
      <SubInfo>
        <span>
          멤버 {memberCnt} · {category} · {statusText}
        </span>
        {isAdmin && (
          <SettingBtnNav>
            <button>
              <FontAwesomeIcon icon={faUserGroup} size="sm" />
            </button>
            <button onClick={onClick}>
              <FontAwesomeIcon icon={faGear} size="sm" />
            </button>
          </SettingBtnNav>
        )}
      </SubInfo>
    </Layout>
  );
}

const Layout = styled.div<{ status: GatherStatus }>`
  padding: Var(--padding-main);
  padding-bottom: var(--padding-md);
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

const SubInfo = styled.div`
  height: 32px;
  font-size: 13px;
  display: flex;
  color: var(--font-h3);
`;

export default GroupStudyTitle;
