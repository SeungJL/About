import styled from "styled-components";
import { IconMapMark } from "../public/icons/Icons";

function SpaceLocalSelector() {
  return (
    <Layout>
      <IconMapMark />
      <select>
        <option value="수원">수원</option>
        <option value="강서">강서</option>
      </select>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;

  > select {
    width: 50px;
    color: #767d8a;
    font-size: 14px;
  }
`;

export default SpaceLocalSelector;
