import dayjs from "dayjs";
import { useRouter } from "next/router";
import styled from "styled-components";
import { LOCATION_OPEN_DATE } from "../../constants/location";

import { IPlace } from "../../types/study/studyDetail";
interface IMemberOverview {
  totalMemberCnt: number;
  activeMemberCnt: number;
  locationPlaces: IPlace[];
}

function MemberOverview({
  totalMemberCnt,
  activeMemberCnt,
  locationPlaces,
}: IMemberOverview) {
  const router = useRouter();
  const location = router.query.location;

  const openDate = dayjs(LOCATION_OPEN_DATE[location as string]);
  return (
    <Layout>
      <Title>{location} 지역</Title>
      <Info>
        <li>
          <span>개설 날짜</span>
          <span>{openDate.format("YYYY년 M월 D일")}</span>
        </li>
        <li>
          <span>전체 멤버</span>
          <span>{totalMemberCnt}명</span>
        </li>
        <li>
          <span>활동 멤버</span>
          <span>{activeMemberCnt}명</span>
        </li>
        <li>
          <span>활동 장소</span>
          <StudySpaces>
            {locationPlaces?.map((place) => (
              <span key={place?._id}>{place?.branch}</span>
            ))}
          </StudySpaces>
        </li>
      </Info>
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-md) 0;
  margin: 0 var(--margin-main);
`;

const Title = styled.span`
  font-weight: 600;
`;

const Info = styled.div`
  font-size: 12px;
  line-height: 2;
  margin-top: var(--margin-md);
  > li {
    display: flex;
    margin-left: -2px;
    list-style-type: none;
    > span:first-child {
      margin-right: var(--margin-md);
      font-weight: 600;
      color: var(--font-h1);
    }
  }
  > li::before {
    content: "•";
    font-size: 10px;
    padding-right: var(--padding-min);
  }
`;

const StudySpaces = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  color: var(--font-h1);

  > span {
    margin-right: var(--margin-min);
  }
`;

export default MemberOverview;
