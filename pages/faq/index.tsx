import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import PageSlide from "../../components/layout/PageSlide";
import Accordion from "../../components/templates/Accordion";
import { ACCORDION_CONTENT_FAQ } from "../../constants/contents/accordionContents";
import { prevPageUrlState } from "../../recoil/previousAtoms";

function Faq() {
  const prevPageUrl = useRecoilValue(prevPageUrlState);
  return (
    <PageSlide>
      <Header title="자주 묻는 질문" url={prevPageUrl || "/user"} />
      <Layout>
        <Title>ABOUT 동아리 가이드</Title>
        <Container>
          <Accordion contentArr={ACCORDION_CONTENT_FAQ} isFull={true} />
        </Container>
      </Layout>
    </PageSlide>
  );
}

const Layout = styled.div``;

const Title = styled.div`
  margin: var(--margin-max) var(--margin-main);
  font-weight: 800;
  font-size: 20px;
`;

const Container = styled.div``;

export default Faq;
