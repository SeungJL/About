import styled from "styled-components";
import Skeleton from "../../../components/common/Skeleton";
import { DEFAULT_ARRAY } from "../../../constants/default";

function RecordDetailSkeleton() {
  return (
    <>
      <Layout>
        {DEFAULT_ARRAY.map((item, idx) => (
          <Block key={idx}>
            <Date>
              <span>
                <Skeleton>temp</Skeleton>
              </span>
            </Date>
            <SpaceWrapper>
              <Info>
                <span>
                  <Skeleton>temp</Skeleton>
                </span>
                <span>
                  <Skeleton>temp</Skeleton>
                </span>
              </Info>
              <Member></Member>
            </SpaceWrapper>
          </Block>
        ))}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin-top: var(--margin-main);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Block = styled.div``;
const Date = styled.div`
  padding: var(--padding-min) var(--padding-main);
  font-weight: 600;
  font-size: 12px;
  background-color: var(--font-h7);
  > span {
    display: inline-block;
    width: 64px;
  }
`;

const SpaceWrapper = styled.div`
  padding: var(--padding-main);

  font-size: 12px;
  color: var(--font-h2);
`;

const Info = styled.div`
  display: flex;
  align-items: flex-end;
  color: var(--font-h2);
  font-size: 14px;
  > span:first-child {
    height: 21px;
    display: inline-block;
    width: 60px;
    margin-right: var(--margin-sub);
  }
  > span:last-child {
    display: inline-block;
    width: 72px;
    height: 18px;
  }
`;

const Member = styled.div`
  height: 48px;
`;
export default RecordDetailSkeleton;
