import { faCircleXmark, faClock } from "@fortawesome/free-regular-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function StudyNavigation() {
  return (
    <Layout>
      <SubNav>
        <Button>
          <FontAwesomeIcon icon={faCircleXmark} size="xl" />
          <span>투표 취소</span>
        </Button>
        <Button>
          <FontAwesomeIcon icon={faClock} size="xl" />
          <span>시간 변경</span>
        </Button>
        <Button>
          <FontAwesomeIcon icon={faBan} size="xl" />
          <span>당일 불참</span>
        </Button>
      </SubNav>
      <MainButton>
        <button>스터디 투표하기</button>
      </MainButton>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 12px 0;
  margin-top: 16px;
  border-radius: 13px;
`;

const SubNav = styled.nav`
  display: flex;
  margin-bottom: 24px;
  justify-content: space-around;
`;

const Button = styled.button`
  align-items: center;
  color: var(--font-h2);
  width: 60px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > span {
    font-size: 13px;
  }
`;

const MainButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-mint);
  color: white;
  height: 48px;
  border-radius: 13px;
  padding: 14px 100px 14px 100px;
  font-weight: 700;
  font-size: 15px;
`;

export default StudyNavigation;
