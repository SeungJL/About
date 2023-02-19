import styled from "styled-components";

const UserBlockLayout = styled.div`
  background-color: lightgray;
  margin: 1px;
  display: grid;
  grid-template-rows: 1fr 4fr;
  border-radius: 10px;
  overflow: hidden;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > div:first-child {
    background-color: brown;
  }
  > div:last-child {
  }
`;

export default function UserBlock({ userInfo, onUserBlockClicke }) {
  return (
    <UserBlockLayout>
      <div>회장</div>
      <div>이승주 25</div>
    </UserBlockLayout>
  );
}
