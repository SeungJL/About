import { Button } from "@chakra-ui/react";
import styled from "styled-components";
import { MainLoading } from "../../components/common/MainLoading";
import Header from "../../components/layout/Header";
import { useUserRequestQuery } from "../../hooks/user/queries";

function CheckAbsent() {
  const { data, isLoading } = useUserRequestQuery();
  const suggestData = data?.filter((item) => item.category === "불참");

  return (
    <>
      <Header title="당일불참 확인" url="/admin" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          {suggestData
            ?.slice()
            .reverse()
            .map((item, idx) => (
              <Item key={idx}>
                <ItemHeader>
                  <Title>{item?.title}</Title>
                  <div>
                    <span>{item.writer || "익명"}</span>
                    <span>2022-08-14</span>
                  </div>
                </ItemHeader>
                <Content>{item.content}</Content>
                <ButtonNav>
                  <Button mr="var(--margin-md)" size="md">
                    인정
                  </Button>
                  <Button ml="auto" size="md" colorScheme="mintTheme">
                    확인
                  </Button>
                </ButtonNav>
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
  padding: var(--padding-main);
`;

const ItemHeader = styled.header`
  min-height: 30px;
  display: flex;
  justify-content: space-between;
  flex: 1;
  margin-top: 10px;
  > div {
    span {
      font-size: 10px;
      color: var(--font-h3);
      margin-left: 8px;
    }
  }
`;

const ButtonNav = styled.div`
  margin-left: auto;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  width: 240px;
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

export default CheckAbsent;
