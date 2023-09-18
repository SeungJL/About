import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import AdminLocationSelector from "../../../components/common/AdminLocationSelector";
import { MainLoading } from "../../../components/common/MainLoading";
import Header from "../../../components/layout/Header";
import { birthToAge } from "../../../helpers/converterHelpers";
import { useUserRequestQuery } from "../../../hooks/user/queries";
import { IUserRequest } from "../../../types/user/userRequest";

function AdminGroupGather() {
  const [initialData, setInitialData] = useState<IUserRequest[]>();
  const [suggestData, setSuggestData] = useState<IUserRequest[]>();

  const { isLoading } = useUserRequestQuery({
    onSuccess(data) {
      setInitialData(data.filter((item) => item.category === "조모임"));
    },
  });

  return (
    <>
      <Header title="조모임 신청 확인" url="/admin" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          <Nav>
            <AdminLocationSelector
              initialData={initialData}
              setRequestData={setSuggestData}
              type="request"
            />
          </Nav>
          {suggestData
            ?.slice()
            .reverse()
            .map((item, idx) => {
              const [birth, mbti] = item.title.split("-");
              const age = birthToAge(birth);

              return (
                <Item key={idx}>
                  <Wrapper>
                    <ItemHeader>
                      <Title>
                        {item.writer} {age} {mbti}
                      </Title>
                      <div>
                        <span>{dayjs(item.updatedAt).format("M월 D일")}</span>
                      </div>
                    </ItemHeader>
                    <Content>{item.content}</Content>
                  </Wrapper>
                </Item>
              );
            })}
        </Layout>
      )}
    </>
  );
}

const Layout = styled.div``;

const Nav = styled.nav`
  margin: 0 var(--margin-main);
  margin-top: var(--margin-sub);
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 6px solid var(--font-h6);
  padding: 16px 0;
`;
const Wrapper = styled.div`
  padding: 0 16px;
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

export default AdminGroupGather;
