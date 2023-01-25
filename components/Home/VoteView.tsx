import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 4px 25px;
  height: 124px;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 17px;
  box-shadow: 1px 4px 12px 1px rgb(0, 0, 0, 0.15);
  position: relative;
`;
const DownPart = styled.div`
  display: flex;
  flex-direction: row;
  height: 51px;

  > div {
    background-color: RGB(159, 89, 26, 0.1);
  }
  > div:first-child {
    width: 54px;
    height: 54px;
    margin-right: 8px;
    padding: 2px;
    border-radius: 8px;
    > div {
      border-radius: 50px;
      height: 50px;
    }
  }
`;
const ChartView = styled.div`
  border-radius: 11px;
  height: 54px;
  width: 87%;
  display: flex;
  padding: 3px 5px;
  align-items: center;
`;
const Box = styled.div`
  width: 45px;
  height: 45px;
  background-color: RGB(125, 70, 20, 0.9);
  margin-right: 1px;
  border-radius: 8px;
`;
const UpPart = styled.div`
  display: flex;
  height: 47px;
  align-items: center;
  padding-bottom: 7px;
`;
const Title = styled.span`
  width: 100px;
  font-size: 24px;
  text-align: center;
  color: rgb(0, 0, 0, 0.7);
`;
const BtnSection = styled.section`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  margin-right: 10px;
  > button {
    width: 60px;
    padding: 4px;
    padding-top: 6px;
    background-color: #ffc72c;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    height: 20px;
    border-radius: 10px;
    font-size: 12px;
  }
`;
function VoteView({ name, num }) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(i);
  }
  return (
    <Container>
      <UpPart>
        <Title>{name}</Title>
        <BtnSection>
          <button>Cancel</button>
          <button>Member</button>
          <button>Open</button>
        </BtnSection>
      </UpPart>
      <DownPart>
        <div>
          <div>
            <Image
              src="/icons/about.png"
              alt="about"
              width={50}
              height={50}
              style={{ borderRadius: "10px" }}
            />
          </div>
        </div>
        <ChartView>
          {arr.map((item) => (
            <Box key={item} />
          ))}
        </ChartView>
      </DownPart>
    </Container>
  );
}
export default VoteView;
