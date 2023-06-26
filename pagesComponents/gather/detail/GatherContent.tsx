import styled from "styled-components";
import { GatherListItem } from "../../../types/gather";

interface IGatherContent {
  content: string;
  gatherList: GatherListItem[];
}

function GatherContent({ content, gatherList }: IGatherContent) {
  console.log(gatherList);
  return (
    <Layout>
      <Content>{content}</Content>
      <ListContainer>
        {gatherList?.map((item, idx) => (
          <ListBlock key={idx}>
            <span>{idx + 1}차</span>
            <span>{item.text}</span>
            <span>
              {item.time.hour}:{item.time.minute || item.time.minute + "0"}
            </span>
          </ListBlock>
        ))}
      </ListContainer>
    </Layout>
  );
}

const Layout = styled.div`
  border-top: 1px solid var(--font-h6);
  border-bottom: 1px solid var(--font-h6);
  margin-top: 16px;
  padding-top: 14px;
  min-height: 100px;
`;
const Content = styled.p``;

const ListContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 16px;
  line-height: 1.8;
`;

const ListBlock = styled.div`
  > span:first-child {
    display: inline-block;
    width: 28px;

    font-weight: 600;
  }
  > span:last-child {
    margin-left: 8px;
  }
`;

export default GatherContent;
