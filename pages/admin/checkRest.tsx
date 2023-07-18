import styled from "styled-components";
import { MainLoading } from "../../components/common/MainLoading";
import Header from "../../components/layouts/Header";
import { useUserRequestQuery } from "../../hooks/user/queries";

function CheckRest() {
  const { data, isLoading } = useUserRequestQuery();
  const suggestData = data?.filter((item) => item.category === "휴식");

  return (
    <>
      <Header title="휴식신청 확인" url="/admin" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          {suggestData?.map((item, idx) => (
            <Item key={idx}>
              <Title>
                <span>{item.writer || "익명"}</span>
                <span>2022-08-14</span>
                <span> 휴식 신청</span>
              </Title>
              <Content>{item.content}</Content>
            </Item>
          ))}
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div``;

const Item = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 6px solid var(--font-h6);
  padding: 16px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  > span {
    margin-right: 12px;
  }
`;

const Content = styled.div`
  padding: 8px 0;
  color: var(--font-h2);
  font-size: 13px;
  min-height: 48px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

export default CheckRest;
