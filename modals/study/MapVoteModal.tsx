import styled from "styled-components";
import ModalPortal from "../../components/modals/ModalPortal";
import PlaceVoteMap from "../../components2/services/studyVote/StudyVoteMap";
import { IModal } from "../../types/reactTypes";

function MapVoteModal({ setIsModal }: IModal) {
  return (
    <Layout>
      <ModalPortal setIsModal={setIsModal} />
      <PlaceVoteMap setIsModal={setIsModal} />
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

export default MapVoteModal;
