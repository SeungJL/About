import styled from "styled-components";

interface IGroupStudy {
  content: string;
}

function GroupStudyContent({ content }: IGroupStudy) {
  return (
    <Layout>
      <Content>{content}</Content>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 140px;
  border-bottom: 6px solid var(--font-h56);
`;
const Content = styled.pre`
  min-height: 100px;
  background-color: white;
  padding: var(--padding-main);
  white-space: pre-wrap;
  padding-bottom: var(--padding-main);
`;

const ListContainer = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
  line-height: var(--line-height);
  background-color: var(--font-h8);
`;

const ListBlock = styled.div`
  > span:first-child {
    margin-right: var(--margin-sub);
    font-weight: 700;
  }
  > span:last-child {
    margin-left: var(--margin-md);
  }
`;

export default GroupStudyContent;
