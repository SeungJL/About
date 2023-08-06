import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
import AdminLocationSelector from "../../components/common/AdminLocationSelector";
import { MainLoading } from "../../components/common/MainLoading";
import Header from "../../components/layout/Header";
import { useUserRequestQuery2 } from "../../hooks/user/queries";
import { IUserRequest } from "../../types/user/userRequest";

function CheckRest() {
  const [initialData, setInitialData] = useState<IUserRequest[]>();
  const [suggestData, setSuggestData] = useState<IUserRequest[]>();
  const { isLoading } = useUserRequestQuery2({
    onSuccess(data) {
      setInitialData(data.filter((item) => item.category === "휴식"));
    },
  });

  return (
    <>
      <Header title="휴식신청 확인" url="/admin" />
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
          {suggestData?.map((item, idx) => {
            const [type, date, content] = item.content.split(`/`);

            return (
              <Item key={idx}>
                <div>
                  <span>이름:</span>
                  <span>{item.writer}</span>
                </div>
                <div>
                  <span>날짜:</span>
                  <span>{dayjs(item.updatedAt).format("YYYY-MM-DD")} </span>
                </div>
                <div>
                  <span>종류:</span>
                  <span>{type}</span>
                </div>
                <div>
                  <span>기간:</span>
                  <span>{date}</span>
                </div>
                <div>
                  <span>내용:</span>
                  <span>{content} </span>
                </div>
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
  line-height: var(--line-height);
  border-bottom: 8px solid var(--font-h56);
  padding: var(--padding-sub) var(--padding-main);
  font-size: 13px;
  color: var(--font-h2);
  > div {
    > span:first-child {
      font-weight: 600;
      margin-right: var(--margin-sub);
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    font-size: 14px;
    font-weight: 600;
    margin-right: 12px;
  }
  > span:last-child {
    font-size: 11px;
    color: var(--font-h2);
  }
`;

const Content = styled.div`
  padding: var(--padding-md) 0;
  color: var(--font-h2);
  font-size: 13px;
  display: flex;
  flex-direction: column;
  line-height: var(--line-height);
  > div {
    > span:first-child {
      margin-right: var(--margin-md);
    }
  }
`;

export default CheckRest;
