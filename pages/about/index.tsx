import styled from "styled-components";
import AboutCallender from "../../components/Pages/About/AboutCallender";
import AboutHeader from "../../components/Pages/About/AboutHeader";

function About() {
  return (
    <Layout>
      <AboutHeader />
      <AboutCallender />
    </Layout>
  );
}

const Layout = styled.div`
  height: 200vh;
`;

export default About;
