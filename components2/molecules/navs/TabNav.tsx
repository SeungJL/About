import { Tab, TabList, Tabs } from "@chakra-ui/react";
import styled from "styled-components";
export interface ITabNavOptions {
  text: string;
  func: () => void;
}

interface ITabNav {
  tabOptionsArr: ITabNavOptions[];
}

export default function TabNav({ tabOptionsArr }: ITabNav) {
  return (
    <>
      <Tabs colorScheme="mintTheme">
        <CustomTabList>
          {tabOptionsArr.map((tab) => (
            <CustomTab key={tab.text} onClick={tab.func}>
              {tab.text}
            </CustomTab>
          ))}
        </CustomTabList>
      </Tabs>
    </>
  );
}
const CustomTabList = styled(TabList)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none; /* 스크롤바를 숨기는 옵션 */
  }
`;

const CustomTab = styled(Tab)`
  flex-shrink: 0 !important;
`;
