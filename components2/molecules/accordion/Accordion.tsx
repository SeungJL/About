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
      defaultIndex={[0]}
      allowMultiple
    >
      {options.map((option, idx) => (
        <AccordionItem key={idx}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" fontSize="14px">
              {option.title}
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>{option.text}</AccordionPanel>
        </AccordionItem>
      ))}
      {/* <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem> */}
    </ChakraAccordion>
  );
}
