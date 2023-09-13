import styled from "styled-components";
import AboutUpperBarHeader from "./AboutUpperBarHeader";
import AboutUpperBarResult from "./AboutUpperBarResult";

function AboutUpperBar() {
  return (
    <Layout>
      <AboutUpperBarHeader />
      <AboutUpperBarResult />
    </Layout>
  );
}

const Layout = styled.div`
  padding: var(--padding-main);
  padding-bottom: 0;
`;

export default AboutUpperBar;
