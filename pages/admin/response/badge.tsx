import dayjs from "dayjs";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/loaders/MainLoading";
import Header from "../../../components/layout/Header";
import { useUserRequestQuery } from "../../../hooks/admin/quries";

function AdminBadge() {
  const { data, isLoading } = useUserRequestQuery("배지");

  return (
    <>
      <Header title="배지 신청 확인" url="/admin" />
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          {data
            ?.slice()
            .reverse()
            .map((item, idx) => (
              <Item key={idx}>
                <div>
                  <span>{item?.writer}</span>
                  <span>{dayjs(item?.updatedAt).format("YYYY-MM-DD")}</span>
                </div>
                <span>
                  <b>UID:</b> {item.content}
                </span>
                <span>{item.title}</span>
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
  padding: 12px;
  border-bottom: 1px solid var(--font-h5);
  > div:first-child {
    > span:first-child {
      margin-right: var(--margin-md);
    }
    > span:last-child {
      color: var(--font-h3);
      font-size: 12px;
    }
  }
  > span:nth-child(2) {
    font-size: 13px;
    color: var(--font-h2);
    margin-bottom: var(--margin-md);
  }
`;

export default AdminBadge;
