import { Button, Flex } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import Slide from "../../components/layouts/PageSlide";

interface IRecordNavigation {
  isCalendar: boolean;
  setIsCalendar: Dispatch<SetStateAction<boolean>>;
}

function RecordNavigation({ isCalendar, setIsCalendar }: IRecordNavigation) {
  return (
    <Slide isFixed={true} posZero="top">
      <Flex p="16px" maxW="var(--max-width)" m="0 auto">
        <Button
          flex="1"
          colorScheme={isCalendar ? "mintTheme" : "gray"}
          onClick={() => setIsCalendar(true)}
        >
          달력
        </Button>
        <Button
          flex="1"
          colorScheme={!isCalendar ? "mintTheme" : "gray"}
          onClick={() => setIsCalendar(false)}
        >
          상세
        </Button>
      </Flex>
    </Slide>
  );
}

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: calc(100vw - 32px);
  max-width: 358px;
  margin: 0 var(--gap-4);
  height: 40px;
  padding: 4px;
  border-radius: 24px;
  background-color: var(--gray-7);
  bottom: var(--gap-4);
  color: var(--gray-3);
  font-weight: 600;
`;

// const Button = styled.button<{ isSelected: boolean }>`
//   height: 100%;
//   flex: 1;
//   border-radius: 24px;
//   font-size: 15px;
//   background-color: ${(props) =>
//     props.isSelected ? "var(--color-mint)" : null};
//   color: ${(props) => (props.isSelected ? "white" : null)};
//   font-weight: ${(props) => (props.isSelected ? "600" : null)};
// `;

export default RecordNavigation;
