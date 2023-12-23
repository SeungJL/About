import { Box, Flex, Text } from "@chakra-ui/react";
import { faCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { DispatchString } from "../../types/reactTypes";

interface ICheckBoxNav {
  buttonList: string[];
  selectedButton: string;
  setSelectedButton: DispatchString;
}

function CheckBoxNav({
  buttonList,
  selectedButton,
  setSelectedButton,
}: ICheckBoxNav) {
  const handleCheckBoxChange = (value: string) => {
    setSelectedButton(selectedButton === value ? "" : value);
  };

  return (
    <Layout>
      <Flex overflowX="auto" flexWrap="wrap" lineHeight={2.2}>
        {buttonList?.map((item) => (
          <Box
            key={item}
            display="flex"
            alignItems="center"
            mr="var(--margin-main)"
          >
            <Flex
              as="button"
              h="20px"
              w="20px"
              borderWidth={selectedButton === item ? "0" : "1.5px"}
              borderRadius="var(--border-radius2)"
              borderColor="var(--font-h5)"
              bg={selectedButton === item ? "var(--color-mint)" : "white"}
              onClick={() => handleCheckBoxChange(item)}
              justifyContent="center"
              alignItems="center"
            >
              {selectedButton === item && (
                <FontAwesomeIcon icon={faCheck} color="white" />
              )}
            </Flex>
            <Text ml="var(--margin-md)">{item}</Text>
          </Box>
        ))}
      </Flex>
    </Layout>
  );
}

const Layout = styled.div`
  padding: 0 var(--padding-main);
`;

export default CheckBoxNav;
