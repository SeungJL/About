import { Button, ButtonGroup } from "@chakra-ui/react";
import styled from "styled-components";
import { DispatchString } from "../../types/reactTypes";

interface IButtonCheckNav {
  buttonList: string[];
  selectedButton: string;
  setSelectedButton: DispatchString;
}

function ButtonCheckNav({
  buttonList,
  selectedButton,
  setSelectedButton,
}: IButtonCheckNav) {
  const filtered = buttonList.filter((item) => item !== "마포");
  return (
    <Layout>
      <ButtonGroup gap="var(--margin-md)">
        {filtered.map((item) => (
          <Button
            bgColor={item === selectedButton ? "var(--color-mint)" : "white"}
            color={item === selectedButton ? "white" : "var(--font-h2)"}
            key={item}
            onClick={() => setSelectedButton(item)}
            ml="0px !important"
            border="1px solid var(--font-h5)"
            _focus={{ outline: "none", bgColor: "var(--color-mint)" }}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
    </Layout>
  );
}

const Layout = styled.div``;

export default ButtonCheckNav;
