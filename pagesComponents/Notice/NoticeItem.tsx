import { faChessKing, faChessPawn } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
function NoticeItem({ item, isNotice }: { item: any; isNotice: boolean }) {
  return (
    <>
      {isNotice ? (
        <AccordionItem borderTop="none">
          <AccordionButton height="60px">
            <Box as="span" flex="1" textAlign="left" display="flex">
              <Flex width="48px" align="center">
                {item.category === "main" ? <IconKing /> : <IconPawn />}
              </Flex>
              <Flex direction="column" flex="1">
                <Text color="var(--font-h1)">{item.title}</Text>
                <Text fontSize="12px" color="var(--font-h3)">
                  {item.date}
                </Text>
              </Flex>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4} p="6">
            {item.content}
          </AccordionPanel>
        </AccordionItem>
      ) : (
        <Active></Active>
      )}
    </>
  );
}

const IconKing = () => (
  <IconLayout name="king">
    <FontAwesomeIcon icon={faChessKing} size="lg" color="white" />
  </IconLayout>
);
const IconPawn = () => (
  <IconLayout name="pawn">
    <FontAwesomeIcon icon={faChessPawn} size="lg" color="white" />
  </IconLayout>
);
const IconLayout = styled.div<{ name: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.name === "king" ? "var(--color-red)" : "var(--color-orange)"};
`;

const Active = styled.div`
  text-align: center;
  margin-top: 10px;
  color: var(--font-h2);
`;

export default NoticeItem;
