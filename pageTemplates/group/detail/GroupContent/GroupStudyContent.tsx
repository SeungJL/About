import { useState } from "react";
import styled from "styled-components";
import { IGroup } from "../../../../types/page/Group";
import ContentAttend from "./ContentAttendance";
import ContentChat from "./ContentChat";
import ContentGather from "./ContentGather";
import ContentInfo from "./ContentInfo";

interface IGroupContent {
  Group: IGroup;
}

type Category = "정보" | "모임" | "출석부" | "채팅";

function GroupContent({ Group }: IGroupContent) {
  const [category, setCategory] = useState<Category>("정보");

  const categoryArr: Category[] = ["정보", "출석부", "모임", "채팅"];

  return (
    <Layout>
      <ContentNav>
        {categoryArr.map((item) => (
          <ContentBtn
            onClick={() => setCategory(item)}
            isSelected={item === category}
            key={item}
          >
            {item}
          </ContentBtn>
        ))}
      </ContentNav>
      <ContentContainer>
        {category === "정보" ? (
          <ContentInfo Group={Group} />
        ) : category === "모임" ? (
          <ContentGather />
        ) : category === "출석부" ? (
          <ContentAttend />
        ) : (
          <ContentChat />
        )}
      </ContentContainer>
    </Layout>
  );
}

const ContentNav = styled.nav`
  display: flex;
  background-color: white;
`;

const ContentBtn = styled.button<{ isSelected: boolean }>`
  flex: 1;
  padding: var(--gap-2) 0;
  font-weight: 600;
  color: ${(props) => (props.isSelected ? "var(--gray-1)" : "var(--gray-3)")};
  border-bottom: ${(props) => props.isSelected && "2px solid var(--gray-1)"};
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 140px;
  border-bottom: 6px solid var(--gray-7);
`;

const ContentContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;

  min-height: 440px;
`;

export default GroupContent;
