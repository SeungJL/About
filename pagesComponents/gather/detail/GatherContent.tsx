import styled from "styled-components";
import { GatherListItem } from "../../../types/page/gather";

interface IGather {
  content: string;
  gatherList: GatherListItem[];
}

function GatherContent({ content, gatherList }: IGather) {
  return (
    <Layout>
      <Content>{content}</Content>
      <ListContainer>
        {gatherList?.map((item, idx) => (
          <ListBlock key={idx}>
            <span>{idx + 1}차</span>
            <span>{item.text}</span>
            <span>
              {item.time.hours}:{item.time.minutes || item.time.minutes + "0"}
            </span>
          </ListBlock>
        ))}
      </ListContainer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border-top: var(--border-main);
  border-bottom: var(--border-main);
  margin-top: var(--margin-main);
  padding-top: var(--padding-main);
  min-height: 160px;
`;
const Content = styled.pre`
  white-space: pre-wrap;
`;

const ListContainer = styled.div`
  margin-top: auto;
  margin-bottom: var(--margin-main);
  line-height: var(--line-height);
`;

const ListBlock = styled.div`
  > span:first-child {
    display: inline-block;
    width: 28px;
    font-weight: 600;
  }
  > span:last-child {
    margin-left: var(--margin-md);
  }
`;

export default GatherContent;
