import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import AboutCallender from "../../components/Pages/About/AboutCallender";
import AboutHeader from "../../components/Pages/About/AboutHeader";
import AboutMain from "../../components/Pages/About/AboutMain";

function About() {
  const [dayCnt, setDayCnt] = useState(7);
  const { data: session } = useSession();
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);

  useEffect(() => {
    if (session?.isActive === false) setIsShowRegisterForm(true);
  }, [session?.isActive]);

  return (
    <Layout>
      <AboutHeader dayCnt={dayCnt} setDayCnt={setDayCnt} />
      <AboutCallender dayCnt={dayCnt} setDayCnt={setDayCnt} />
      <AboutMain />
    </Layout>
  );
}

const Layout = styled.div`
  height: 200vh;
`;

export default About;
