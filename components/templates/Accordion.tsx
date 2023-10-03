import {
  Accordion as ChakraAccordian,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import styled from "styled-components";
import { OPEN_KAKAO_LINK } from "../../constants/contents/Private";

export interface IAccordionContent {
  title: string;
  content: string | string[];
}

interface IAccordion {
  contentArr: IAccordionContent[];
  isFull?: boolean;
}

function Accordion({ contentArr, isFull }: IAccordion) {
  return (
    <ChakraAccordian
      allowToggle
      marginTop="40px"
      fontSize="13px"
      color="var(--font-h2)"
    >
      {contentArr?.map((item, idx) => {
        const content = item.content;
        return (
          <AccordionItem key={idx}>
            <AccordionButton
              p="var(--padding-sub) var(--padding-md)"
              display="flex"
              justifyContent="space-between"
              fontSize="13px"
            >
              <Container isFull={isFull}>
                <QIcon>Q.</QIcon>
                <Title>{item.title}</Title>
              </Container>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p="var(--padding-sub) var(--padding-md)">
              <Content isFull={isFull}>
                {Array.isArray(content) ? (
                  content.map((list, idx) => <li key={idx}>{list}</li>)
                ) : (
                  <p>
                    {content}
                    {content === "" && (
                      <a href={OPEN_KAKAO_LINK}>{OPEN_KAKAO_LINK}</a>
                    )}
                  </p>
                )}
              </Content>
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </ChakraAccordian>
  );
}

const Container = styled.div<{ isFull: boolean }>`
  margin: ${(props) => (props.isFull ? "0 var(--margin-md)" : 0)};
  display: flex;
  width: 100%;
  color: var(--font-h1);
`;

const QIcon = styled.span`
  margin-right: var(--margin-md);
`;

const Title = styled.div`
  width: 90%;
  text-align: start;
`;

const Content = styled.div<{ isFull: boolean }>`
  padding: ${(props) => props.isFull && "var(--padding-md)"};
`;

export default Accordion;
