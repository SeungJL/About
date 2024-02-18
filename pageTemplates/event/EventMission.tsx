import { Box } from "@chakra-ui/react";
import Accordion, {
  IAccordionOptions,
} from "../../components2/molecules/accordion/Accordion";
import SectionBar from "../../components2/molecules/bars/SectionBar";

interface IEventMission {}
export default function EventMission({}: IEventMission) {
  const accordionOptions: IAccordionOptions[] = [
    {
      title: "(1/3) 햄버거 이벤트",
      text: "test",
    },
    {
      title: "(1/8) 햄버거 이벤트",
      text: "test",
    },
    {
      title: "(1/23) 햄버거 22이벤트",
      text: "test",
    },
  ];

  return (
    <>
      <SectionBar title="진행 이벤트" size="md" />
      <Box p="16px" border="var(--border)">
        <Accordion options={accordionOptions} />
      </Box>
    </>
  );
}
