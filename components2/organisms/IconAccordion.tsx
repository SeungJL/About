import NoticeIcon from "@/assets/icons/NoticeIcon";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

interface IIconAccordionContent {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  detail: string;
}

interface IIconAccordion {
  contentArr: IIconAccordionContent[];
}

export default function IconAccordion({ contentArr }: IIconAccordion) {
  return (
    <Accordion>
      {contentArr.map((content, idx) => (
        <AccordionPanel key={idx}>
          <AccordionTitle className="bg-white">
            <div className="flex-1 text-left flex">
              <div className="flex items-center w-12">
                <NoticeIcon />
              </div>
              <div className="flex flex-col flex-1 ml-3">
                <span className="text-lg font-semibold text-gray-2">
                  {content.title}
                </span>
                <span className="text-sm text-gray-4">{content.subtitle}</span>
              </div>
            </div>
          </AccordionTitle>
          <AccordionContent className="bg-white">
            {content.detail}
          </AccordionContent>
        </AccordionPanel>
      ))}
    </Accordion>
  );
}

const Title = () => (
  <button
    className="w-full items-center justify-between first:rounded-t-lg last:rounded-b-lg py-5 px-5 text-left font-medium hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:hover:bg-gray-800 dark:focus:ring-gray-800 text-gray-900 bg-gray-100 dark:bg-gray-800 dark:text-white flex"
    type="button"
  >
    <h2 className="" data-testid="flowbite-accordion-heading">
      <div>테스트</div>
    </h2>
    <>화살표</>
  </button>
);
