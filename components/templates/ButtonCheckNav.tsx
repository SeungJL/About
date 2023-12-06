import { Button, ButtonGroup } from "@chakra-ui/react";
import styled from "styled-components";
import { DispatchString } from "../../types/reactTypes";

interface IButtonCheckNav {
  buttonList: string[];
  selectedButton: string;
  setSelectedButton: DispatchString;
  isLineBtn?: boolean;
}

function ButtonCheckNav({
  buttonList,
  selectedButton,
  setSelectedButton,
  isLineBtn,
}: IButtonCheckNav) {
  const filtered = buttonList.filter((item) => item !== "마포");
  return (
    <Layout>
      <ButtonGroup gap={!isLineBtn ? "var(--margin-md)" : "0"}>
        {!isLineBtn
          ? filtered.map((item) => (
              <Button
                bgColor={
                  item === selectedButton ? "var(--color-mint)" : "white"
                }
                color={item === selectedButton ? "white" : "var(--font-h2)"}
                key={item}
                onClick={() => setSelectedButton(item)}
                ml="0px !important"
                border="1px solid var(--font-h5)"
                _focus={{ outline: "none", bgColor: "var(--color-mint)" }}
              >
                {item}
              </Button>
            ))
          : filtered.map((item) => (
              <Button
                variant="ghost"
                color={
                  item === selectedButton ? "var(--font-h1)" : "var(--font-h3)"
                }
                key={item}
                onClick={() => setSelectedButton(item)}
                ml="0px !important"
                fontWeight={400}
                borderBottom={
                  item === selectedButton
                    ? "1.5px solid var(--font-h1)"
                    : "1.5px solid var(--font-h56)"
                }
                borderRadius="0"
                _focus={{ outline: "none", bgColor: "transparent" }}
              >
                {item}
              </Button>
            ))}
      </ButtonGroup>
    </Layout>
  );
}

const Layout = styled.div`
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ButtonCheckNav;
