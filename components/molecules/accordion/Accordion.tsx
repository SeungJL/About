import {
  Accordion as ChakraAccordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

export interface IAccordionOptions {
  title: string;
  text: string;
}

interface IAccordion {
  options: IAccordionOptions[];
}

export default function Accordion({ options }: IAccordion) {
  return (
    <ChakraAccordion
      border="var(--border)"
      rounded="lg"
      overflow="hidden"
      bgColor="white"
      allowMultiple
    >
      {options.map((option, idx) => {
        const title = option.title;

        return (
          <AccordionItem key={idx}>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left" fontSize="14px">
                {title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>{option.text}</AccordionPanel>
          </AccordionItem>
        );
      })}
     
    </ChakraAccordion>
  );
}
