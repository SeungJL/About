import styled from "styled-components";
import { IconMapMark } from "../public/icons/Icons";

function LocalSelector() {
  return (
    <Layout>
      <select>
        <option value="수원">수원</option>
        <option value="양천구">양천구</option>
      </select>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;

  > select {
    width: 60px;
    color: var(--font-h3);
    background-color: var(--font-h8);
    font-size: 12px;
    text-align: center;
    font-weight: 600;
  }
`;

export default LocalSelector;
