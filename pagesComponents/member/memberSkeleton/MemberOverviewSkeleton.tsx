import { useRouter } from "next/router";
import styled from "styled-components";
import Skeleton from "../../../components/common/skeleton/Skeleton";
import { Location } from "../../../types/system";
function MemberOverviewSkeleton() {
  const router = useRouter();
  const location = router.query.location;

  return (
    <Layout>
      <Title>
        <Skeleton>스터디</Skeleton>
      </Title>
      <Info>
        <li>
          <span>개설 날짜</span>
          <span>
            <Skeleton>temp</Skeleton>
          </span>
        </li>
        <li>
          <span>전체 멤버</span>
          <span>
            <Skeleton>temp</Skeleton>
          </span>
        </li>
        <li>
          <span>활동 멤버</span>
          <span>
            <Skeleton>temp</Skeleton>
          </span>
        </li>
        <li>
          <span>활동 지역</span>
          <StudyLocation location={location as Location}>
            <Skeleton>temp</Skeleton>
          </StudyLocation>
        </li>
      </Info>
    </Layout>
  );
}

const Layout = styled.div`
  padding-top: var(--padding-sub);
  padding-bottom: var(--padding-main);
  margin: 0 var(--margin-main);
`;
const Title = styled.div`
  width: 75px;
  font-weight: 600;
`;

const Info = styled.div`
  font-size: 12px;
  margin-top: var(--margin-main);
  margin-bottom: 8px;
  > li {
    display: flex;
    margin-left: -2px;
    list-style-type: none;
    margin-top: 6px;
    > span:first-child {
      margin-right: var(--margin-md);
    }
    > span:last-child {
      font-weight: 600;
      display: inline-block;
      width: 75px;
    }
  }
  > li::before {
    content: "•";
    font-size: 10px;
    padding-right: var(--padding-md);
  }
`;

const StudyLocation = styled.div<{ location: Location }>`
  flex: 1;
  color: var(--font-h2);
  height: ${(props) => (props.location === "수원" ? "36px" : "18px")};
  > span {
    margin-right: var(--margin-min);
  }
`;

export default MemberOverviewSkeleton;
