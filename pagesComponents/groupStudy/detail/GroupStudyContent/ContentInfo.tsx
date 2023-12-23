import styled from "styled-components";
import { IGroupStudy } from "../../../../types/page/groupStudy";
import GroupStudyDetailInfo from "../GroupStudyDetail";

interface IContentInfo {
  groupStudy: IGroupStudy;
}

function ContentInfo({ groupStudy }: IContentInfo) {
  const hashTagText = groupStudy.hashTag;
  const hashTagArr = hashTagText?.split("#");

  return (
    <Layout>
      <Wrapper>
        <GroupStudyDetailInfo groupStudy={groupStudy} />
      </Wrapper>
      <ContentWrapper>
        <span>소개</span>
        <Content>{groupStudy.content}</Content>
        <Tag>
          {hashTagArr?.map((tag, idx) =>
            tag ? <div key={idx}>#{tag}</div> : null
          )}
        </Tag>
      </ContentWrapper>
    </Layout>
  );
}

const Wrapper = styled.div`
  padding: var(--padding-main);
  background-color: var(--font-h8);
`;

const Layout = styled.div`
  min-height: 410px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  padding: var(--padding-main);
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;

  > span:first-child {
    display: inline-block;
    font-size: 16px;

    margin-bottom: var(--margin-main);

    font-weight: 700;
  }
`;

const Content = styled.pre`
  margin-bottom: var(--margin-max);
  white-space: pre-wrap;
  flex: 1;
`;

const Tag = styled.div`
  display: flex;
  margin-top: auto;

  > div {
    font-size: 13px;
    padding: var(--padding-min) var(--padding-md);
    color: var(--font-h2);
    font-weight: 600;
    margin-right: var(--margin-md);
    background-color: var(--font-h56);
  }
`;

export default ContentInfo;
