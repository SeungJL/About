import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  faChessKing,
  faChessPawn,
  faChessQueen,
  faChessRook,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { TABLE_COLORS } from "../../constants/styles";

import { NOTICE_ARR } from "../../storage/notice";

function NoticeItem() {
  return (
    <>
      <Accordion allowToggle>
        {[...NOTICE_ARR].reverse().map((item) => (
          <AccordionItem borderTop="none" key={item.id}>
            <AccordionButton height="60px" _focus={{ outline: "none" }}>
              <Box as="span" flex="1" textAlign="left" display="flex">
                <Flex width="48px" align="center">
                  {item.category === "main" ? (
                    <IconKing />
                  ) : item.category === "sub" ? (
                    <IconPawn />
                  ) : item.category === "event" ? (
                    <IconRook />
                  ) : (
                    <IconQueen />
                  )}
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
            <AccordionPanel p={6}>{item.content}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
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

const IconRook = () => (
  <IconLayout name="rook">
    <FontAwesomeIcon icon={faChessRook} size="lg" color="white" />
  </IconLayout>
);

const IconQueen = () => (
  <IconLayout name="queen">
    <FontAwesomeIcon icon={faChessQueen} size="lg" color="white" />
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
    props.name === "king"
      ? "var(--color-red)"
      : props.name === "pawn"
      ? TABLE_COLORS[1]
      : props.name === "queen"
      ? TABLE_COLORS[3]
      : "var(--color-mint)"};
`;

export default NoticeItem;
