import styled from "styled-components";
import Header from "../../components/layouts/Header";
function ScoreLog() {
  return (
    <>
      <Header title="점수 기록" url="/point" />
      <Layout>조만간 추가 할게요...!</Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 14px;
  font-size: 18px;
  margin-top: 100px;
  text-align: center;
  font-weight: 600;
`;

export default ScoreLog;
