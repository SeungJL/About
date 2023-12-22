import { useState } from "react";
import styled from "styled-components";
import { IGroupStudy } from "../../../../types/page/groupStudy";
import ContentAttend from "./ContentAttendance";
import ContentChat from "./ContentChat";
import ContentGather from "./ContentGather";
import ContentInfo from "./ContentInfo";

interface IGroupStudyContent {
  groupStudy: IGroupStudy;
}

type Category = "정보" | "모임" | "출석부" | "채팅";

function GroupStudyContent({ groupStudy }: IGroupStudyContent) {
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
          <ContentInfo groupStudy={groupStudy} />
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
  padding: var(--padding-md) 0;
  font-weight: 600;
  color: ${(props) => (props.isSelected ? "var(--font-h1)" : "var(--font-h3)")};
  border-bottom: ${(props) => props.isSelected && "2px solid var(--font-h1)"};
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 140px;
  border-bottom: 6px solid var(--font-h56);
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 410px;
`;

export default GroupStudyContent;
