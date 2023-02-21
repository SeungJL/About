import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PlaceSelector from "../components/studyVote/placeSelector";
import { voteDateState } from "../recoil/voteAtoms";

const LateVoteModalLayout = styled.div``;

const Header = styled.header``;

const MainContents = styled.main``;
const Footer = styled.footer``;

const SpaceSelect = styled.div``;

function LateVoteModal({ date, user }) {
  const voteInfo = useRecoilValue(voteDateState);

  const [modalPage, setModalPage] = useState(0);
  return (
    <LateVoteModalLayout>
      <Header>{voteInfo.format("M월 DD일 스터디")}</Header>
      <MainContents>
        {modalPage === 0 ? (
          <SpaceSelect></SpaceSelect>
        ) : modalPage === 1 ? (
          <></>
        ) : (
          <></>
        )}
      </MainContents>
      <Footer />
    </LateVoteModalLayout>
  );
}
export default LateVoteModal;
