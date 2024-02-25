import styled from "styled-components";
import Slide from "../../components/layout/PageSlide";

import Header from "../../components/layout/Header";
import Accordion from "../../components/templates/Accordion";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import { ACCORDION_CONTENT_FAQ } from "../../constants/contents/accordionContents";

function Faq() {
  return (
    <>
      <Header title="자주 묻는 질문" />
      <Slide>
        <Layout>
          <SectionBar title="동아리 가이드" />
          <Container>
            <Accordion contentArr={ACCORDION_CONTENT_FAQ} isFull={true} />
          </Container>
        </Layout>
      </Slide>
    </>
  );
}

const Layout = styled.div``;

const Container = styled.div``;

export default Faq;
