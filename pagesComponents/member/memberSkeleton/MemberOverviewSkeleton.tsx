import { useRouter } from "next/router";
import styled from "styled-components";
import Skeleton from "../../../components/common/masks/skeleton/Skeleton";
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
        <ActiveLocation location={location as Location}>
          <span>활동 장소</span>
          <StudySpaces location={location as Location}>
            <Skeleton>temp</Skeleton>
          </StudySpaces>
        </ActiveLocation>
      </Info>
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-md) 0;
  margin: 0 var(--margin-main);
`;
const Title = styled.div`
  width: 75px;
  font-weight: 600;
`;

const Info = styled.div`
  font-size: 12px;
  margin-top: var(--margin-md);
  line-height: 2;
  > li {
    display: flex;
    margin-left: -2px;
    list-style-type: none;

    > span:first-child {
      margin-right: var(--margin-md);
      font-weight: 600;
      color: var(--font-h1);
    }
    > span:last-child {
      display: inline-block;
      height: 20px;
    }
  }
  > li::before {
    content: "•";
    font-size: 10px;
    padding-right: var(--padding-md);
  }
`;

const ActiveLocation = styled.li<{ location: Location }>`
  height: ${(props) => (props.location !== "안양" ? "48px" : "24px")};
`;

const StudySpaces = styled.div<{ location: Location }>`
  flex: 1;

  color: var(--font-h2);
  margin-top: 4px;
  height: ${(props) => (props.location !== "안양" ? "40px" : "20px")};

  > span {
    margin-right: var(--margin-min);
  }
`;

export default MemberOverviewSkeleton;
