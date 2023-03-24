import styled from "styled-components";
import AttendChart from "../../../components/utils/AttendChart";

function UserInfoBadge() {
  return (
    <Layout>
      <Contatiner>
        <Text>흭득한 배지가 없습니다</Text>
      </Contatiner>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Contatiner = styled.div`
  width: 90%;
  height: 90%;
  border: 1px solid var(--font-h5);
  border-radius: 6px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.span`
  color: var(--font-h2);
  font-size: 13px;
`;

export default UserInfoBadge;
