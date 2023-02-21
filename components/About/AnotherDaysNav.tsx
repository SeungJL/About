import styled from "styled-components";
import { CenterDiv } from "../../styles/LayoutStyles";
import { Dayjs } from "dayjs";
import { useSetRecoilState } from "recoil";
import { voteDateState } from "../../recoil/voteAtoms";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4vw;
  padding-top: 2.5vh;
  position: relative;
  > div {
    height: 100%;
    padding-top: 1.5%;
    position: absolute;
    font-size: 0.95em;
  }
`;

const YesterdayBtn = styled(CenterDiv)`
  left: calc(20% - 45px);
`;

const TomorrowdayBtn = styled(CenterDiv)`
  right: calc(20% - 45px);
`;

function AnotherDaysNav() {
  const setVoteDate = useSetRecoilState(voteDateState);

  const moveYesterday = () => {
    setVoteDate((date: Dayjs) => date.subtract(1, "day"));
  };
  const moveTomorrow = () => {
    setVoteDate((date: Dayjs) => date.add(1, "day"));
  };

  return (
    <Container>
      <YesterdayBtn onClick={moveYesterday}>Yesterday</YesterdayBtn>
      <TomorrowdayBtn onClick={moveTomorrow}>Tomorrow</TomorrowdayBtn>
    </Container>
  );
}

export default AnotherDaysNav;
