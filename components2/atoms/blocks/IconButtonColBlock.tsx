import { Box, Button, Flex } from "@chakra-ui/react";

export interface IIconButtonColBlockProps {
  icon: React.ReactNode;
  title: string;
  buttonProp: {
    text: string;
    func: () => void;
  };
  disabled: boolean;
}
interface IIconButtonColBlock {
  props: IIconButtonColBlockProps;
}
export default function IconButtonColBlock({
  props: {
    icon,
    title,
    buttonProp: { text, func },
  },
}: IIconButtonColBlock) {
  return (
    <Flex
      p="12px"
      rounded="lg"
      bgColor="var(--gray-7)"
      direction="column"
      align="center"
    >
      <Box fontSize="36px">{icon}</Box>
      <Box mb="16px" mt="8px" fontSize="18px" fontWeight={800}>
        {title}
      </Box>
      <Button
        size="sm"
        w="100%"
        rounded="lg"
        colorScheme="mintTheme"
        disabled={true}
        onClick={func}
      >
        {text}
      </Button>
    </Flex>
  );
}
