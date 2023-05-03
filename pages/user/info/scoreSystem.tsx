import { StarIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import Header from "../../../components/layouts/Header";

function ScoreSystem() {
  return (
    <>
      <Header title="점수 시스템" />
      <Layout>
        <div>
          <Title>
            <StarIcon boxSize={4} mr="8px" color="var(--color-mint)" />
            점수 및 포인트 흭득 방법
          </Title>
          <Ul>
            <Li>
              스터디 투표
              <b>+ 5점</b>
            </Li>
            <Li>
              당일 참여
              <b>+ 2점</b>
            </Li>
            <Li>
              출석체크
              <b>+ 5점</b>
            </Li>
            <Li>
              건의하기
              <b>+ 3점</b>
            </Li>
            <Li>
              건의 감사
              <b>+ 10점</b>
            </Li>
            <Li>
              홍보 리워드 신청
              <b>+ 10점</b>
            </Li>
          </Ul>
        </div>
        <div>
          <Title>
            <StarIcon boxSize={4} mr="8px" color="var(--color-mint)" />
            스터디가 열리기 위한 조건
          </Title>
          <Ul>
            <Li>
              같은 스터디 장소를 기준으로 3명 이상의 인원이 1시간 이상 참여
              시간이 겹치는 경우에만 열립니다.
            </Li>
            <Li>
              그래서 다른 사람들이 투표를 안하면 어떡하지? 라는 걱정없이 먼저
              투표해주셔도 좋습니다!
            </Li>
          </Ul>
        </div>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  padding: 14px;
  > div {
    margin-bottom: 20px;
  }
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
`;

const Ul = styled.ul`
  padding-left: 18px;
  line-height: 1.8;
  color: var(--font-h2);
`;

const Li = styled.li`
  > b {
    margin-left: 8px;
  }
`;

export default ScoreSystem;
