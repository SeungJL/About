import {
  faCalendarDays,
  faChevronDown,
  faDoorOpen,
  faLocationDot,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import { IGatherContent } from "../../../types/gather";
dayjs.locale("ko");

interface IGatherDetailInfo {
  data: IGatherContent;
}

function GatherDetailInfo({
  data: { location, date, age, memberCnt },
}: IGatherDetailInfo) {
  const [isSubLocation, setIsSubLocation] = useState(false);

  return (
    <Layout>
      <Item onClick={() => setIsSubLocation(true)}>
        <IconWrapper>
          <FontAwesomeIcon icon={faLocationDot} color="var(--font-h3)" />
        </IconWrapper>
        <span>{location.main}</span>
        <FontAwesomeIcon icon={faChevronDown} size="2xs" />
      </Item>
      {isSubLocation && <LocationSub>{location.sub}</LocationSub>}
      <Item>
        <IconWrapper>
          <FontAwesomeIcon icon={faCalendarDays} color="var(--font-h3)" />
        </IconWrapper>
        <span>{dayjs(date).format("M.DD(ddd) 오후 h:mm")}</span>
      </Item>
      <Item>
        <IconWrapper>
          <FontAwesomeIcon icon={faUser} color="var(--font-h3)" />
        </IconWrapper>
        <span>
          {age[0]}~{age[1]}세
        </span>
        <FontAwesomeIcon icon={faVenusMars} color="#9E7CFF" />
      </Item>
      <Item>
        <IconWrapper>
          <FontAwesomeIcon icon={faDoorOpen} color="var(--font-h3)" />
        </IconWrapper>
        <span>{memberCnt.min}명 이상 오픈</span>
      </Item>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 6px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  > span:nth-child(2) {
    margin: 0 8px;
  }
`;

const IconWrapper = styled.div`
  width: 16px;
  text-align: center;
`;

const LocationSub = styled.div`
  color: var(--font-h3);
  font-size: 12px;
  margin-top: 6px;
  margin-left: 20px;
`;

export default GatherDetailInfo;
