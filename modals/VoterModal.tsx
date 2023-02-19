import { Image } from "@chakra-ui/react";
import * as ReactDOM from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { IAttendence } from "../models/vote";
import { modalContextState, showVoterState } from "../recoil/atoms";

import { BaseModal, FullScreen } from "../styles/LayoutStyles";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper";

const Container = styled(BaseModal)`
  height: 200px;
  overflow: visible;
`;
const Header = styled.header`
  height: 20%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(0, 0, 0, 0.4);
  font-size: 1.1em;
  justify-content: space-between;
  padding-bottom: 7px;
`;

const VoterSection = styled.section`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 5px;
`;
const ButtonNav = styled.nav``;
const Button = styled.button<{ first: boolean }>`
  width: 25px;
  height: 25px;
  background-color: ${(props) => (props.first ? "#ffc72c" : "lightgray")};
  color: ${(props) => (props.first ? "#2c3e50" : "rgb(34, 84, 61)")};
`;

function VoterModal() {
  const modalContext = useRecoilValue(modalContextState);
  const attendences = modalContext?.Voter?.attendences;
  const [isSliderFirst, setSilderFirst] = useState(true);
  console.log(attendences[0]);
  return (
    <Container>
      <Header>
        <span>참여인원</span>
        <ButtonNav>
          <Button first={isSliderFirst} onClick={() => setSilderFirst(true)}>
            1
          </Button>
          <Button first={!isSliderFirst} onClick={() => setSilderFirst(false)}>
            2
          </Button>
        </ButtonNav>
      </Header>
      {isSliderFirst ? (
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
      ) : (
        <VoterSection>
          {attendences?.map(
            (who: any) =>
              !who.firstChoice && (
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
      )}
    </Container>
  );
}
export default VoterModal;
