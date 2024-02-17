import { Button, Flex } from "@chakra-ui/react";
import styled from "styled-components";
import { ButtonSize } from "../../../types2/assetTypes";
interface IButtonData {
  text: string;
  func: () => void;
}

interface IButtonGroups {
  buttonDataArr: IButtonData[];
  currentValue: string;
  size?: ButtonSize;
}
export default function ButtonGroups({
  buttonDataArr,
  currentValue,
  size = "md",
}: IButtonGroups) {
  return (
    <Layout>
      {buttonDataArr.map((buttonData, idx) => (
        <Flex flexShrink={0} key={idx} onClick={buttonData.func}>
          {buttonData.text === currentValue ? (
            <Button mr="8px" colorScheme="mintTheme">
              {buttonData.text}
            </Button>
          ) : (
            <Button mr="8px" variant="outline">
              {buttonData.text}
            </Button>
          )}
        </Flex>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  display: flex;
  padding: 12px 16px;
  flex-wrap: nowrap;
  overflow-x: auto;
`;
