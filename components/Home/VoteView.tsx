import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 3px;
  height: 124px;
`;
const UpPart = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`;
const ChartView = styled.div`
  display: flex;
`;
const Box = styled.div`
  width: 40px;
  height: 40px;
  background-color: green;
  margin-right: 1px;
`;
const DownPart = styled.div``;
function VoteView({ name, num }) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i);
  }
  return (
    <Container>
      <UpPart>
        <div>이미지</div>
        <ChartView>
          {arr.map((item) => (
            <Box key={item} />
          ))}
        </ChartView>
      </UpPart>
      <DownPart></DownPart>
    </Container>
  );
}
export default VoteView;
