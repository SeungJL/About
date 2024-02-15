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
import { POINT_SYSTEM_Deposit } from "../../../constants/settingValue/pointSystem";

function PointSystemsModalFee() {
  return (
    <>
      <Layout>
        <Item>
          <Name>스터디 지각</Name>
          <FontAwesomeIcon fontSize="32px" icon={faAlarmClock} />
          <Point>{POINT_SYSTEM_Deposit.STUDY_ATTEND_LATE.value}원</Point>
        </Item>
        <Item>
          <Name>당일 불참 1</Name>
          <FontAwesomeIcon fontSize="32px" icon={faDoNotEnter} />
          <Point>{POINT_SYSTEM_Deposit.STUDY_ABSENT_BEFORE.value}원</Point>
        </Item>
        <Item>
          <Name>당일 불참 2</Name>
          <FontAwesomeIcon fontSize="32px" icon={faCircleXmark} />
          <Point>{POINT_SYSTEM_Deposit.STUDY_ABSENT_AFTER.value}원</Point>
        </Item>
        <Item>
          <Name>한달 정산</Name>
          <FontAwesomeIcon fontSize="32px" icon={faCalendarXmark} />
          <Point>{POINT_SYSTEM_Deposit.STUDY_MONTH_CALCULATE.value}원</Point>
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
        <li>한 달에 1회 이상 스터디 참여 필수</li>
      </Contents>
    </>
  );
}

const Layout = styled.div`
  margin-top: var(--gap-1);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  > div:nth-child(-n + 3) {
    border-bottom: var(--border);
  }
  > div:nth-child(2),
  div:nth-child(5) {
    border-left: var(--border);
    border-right: var(--border);
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--gap-2);
`;

const Name = styled.span`
  margin-bottom: var(--gap-2);
  font-size: 12px;
`;

const Point = styled.span`
  margin-top: var(--gap-2);
  color: var(--color-red);
`;
const Contents = styled.div`
  margin-top: var(--gap-3);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-size: 12.5px;
  color: var(--gray-2);
  margin-left: var(--gap-1);
`;

export default PointSystemsModalFee;
