import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Skeleton from "../../../components/common/masks/skeleton/Skeleton";
import { studyDateStatusState } from "../../../recoil/studyAtoms";

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
            <div>
              <Branch>
                <Skeleton>temp</Skeleton>
              </Branch>
              {studyDateStatus !== "not passed" && (
                <BranchSub>
                  <Skeleton>temp</Skeleton>
                </BranchSub>
              )}
            </div>
            <Info>
              <Skeleton>temp</Skeleton>
            </Info>
            <Participants>
              <Skeleton>temp</Skeleton>
            </Participants>
          </SpaceInfo>
        </Item>
      ))}
      <MoreInfoBtn>더보기</MoreInfoBtn>
    </Layout>
  );
}

const Layout = styled.div`
  min-height: 422px;
  padding: 0 var(--gap-4);
  margin-bottom: 32px;
`;
const Item = styled.div`
  height: 110px;
  background-color: white;
  border-radius: var(--rounded);
  display: flex;
  align-items: center;
  margin-bottom: var(--gap-4);
  padding: 12px;
`;
const ImageContainer = styled.div`
  width: 84.7px;
  height: 84.7px;
`;
const SpaceInfo = styled.div`
  margin-left: var(--gap-3);
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  > div:first-child {
    display: flex;
    align-items: center;
  }
`;
const Branch = styled.div`
  display: flex;
  width: 72px;
  height: 22px;
  font-weight: 600;
  font-size: 16px;
  align-items: center;
`;

const BranchSub = styled.div`
  margin-left: 8px;
  height: 18px;
  width: 36px;
`;
const Info = styled.div`
  display: flex;
  width: 50px;
  margin-top: 2px;
  height: 17px;
  font-size: 12px;
`;
const Participants = styled.div`
  margin-top: auto;
  margin-left: auto;
  width: 48px;
  height: 20px;
`;

const MoreInfoBtn = styled.button`
  width: 100%;
  box-shadow: var(--shadow);
  height: 44px;
  display: flex;
  margin-top: auto;
  justify-content: center;
  background-color: white;
  align-items: center;
  border-radius: var(--rounded);
  color: var(--color-mint);
  font-weight: 600;
`;

export default AboutMainSkeleton;
