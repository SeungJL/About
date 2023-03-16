import styled from "styled-components";
import { IconMapMark } from "../../../../public/icons/Icons";

function AboutMainHeader() {
  return (
    <Layout>
      <Header>
        <span>카공 스터디</span>
        <div>
          <IconMapMark />
          <select>
            <option value="수원">수원</option>
            <option value="강서">강서</option>
          </select>
        </div>
      </Header>
      <BtnNav>
        <button>빠른투표</button>
        <button>결과확인</button>
      </BtnNav>
    </Layout>
  );
}

const Layout = styled.div`
  height: 85px;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  > span {
    color: #343943;
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 15px;
  }
  > div {
    display: flex;
    align-items: center;
    > select {
      width: 50px;
      color: #767d8a;
      font-size: 14px;
    }
  }
`;
const BtnNav = styled.nav`
  > button {
    background-color: #e3e6eb;
    font-family: "PretendSemiBold";
    border-radius: 5px;
    font-size: 13px;
    padding: 3px;
    margin-right: 10px;
    width: 100px;
    height: 30px;
  }
`;

export default AboutMainHeader;
