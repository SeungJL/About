import styled from "styled-components";
import { IPointSystemsModalContents } from "../../constants/contents/ModalContents";

interface IListContainer {
  content: IPointSystemsModalContents;
}

function ListContainer({ content }: IListContainer) {
  console.log(content);
  return (
    <Layout>
      <RuleTitle>{content.title}</RuleTitle>
      <Lists>
        {content.list.map((content, idx) => (
          <Li key={idx}>
            <span>{content.subtitle}:</span>
            <span>{content.text}</span>
          </Li>
        ))}
      </Lists>
    </Layout>
  );
}

const Layout = styled.div``;

const RuleTitle = styled.span`
  color: var(--font-h1);
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: var(--margin-min);
`;

const Lists = styled.ul`
  margin-left: var(--margin-main);
  margin-bottom: var(--margin-md);
  line-height: var(--line-height);
`;

const Li = styled.li`
  font-size: 12px;
  > span:first-child {
    color: var(--font-h1);
    margin-right: var(--margin-min);
  }
  > span:last-child {
    color: var(--font-h3);
  }
`;

export default ListContainer;
