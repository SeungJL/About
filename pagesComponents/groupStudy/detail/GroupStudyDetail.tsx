import { faVenusMars } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../../components/common/Icon/CopyIcon";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { IGroupStudy } from "../../../types/page/groupStudy";
dayjs.locale("ko");

interface IGroupStudyDetailInfo {
  data: IGroupStudy;
}

function GroupStudyDetailInfo({
  data: { location, age, memberCnt, date, organizer, password, gender },
}: IGroupStudyDetailInfo) {
  const { data: session } = useSession();
  const isOrganizer = organizer?.uid === session?.uid;
  const [isSubLocation, setIsSubLocation] = useState(false);

  return (
    <Layout>
      <FirstItem isOpen={isSubLocation}>
        <ItemText>지역</ItemText>
        <span>{location}</span>
      </FirstItem>
      <Item>
        <ItemText>개설</ItemText>
        <span>{dayjsToFormat(dayjs(date), "YYYY년 M월 D일")}</span>
      </Item>
      <Item>
        <ItemText>나이</ItemText>
        <span>
          {age[0]} ~ {age[1]}세
        </span>
        {gender && <FontAwesomeIcon icon={faVenusMars} color="#9E7CFF" />}
      </Item>
      <Item>
        <ItemText>인원</ItemText>
        <span>{memberCnt.min}명 이상 오픈</span>
      </Item>
      {isOrganizer && password && (
        <Item>
          <ItemText>암호</ItemText>
          <Secret>
            <span>{password}</span>
            <CopyBtn text={password} />
          </Secret>
        </Item>
      )}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--margin-sub) var(--margin-main);
  padding: var(--padding-md) var(--padding-sub);

  background-color: white;
  border-radius: var(--border-radius2);
  box-shadow: var(--box-shadow-b);
`;

const ItemText = styled.span`
  font-weight: 600;
  margin-right: var(--margin-sub);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-min);
  > span:nth-child(2) {
    margin: 0 var(--margin-min);
  }
`;

const FirstItem = styled(Item)<{ isOpen: boolean }>`
  margin-bottom: ${(props) => (props.isOpen ? "0" : "var(--margin-min)")};
`;

const LocationSub = styled.div`
  color: var(--font-h3);
  font-size: 12px;
  margin: 2px 0;
  margin-left: 44px;
`;

const Secret = styled.div`
  display: flex;
  align-items: center;

  > span:first-child {
    margin-left: var(--margin-min);
    margin-right: var(--margin-md);
  }
`;

export default GroupStudyDetailInfo;
