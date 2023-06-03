import { Button } from "@chakra-ui/react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import { useScoreQuery } from "../../hooks/user/pointSystem/queries";
import { useUserInfoQuery } from "../../hooks/user/queries";
function ScoreLog() {
  const temp = [
    { date: "2023-05-27", point: 10, content: "테스트" },
    { date: "2023-05-29", point: 10, content: "테스트" },
    { date: "2023-05-30", point: -5, content: "테스트" },
  ];
  const { data } = useScoreQuery();

  return (
    <>
      <Header title="점수 기록" url="/point" />
      <Layout>
        {" "}
        <MyPoint>
          <span>내 점수</span>
          <FontAwesomeIcon icon={faArrowRight} />
          <span>{data?.score}점</span>
        </MyPoint>
        <Container>
          {temp?.map((item, idx) => (
            <Item key={idx}>
              <Date>{dayjs(item?.date).format("MM.DD")}</Date>
              <Content>{item?.content}</Content>
              <Point>
                {item?.point > 0 && "+"}
                {item?.point} 점
              </Point>
            </Item>
          ))}
        </Container>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin-top: 20px;
  padding: 0 14px;
  font-weight: 600;
`;

const MyPoint = styled.div`
  padding: 0 8px;

  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 160px;
  height: 40px;

  border-radius: var(--border-radius);
  border: 1.5px solid var(--color-mint);
  color: var(--color-mint);
  > span:last-child {
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
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--font-h5);
`;

const Date = styled.span`
  color: var(--font-h3);
  margin-right: 14px;
`;

const Content = styled.span`
  flex: 1;
`;

const Point = styled.span``;
export default ScoreLog;
