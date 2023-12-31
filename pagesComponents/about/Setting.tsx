import styled from "styled-components";
import DateSetting from "../setting/DateSetting";
import StudySetting from "../setting/StudySetting";
import UserSetting from "../setting/UserSetting";

function Setting() {
  return (
    <Layout>
      <DateSetting />
      <UserSetting />
      <StudySetting />
    </Layout>
  );
}

const Layout = styled.div``;

export default Setting;
