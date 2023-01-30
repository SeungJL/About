import { Image } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";
import { isShowVoterState } from "../recoil/atoms";
import { BaseModal, FullScreen } from "../styles/LayoutStyles";

const Container = styled(BaseModal)`
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

function VoterModal(voterList: any) {
  const setVoterShow = useSetRecoilState(isShowVoterState);

  return (
    <>
      <Container>
        <div>참여인원</div>
        <VoterSection>
          {voterList?.attendences?.map((who: any) => (
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
            </div>
          ))}
        </VoterSection>
      </Container>
      <FullScreen onClick={() => setVoterShow(false)} />
    </>
  );
}
export default VoterModal;
