import { Image } from "@chakra-ui/react";
import * as ReactDOM from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { IAttendence } from "../models/vote";
import { modalContextState, showVoterState } from "../recoil/atoms";

import { BaseModal, FullScreen } from "../styles/LayoutStyles";

const Container = styled(BaseModal)`
  height: 200px;
  overflow: visible;
  > div {
    height: 20%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgb(0, 0, 0, 0.4);
    font-size: 1.1em;
  }
`;

const VoterSection = styled.section`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
`;

function VoterModal() {
  const modalContext = useRecoilValue(modalContextState);
  const attendences = modalContext?.Voter?.attendences;

  return (
    <Container>
      <div>참여인원</div>
      <VoterSection>
        {attendences?.map(
          (who: any) =>
            who.firstChoice && (
              <div key={who.user._id}>
                <Image
                  width={12}
                  height={12}
                  alt={who.user.name}
                  src={who.user.thumbnailImage}
                  style={{
                    borderRadius: "30%",
                  }}
                />
                <span>{who.user.name}</span>
              </div>
            )
        )}
      </VoterSection>
    </Container>
  );
}
export default VoterModal;
