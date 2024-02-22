import { Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertNotCompletedModal from "../../components2/AlertNotCompletedModal";
import HighlightedTextButton from "../../components2/atoms/buttons/HighlightedTextButton";
import Accordion, {
  IAccordionOptions,
} from "../../components2/molecules/accordion/Accordion";
import SectionBar from "../../components2/molecules/bars/SectionBar";

interface IEventMission {}
export default function EventMission({}: IEventMission) {
  const router = useRouter();
  const [isModal, setIsModal] = useState(false);

  const accordionOptions: IAccordionOptions[] = [
    {
      title: "(2/26) 개강 이벤트",
      text: "test",
    },
    {
      title: "(2/18) 최애 햄버거 이벤트",
      text: "test",
    },
    {
      title: "(항시) 홍보 이벤트",
      text: "test",
    },
  ];

  return (
    <>
      <SectionBar
        title="진행 이벤트"
        size="md"
        rightComponent={
          <HighlightedTextButton
            text="더보기"
            onClick={() => setIsModal(true)}
          />
        }
      />
      <Box p="16px" border="var(--border)">
        <Accordion options={accordionOptions} />
      </Box>
      {isModal && <AlertNotCompletedModal setIsModal={setIsModal} />}
    </>
  );
}
