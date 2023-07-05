import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { MainLoading } from "../../components/common/MainLoading";
import Header from "../../components/layouts/Header";
import {
  useScoreLogQuery,
  useScoreQuery,
} from "../../hooks/user/pointSystem/queries";

function ScoreLog() {
  const { data } = useScoreQuery();
  const { data: scoreLog, isLoading } = useScoreLogQuery();

  const filterLog = scoreLog?.filter((item) => item?.meta?.value);

  return (
    <>
      <Header title="점수 기록" url="/point" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          <MyPoint>
            <span>내 점수</span>
            <FontAwesomeIcon icon={faArrowRight} />
            <span>{data?.score}점</span>
          </MyPoint>
          <Container>
            <LogHeader>
              <Date>날짜</Date>
              <Content>내용</Content>
              <Point>점수</Point>
            </LogHeader>
            {filterLog?.reverse().map((item, idx) => {
              const value = item?.meta.value;
              return (
                <Item key={idx}>
                  <Date>{dayjs(item?.timestamp).format("M.DD")}</Date>
                  <Content>{item?.message}</Content>
                  <Point isMinus={value < 0}>
                    {value > 0 && "+"}
                    {value} 점
                  </Point>
                </Item>
              );
            })}
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

const Point = styled.span<{ isMinus?: boolean }>`
  color: ${(props) => (props.isMinus ? "var(--color-red)" : "var(--font-h1)")};
`;
export default ScoreLog;
