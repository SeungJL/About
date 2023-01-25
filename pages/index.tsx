import styled from "styled-components";
import DownScreen from "../components/Home/DownScreen";
import UpScreen from "../components/Home/UpScreen";

const Container = styled.div`
  position: relative;
`;

function Home() {
  return (
    <Container>
      <UpScreen />
      <DownScreen />
    </Container>
  );
}
export default Home;
