import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../../../components/common/Skeleton";
import { studyDateState } from "../../../../recoil/studyAtoms";

function AboutMainInitialItem() {
  const studyDate = useRecoilValue(studyDateState);
  return (
    <Layout>
      <ImageContainer>
        <Skeleton>temp</Skeleton>
      </ImageContainer>
      <SpaceInfo>
        <Branch>
          <Skeleton>temp</Skeleton>
          {studyDate !== "not passed" && (
            <BranchSub>
              <Skeleton>temp</Skeleton>
            </BranchSub>
          )}
        </Branch>
        <Info>
          <Skeleton>temp</Skeleton>
        </Info>
        <Participants>
          <Skeleton>temp</Skeleton>
        </Participants>
      </SpaceInfo>
    </Layout>
  );
}

const Layout = styled.div`
  height: 100px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
`;
const ImageContainer = styled.div`
  width: 77px;
  height: 77px;
`;
const SpaceInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
`;
const Branch = styled.div`
  display: flex;
  width: 64px;
  height: 23px;
  font-weight: 800;
  font-size: 16px;
  align-items: center;
`;

const BranchSub = styled.div`
  height: 16px;
  margin-left: 8px;
`;
const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 48px;
  margin-top: 2px;
  height: 17px;
  font-size: 12px;
`;
const Participants = styled.div`
  margin-top: auto;
  margin-left: auto;
  width: 110px;

  height: 26px;
`;
export default AboutMainInitialItem;
