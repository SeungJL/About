import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../../../components/common/masks/skeleton/Skeleton";
import { studyDateStatusState } from "../../../../recoil/studyAtoms";

const VISIBLE_CNT = 3;

function AboutMainSkeleton() {
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  return (
    <Layout>
      {new Array(VISIBLE_CNT).fill(0)?.map((item, idx) => (
        <Item key={idx}>
          <ImageContainer>
            <Skeleton>temp</Skeleton>
          </ImageContainer>
          <SpaceInfo>
            <Branch>
              <Skeleton>temp</Skeleton>
              {studyDateStatus !== "not passed" && (
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
        </Item>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  min-height: 422px;
  margin-top: var(--margin-main);
  padding: 0 var(--padding-main);
`;
const Item = styled.div`
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
export default AboutMainSkeleton;
