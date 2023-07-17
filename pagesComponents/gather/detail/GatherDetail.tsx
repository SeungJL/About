import { Button } from "@chakra-ui/react";
import {
  faCalendarDays,
  faChevronDown,
  faDoorOpen,
  faKey,
  faLocationDot,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { CopyBtn } from "../../../components/common/Icon/CopyIcon";
import { IGatherContent } from "../../../types/page/gather";
dayjs.locale("ko");

interface IGatherDetailInfo {
  data: IGatherContent;
}

function GatherDetailInfo({
  data: { location, date, age, memberCnt, user, password },
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
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-top: var(--margin-md);
  > span:nth-child(2) {
    margin: 0 var(--margin-md);
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
  font-size: 12px;
`;

export default GatherDetailInfo;
