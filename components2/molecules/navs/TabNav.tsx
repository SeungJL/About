import { Tab, TabList, Tabs } from "@chakra-ui/react";

export interface ITabNavOptions {
  left: {
    text: string;
    func: () => void;
  };
  right: {
    text: string;
    func: () => void;
  };
}

interface ITabNav {
  options: ITabNavOptions;
}

export default function TabNav({ options: { left, right } }: ITabNav) {
  return (
    <>
      <Tabs colorScheme="mintTheme">
        <TabList>
          <Tab w="100%" onClick={left.func}>
            {left.text}
          </Tab>
          <Tab w="100%" onClick={right.func}>
            {right.text}
          </Tab>
        </TabList>
        {/* <TabPanels>
          <TabPanel>
            <PointSystemsModalPoint />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels> */}
      </Tabs>
    </>
  );
}
