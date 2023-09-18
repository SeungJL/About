import dayjs from "dayjs";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/MainLoading";
import Header from "../../../components/layout/Header";
import { useUserRequestQuery } from "../../../hooks/user/queries";

function AdminPromotion() {
  const { data, isLoading } = useUserRequestQuery();

  const suggestData = data?.filter((item) => item.category === "홍보");

  return (
    <>
      <Header title="홍보기록 확인" url="/admin" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          {suggestData
            ?.slice()
            .reverse()
            .map((item, idx) => (
              <Item key={idx}>
                <span>{item?.writer}</span>
                <span>{dayjs(item?.updatedAt).format("YYYY-MM-DD")}</span>
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
  padding: 12px;
  border-bottom: 1px solid var(--font-h5);
  > span {
    margin-right: 12px;
  }
`;

export default AdminPromotion;
