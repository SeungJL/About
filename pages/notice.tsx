import styled from "styled-components";
import CreateNotice from "../components/Notice/CreateNotice";
import NoticeCategory from "../components/Notice/NoticeCategory";
import NoticeContents from "../components/Notice/NoticeContents";
import Seo from "../components/Seo";
import Header from "./Header";

const NoticeLayout = styled.div`
  height: 100vh;
`;

const MainContent = styled.main`
  background: RGB(113, 85, 63);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 93%;
  border-radius: 10px;

  padding: 15px 5px;
`;

function Notice() {
  return (
    <NoticeLayout>
      <Seo title="Notice" />
      <Header />
      <MainContent>
        <NoticeCategory />
        <NoticeContents />
      </MainContent>
    </NoticeLayout>
  );
}
export default Notice;
