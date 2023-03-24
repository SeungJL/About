import { faChessKing } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { INoticeItem } from "../../../models/notice";
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
function NoticeItem({
  item,
  isNotice,
}: {
  item: INoticeItem;
  isNotice: boolean;
}) {
  return (
    <>
      {isNotice ? (
        <AccordionItem borderTop="none">
          <AccordionButton height="60px">
            <Box as="span" flex="1" textAlign="left" display="flex">
              <Flex width="48px" align="center">
                <IconKing />
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
        <Active>도착한 알림 메시지가 없습니다</Active>
      )}
    </>
  );
}

const IconKing = () => (
  <IconLayout>
    <FontAwesomeIcon icon={faChessKing} size="lg" color="white" />
  </IconLayout>
);
const IconLayout = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-red);
`;

const Active = styled.div`
  text-align: center;
  margin-top: 10px;
  color: var(--font-h2);
`;

export default NoticeItem;
