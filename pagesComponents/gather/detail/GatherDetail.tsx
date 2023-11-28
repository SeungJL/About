import { faChevronDown, faVenusMars } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../../components/common/Icon/CopyIcon";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { IGather } from "../../../types/page/gather";
dayjs.locale("ko");

interface IGatherDetailInfo {
  data: IGather;
}

function GatherDetailInfo({
  data: { location, date, age, memberCnt, user, password, genderCondition },
}: IGatherDetailInfo) {
  const { data: session } = useSession();
  const isOrganizer = user?.uid === session?.uid;
  const [isSubLocation, setIsSubLocation] = useState(false);

  return (
    <Layout>
      <FirstItem isOpen={isSubLocation} onClick={() => setIsSubLocation(true)}>
        <ItemText>장소</ItemText>
        <span>{location.main}</span>
        <FontAwesomeIcon icon={faChevronDown} size="2xs" />
      </FirstItem>
      {isSubLocation && <LocationSub>{location.sub}</LocationSub>}
      <Item>
        <ItemText>날짜</ItemText>
        <span>
          {date === "미정"
            ? date
            : dayjsToFormat(dayjs(date), "M.D(ddd) 오후 h:mm")}
        </span>
      </Item>
      <Item>
        <ItemText>나이</ItemText>
        <span>
          {age[0]} ~ {age[1]}세
        </span>
        {genderCondition && (
          <FontAwesomeIcon icon={faVenusMars} color="#9E7CFF" />
        )}
      </Item>
      <Item>
        <ItemText>오픈</ItemText>
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

export default GatherDetailInfo;
