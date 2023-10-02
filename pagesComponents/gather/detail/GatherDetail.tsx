import { Button } from "@chakra-ui/react";
import {
  faCalendarDays,
  faChevronDown,
  faDoorOpen,
  faKey,
  faLocationDot,
  faUser,
  faVenusMars,
} from "@fortawesome/pro-solid-svg-icons";
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
        <span>
          {date === "미정"
            ? date
            : dayjsToFormat(dayjs(date), "M.D(ddd) 오후 h:mm")}
        </span>
      </Item>
      <Item>
        <IconWrapper>
          <FontAwesomeIcon icon={faUser} color="var(--font-h3)" />
        </IconWrapper>
        <span>
          {age[0]}~{age[1]}세
        </span>
        {genderCondition && (
          <FontAwesomeIcon icon={faVenusMars} color="#9E7CFF" />
        )}
      </Item>
      <Item>
        <IconWrapper>
          <FontAwesomeIcon icon={faDoorOpen} color="var(--font-h3)" />
        </IconWrapper>
        <span>{memberCnt.min}명 이상 오픈</span>
      </Item>
      {isOrganizer && password && (
        <Item>
          <IconWrapper>
            <FontAwesomeIcon icon={faKey} color="var(--font-h3)" />
          </IconWrapper>
          <span>암호키</span>
          <Secret>
            <Button size="xs" disabled colorScheme="blackAlpha" mr="8px">
              {password}
            </Button>
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
  margin-top: var(--margin-md);
  line-height: 2;
  font-size: 13px;

  color: var(--font-h2);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  > span:nth-child(2) {
    margin: 0 var(--margin-min);
  }
`;

const IconWrapper = styled.div`
  width: 16px;
  text-align: center;
`;

const LocationSub = styled.div`
  color: var(--font-h3);
  font-size: 12px;
  margin-top: var(--margin-min);
  margin-left: var(--margin-max);
`;

const Secret = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export default GatherDetailInfo;
