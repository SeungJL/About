import {
  faChessKing,
  faChessPawn,
  faChessRook,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { faChessQueen } from "@fortawesome/pro-solid-svg-icons";
import { VOTE_TABLE_COLOR } from "../../constants/system";

function NoticeItem({ item, isNotice }: { item: any; isNotice: boolean }) {
  return (
    <>
      {isNotice ? (
        <AccordionItem borderTop="none">
          <AccordionButton height="60px">
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
      ? VOTE_TABLE_COLOR[2]
      : props.name === "queen"
      ? VOTE_TABLE_COLOR[3]
      : "var(--color-mint)"};
`;

const Active = styled.div`
  text-align: center;
  margin-top: 10px;
  color: var(--font-h2);
`;

export default NoticeItem;
