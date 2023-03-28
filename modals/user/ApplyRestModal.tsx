import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { ModalXL } from "../../styles/LayoutStyles";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
function ApplyRestModal({
  setIsModal,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Layout>
      <Header>
        <span>휴식신청</span>
        <FontAwesomeIcon icon={faXmark} onClick={() => setIsModal(false)} />
      </Header>
      <Content>
        휴식 금지!!
        <br />
        <br />는 아닌데 아직 구현이랑 규정 확정이 덜 되어서 이후에 만들게요~
        필요하시면 별도 카톡주세요!
      </Content>
    </Layout>
  );
}

const Layout = styled(ModalXL)`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--font-h5);
  padding-bottom: 6px;
  > span {
    font-size: 16px;
    font-weight: 600;
  }
`;
const Content = styled.div`
  flex: 1;
  display: flex;
  align-self: center;
  align-items: center;
  font-size: 14px;
`;

export default ApplyRestModal;
