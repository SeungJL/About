import { useState } from "react";
import styled from "styled-components";
import AboutCallender from "../../components/Pages/About/AboutCallender";
import AboutHeader from "../../components/Pages/About/AboutHeader";

function About() {
  const [dayCnt, setDayCnt] = useState(7);
  return (
    <Layout>
      <AboutHeader setDayCnt={setDayCnt} />
      <AboutCallender dayCnt={dayCnt} />
    </Layout>
  );
}

const Layout = styled.div`
  height: 200vh;
`;

export default About;
