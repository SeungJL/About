import styled from "styled-components";
import VoteView from "./VoteView";

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const arr = [
  { name: "about", num: 2 },
  { name: "Katalog", num: 4 },
  { name: "Artisee", num: 1 },
  { name: "Ediya", num: 0 },
];

function DownScreen() {
  return (
    <Container>
      {arr.map((item) => (
        <VoteView {...item} key={item.name} />
      ))}
    </Container>
  );
}
export default DownScreen;
