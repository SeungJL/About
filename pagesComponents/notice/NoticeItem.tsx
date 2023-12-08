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
import { NoticeIcon } from "../../components/common/Icon/NoticeIcons";

import { NOTICE_ARR } from "../../storage/notice";

function NoticeItem() {
  return (
    <>
      <Accordion allowToggle>
        {[...NOTICE_ARR].reverse().map((item) => (
          <AccordionItem
            borderTop="none"
            key={item.id}
            borderBlock="1px solid var(--font-h7)"
          >
            <AccordionButton
              _focus={{ outline: "none" }}
              p="var(--padding-sub) var(--padding-max)"
            >
              <Box as="span" flex="1" textAlign="left" display="flex">
                <Flex width="48px" align="center">
                  <NoticeIcon type={item.category} />
                </Flex>
                <Flex direction="column" flex="1" ml="var(--margin-sub)">
                  <Text fontSize="16px" fontWeight="500" color="var(--font-h1)">
                    {item.title}
                  </Text>
                  <Text fontSize="13px" color="var(--font-h3)">
                    {item.date}
                  </Text>
                </Flex>
              </Box>
              <AccordionIcon fontSize="24px" color="var(--font-h2)" />
            </AccordionButton>
            <AccordionPanel
              mt="var(--margin-sub)"
              p="0 var(--padding-max)"
              pb="var(--padding-sub)"
              color="var(--font-h2)"
              lineHeight="22px"
            >
              {item.content}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default NoticeItem;
