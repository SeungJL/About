import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faUserGear, faBell } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  color: white;
  padding: 25px;
  padding-bottom: 0px;
  background: linear-gradient(45deg, #a55c1b, #000000);
  height: 325px;
  display: grid;
  border-bottom: 1px solid black;
  grid-template-rows: 0.5fr 2fr 1fr 1fr;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  > div:first-child {
    justify-content: space-between;
  }
  > div:nth-child(2) {
    justify-content: center;
    font-size: 72px;
    font-family: "Marck Script", cursive;
  }
  > div:nth-child(3) {
    justify-content: space-between;
    margin: 0 13px;
    line-height: 1.7;
    div {
      width: 180px;
      height: 100%;
      background-color: rgb(255, 255, 255, 0.05);
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
  > div:last-child {
    justify-content: space-between;
    padding: 0 35px;
    align-items: center;
    padding-top: 20px;
    font-size: 15px;
  }
`;
const VoteCircle = styled.div`
  width: 90px;
  height: 90px;
  padding: 15px;
  border-radius: 45px;
  background: linear-gradient(45deg, RGB(143, 80, 23), RGB(83, 46, 13));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 22px;
  padding-top: 18px;
  text-shadow: 1px 1px 6px black;
  box-shadow: 1px 1px 10px black;
`;
const OutCircle = styled.div`
  width: 120px;
  height: 120px;
  padding: 15px;
  border-radius: 60px;
  background-color: white;
  position: absolute;
  left: 38%;
  top: 265px;

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
            <FontAwesomeIcon icon={faBell} size="xl" />
          </div>
          <div>
            <FontAwesomeIcon icon={faUserGear} size="xl" />
          </div>
        </RowItem>
        <RowItem>About</RowItem>
        <RowItem>
          <div>
            <span>Members</span>

            <span>72</span>
          </div>
          <div>
            <span>Date</span>
            <span>Jan 25</span>
          </div>
        </RowItem>
        <RowItem>
          <div>Yesterday</div>
          <div>Tomorrow</div>
        </RowItem>
      </Container>
      <OutCircle>
        <VoteCircle>Vote</VoteCircle>
      </OutCircle>
    </>
  );
}
export default UpScreen;
