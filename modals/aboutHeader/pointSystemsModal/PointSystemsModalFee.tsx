import {
  faAlarmClock,
  faCalendarXmark,
  faCircleXmark,
  faDoNotEnter,
  faScaleBalanced,
  faUserPilot,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { POINT_SYSTEM_Deposit } from "../../../constants/contentsValue/pointSystem";

function PointSystemsModalFee() {
  return (
    <>
      <Layout>
        <Item>
          <Name>스터디 지각</Name>
          <FontAwesomeIcon fontSize="32px" icon={faAlarmClock} />
          <Point>{-POINT_SYSTEM_Deposit.STUDY_ATTEND_LATE.value}원</Point>
        </Item>
        <Item>
          <Name>당일 불참 1</Name>
          <FontAwesomeIcon fontSize="32px" icon={faDoNotEnter} />
          <Point>{-POINT_SYSTEM_Deposit.STUDY_ABSENT_BEFORE.value}원</Point>
        </Item>
        <Item>
          <Name>당일 불참 2</Name>
          <FontAwesomeIcon fontSize="32px" icon={faCircleXmark} />
          <Point>{-POINT_SYSTEM_Deposit.STUDY_ABSENT_AFTER.value}원</Point>
        </Item>
        <Item>
          <Name>한달 정산</Name>
          <FontAwesomeIcon fontSize="32px" icon={faCalendarXmark} />
          <Point>{-POINT_SYSTEM_Deposit.STUDY_MONTH_CALCULATE.value}원</Point>
        </Item>
        <Item>
          <Name>규칙</Name>
          <FontAwesomeIcon fontSize="32px" icon={faScaleBalanced} />
          <Point>OUT</Point>
        </Item>
        <Item>
          <Name>운영진 경고</Name>
          <FontAwesomeIcon fontSize="32px" icon={faUserPilot} />
          <Point>OUT</Point>
        </Item>
      </Layout>
      <Contents>
        <li>지각은 1시간 기준</li>
        <li>당일 불참 기준은 스터디 시작 이전과 이후로 분류</li>
        <li>한 달에 1회 이상 스터디 참여</li>
        <li>규칙이나 운영진 판단하에 퇴출될 수 있음</li>
      </Contents>
    </>
  );
}

const Layout = styled.div`
  margin-top: var(--margin-min);
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
  padding: var(--padding-md);
`;

const Name = styled.span`
  margin-bottom: var(--margin-md);
  font-size: 12px;
`;

const Point = styled.span`
  margin-top: var(--margin-md);
  color: var(--color-red);
`;
const Contents = styled.div`
  margin-top: var(--margin-sub);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: var(--line-height);
  font-size: 12.5px;
  color: var(--font-h2);
  margin-left: var(--margin-min);
`;

export default PointSystemsModalFee;
