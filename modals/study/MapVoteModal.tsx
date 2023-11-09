import styled from "styled-components";
import PlaceVoteMap from "../../components/features/studyVote/StudyVoteMap";
import ModalPortal from "../../components/modals/ModalPortal";
import { IModal } from "../../types/reactTypes";

function MapVoteModal({ setIsModal }: IModal) {
  return (
    <Layout>
      <ModalPortal setIsModal={setIsModal} />
      <PlaceVoteMap />
      <Nav></Nav>
    </Layout>
  );
}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Nav = styled.nav``;

export default MapVoteModal;
