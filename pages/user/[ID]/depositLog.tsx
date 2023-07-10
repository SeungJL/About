import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/MainLoading";
import Header from "../../../components/layouts/Header";
import {
  useDepositLogQuery,
  useDepositQuery,
} from "../../../hooks/user/pointSystem/queries";

function ScoreLog() {
  const { data } = useDepositQuery();
  const { data: depositLog, isLoading } = useDepositLogQuery();

  console.log(data, depositLog);
  const filterLog = depositLog?.filter((item) => item?.meta?.value);

  return (
    <>
      <Header title="보증금 기록" url="/user" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          <MyPoint>
            <span>보증금</span>
            <FontAwesomeIcon icon={faArrowRight} />
            <span>{data?.deposit}원</span>
          </MyPoint>
          <Container>
            <LogHeader>
              <Date>날짜</Date>
              <Content>내용</Content>
              <Point>금액</Point>
            </LogHeader>
            {filterLog?.reverse().map((item, idx) => (
              <Item key={idx}>
                <Date>{dayjs(item?.timestamp).format("M.DD")}</Date>
                <Content>{item?.message}</Content>
                <Point>
                  {item?.meta.value > 0 && "+"}
                  {item?.meta.value} 원
                </Point>
              </Item>
            ))}
          </Container>
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div`
  margin-top: 20px;
  padding: 0 14px;
  font-weight: 600;
`;

const LogHeader = styled.header`
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--font-h5);
  font-size: 13px;
  > span {
    text-align: center;
  }
  > span:first-child {
    color: var(--font-h1);
  }
`;

const MyPoint = styled.div`
  padding: 0 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 160px;
  height: 40px;
  font-size: 12px;
  border-radius: var(--border-radius-sub);
  border: 1.5px solid var(--color-mint);
  color: var(--font-h3);
  > span:last-child {
    color: var(--font-h1);
    font-size: 17px;
    font-weight: 600;
  }
`;

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  color: var(--font-h1);
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--font-h6);
  font-size: 12px;
`;

const Date = styled.span`
  color: var(--font-h3);
  margin-right: 14px;
  width: 54px;
  text-align: center;
`;

const Content = styled.span`
  flex: 1;
`;

const Point = styled.span`
  color: var(--font-h1);

  text-align: center;
  width: 50px;
`;
export default ScoreLog;
