import styled from "styled-components";
import CreateNotice from "../components/Pages/Notice/CreateNotice";
import NoticeCategory from "../components/Pages/Notice/NoticeCategory";
import NoticeContents from "../components/Pages/Notice/NoticeContents";
import Seo from "../components/common/Seo";
import Header from "../components/common/Header";

const NoticeLayout = styled.div`
  height: 100vh;
`;

const MainContent = styled.main`
  background: RGB(113, 85, 63, 0.9);
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
      <Header title="공지사항" />
      <MainContent>
        <NoticeCategory />
        <NoticeContents />
      </MainContent>
    </NoticeLayout>
  );
}
export default Notice;
