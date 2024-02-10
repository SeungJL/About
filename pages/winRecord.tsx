import { faCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import Header from "../components/layout/Header";
import { WIN_RECORD } from "../storage/winRecord";

function WinRecord() {
  return (
    <>
      <Header title="당첨자 로그" url={"/home"} />
      <Layout>
        <Container>
          <LogHeader>
            <Date>날짜</Date>
            <Content>당첨 선물</Content>
            <Point>당첨자</Point>
          </LogHeader>
          <>
            {WIN_RECORD.slice()
              .reverse()
              .map((item, idx) => (
                <Item key={idx}>
                  <Date>{dayjs(item.date).format("M.DD")}</Date>
                  <Content>{item.present}</Content>
                  <Point>
                    {item.name} <FontAwesomeIcon icon={faCircle} size="sm" />
                  </Point>
                </Item>
              ))}
          </>
        </Container>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: var(--margin-max);
  font-weight: 600;
`;

const LogHeader = styled.header`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-sub);
  font-size: 13px;
  > span {
    text-align: center;
  }
  > span:first-child {
    color: var(--font-h1);
  }
  > span:last-child {
    padding-left: var(--padding-min);
  }
`;

const Container = styled.div`
  margin-top: var(--margin-max);
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  color: var(--font-h1);
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border-sub);
  font-size: 12px;
`;

const Date = styled.span`
  color: var(--font-h3);
  margin-right: var(--margin-main);
  width: 54px;
  text-align: center;
`;

const Content = styled.span`
  flex: 1;
`;

const Point = styled.span`
  width: 64px;
  text-align: center;
`;

export default WinRecord;
