import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import MyProfile from "../../pagesComponents/friend/MyProfile";

function Friend() {
  return (
    <>
      <Header title="친구">
        <FontAwesomeIcon icon={faBalanceScale} />
      </Header>
      <Layout>
        <MyProfile />
      </Layout>
    </>
  );
}

const Layout = styled.div``;

export default Friend;
