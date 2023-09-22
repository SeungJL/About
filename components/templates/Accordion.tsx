import {
  Accordion as ChakraAccordian,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import styled from "styled-components";
import { OPEN_KAKAO_LINK } from "../../constants/private";

export interface IAccordionContent {
  title: string;
  content: string | string[];
  list?: boolean;
}

interface IAccordion {
  contentArr: IAccordionContent[];
}

function Accordion({ contentArr }: IAccordion) {
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
              p="8px"
              display="flex"
              justifyContent="space-between"
              fontSize="13px"
            >
              <div>
                <QIcon>Q.</QIcon>
                <Title>{item.title}</Title>
              </div>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel p="var(--padding-sub) var(--padding-md)">
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
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </ChakraAccordian>
  );
}

const QIcon = styled.span`
  margin-right: var(--margin-md);
`;

const Title = styled.span``;

export default Accordion;
