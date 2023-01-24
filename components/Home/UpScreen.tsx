import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faUserGear, faBell } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  color: white;
  padding: 25px;
  background: linear-gradient(
    45deg,
    rgba(242, 166, 90, 1) 0%,
    rgba(119, 47, 26, 1) 100%
  );
  height: 325px;
  display: grid;
  border-bottom: 1px solid black;
  grid-template-rows: 0.5fr 2fr 1fr 1fr;
  text-align: center;
  position: relative;
  > div:first-child {
    justify-content: space-between;
  }
  > div:nth-child(2) {
    justify-content: center;
    font-size: 64px;
  }
  > div:nth-child(3) {
    justify-content: space-around;
    div {
      width: 40%;
      height: 100%;
      background-color: gray;
    }
  }
  > div:last-child {
    justify-content: space-between;
    padding: 0 60px;
  }
`;
const VoteCircle = styled.div`
  width: 90px;
  height: 90px;
  padding: 15px;
  border-radius: 45px;
  background-color: gray;
  text-align: center;
`;
const OutCircle = styled.div`
  width: 120px;
  height: 120px;
  padding: 15px;
  border-radius: 60px;
  background-color: white;
  position: absolute;
  left: 41%;
  top: 293px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RowItem = styled.div`
  display: flex;
`;
function UpScreen() {
  return (
    <>
      <Container>
        <RowItem>
          <div>
            <FontAwesomeIcon icon={faBell} size="2xl" />
          </div>
          <div>
            <FontAwesomeIcon icon={faUserGear} size="2xl" />
          </div>
        </RowItem>
        <RowItem>About</RowItem>
        <RowItem>
          <div>my votes</div>
          <div>members</div>
        </RowItem>
        <RowItem>
          <div>all</div>
          <div>reset</div>
        </RowItem>
      </Container>
      <OutCircle>
        <VoteCircle>c</VoteCircle>
      </OutCircle>
    </>
  );
}
export default UpScreen;
