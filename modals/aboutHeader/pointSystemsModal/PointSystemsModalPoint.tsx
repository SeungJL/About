import {
  faBadgeCheck,
  faCheckCircle,
  faCheckToSlot,
  faGift,
  faHeartCircle,
  faPartyHorn,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { POINT_SYSTEM_PLUS } from "../../../constants/contentsValue/pointSystem";

function PointSystemsModalPoint() {
  return (
    <Layout>
      <Item>
        <Name>스터디 투표</Name>
        <FontAwesomeIcon fontSize="32px" icon={faCheckToSlot} />
        <Point>{POINT_SYSTEM_PLUS.STUDY_VOTE.value} point</Point>
      </Item>
      <Item>
        <Name>스터디 출석</Name>
        <FontAwesomeIcon fontSize="32px" icon={faCheckCircle} />
        <Point>{POINT_SYSTEM_PLUS.STUDY_ATTEND.value} point</Point>
      </Item>
      <Item>
        <Name>에타 홍보</Name>
        <FontAwesomeIcon fontSize="32px" icon={faGift} />
        <Point>{POINT_SYSTEM_PLUS.PROMOTION.value} point</Point>
      </Item>
      <Item>
        <Name>일일 출석</Name>
        <FontAwesomeIcon fontSize="32px" icon={faBadgeCheck} />
        <Point>{POINT_SYSTEM_PLUS.DAILY_ATTEND.value} point</Point>
      </Item>
      <Item>
        <Name>좋아요</Name>
        <FontAwesomeIcon fontSize="32px" icon={faHeartCircle} />
        <Point>{POINT_SYSTEM_PLUS.LIKE.value} point</Point>
      </Item>
      <Item>
        <Name>이벤트</Name>
        <FontAwesomeIcon fontSize="32px" icon={faPartyHorn} />
        <Point>10 point</Point>
      </Item>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 4px;
  display: grid;

  grid-template-columns: repeat(3, 1fr);
  > div:nth-child(-n + 3) {
    border-bottom: var(--border-main-light);
  }
  > div:nth-child(2),
  div:nth-child(5) {
    border-left: var(--border-main-light);
    border-right: var(--border-main-light);
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--padding-min);
`;

const Name = styled.span`
  margin-bottom: var(--margin-md);
  font-size: 12px;
`;

const Point = styled.span`
  margin-top: var(--margin-md);
  color: var(--color-mint);
`;

export default PointSystemsModalPoint;
