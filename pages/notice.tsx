import styled from "styled-components";
import CreateNotice from "../components/Notice/CreateNotice";
import NoticeCategory from "../components/Notice/NoticeCategory";
import NoticeContents from "../components/Notice/NoticeContents";
import Seo from "../components/Seo";

const Container = styled.div`
  height: 100%;
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 80%;
  margin-bottom: 25px;
  margin-top: 10px;
`;

function Notice() {
  return (
    <Container>
      <Seo title="Notice" />

      <MainContent>
        <NoticeCategory />
        <NoticeContents />
      </MainContent>
      <CreateNotice />
    </Container>
  );
}
export default Notice;
