import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParticipationRateQuery } from "../../../hooks/user/queries";
import { getMonth, now } from "../../../libs/utils/dateUtils";

export default function RecordAttend() {
  const lastMonth = dayjs().subtract(1, "M").month();
  const [month, setMonth] = useState(lastMonth);
  const monthDayjs = dayjs().month(month);
  const [warningList, setWarningList] = useState([]);
  const [GoodList, setGoodList] = useState([]);

  const attendData = useParticipationRateQuery(
    monthDayjs.date(1),
    monthDayjs.date(dayjs().month(month).daysInMonth())
  );

  useEffect(() => {
    if (attendData.isSuccess) {
      const data = attendData.data;
      const good = [];
      const warning = [];
      Object.keys(data).forEach((key) => {
        const cnt = Number(data[key]);
        if (cnt >= 3) good.push(key);
        else if (cnt < 1) warning.push(key);
      });
      setGoodList(good);
      setWarningList(warning);
    }
  }, [month]);

  const convertedMonth = month + 1;
  return (
    <Layout>
      <span>출석</span>
      <Header>
        <FontAwesomeIcon icon={faLeftLong} />
        <span>{convertedMonth}월 기록</span>
        <FontAwesomeIcon icon={faRightLong} />
      </Header>
      <Nav>
        <select name="RecordAttend" id="attendSelect">
          <option value="전체">전체</option>
          <option value="벌점">벌점</option>
          <option value="상점">상점</option>
        </select>
      </Nav>
      <Main></Main>
    </Layout>
  );
}

const Layout = styled.div`
  flex-basis: 400px;
  border: 1px solid rgb(0, 0, 0, 0.5);
  padding: 10px;
`;

const Header = styled.header`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const Main = styled.main``;

const Nav = styled.nav``;

const Category = styled.div``;
