import { Button, Flex } from "@chakra-ui/react";

export default function Admin() {
  const onResetScore = () => {};
  const onResetPoint = () => {};
  const onDeleteVote = () => {};
  return (
    <Flex flexDir="column">
      <Button>score초기화</Button>
      <Button>point초기화</Button>
      <Button>현재날짜 + 3일 이후 투표 모두 삭제</Button>
      <Button></Button>
    </Flex>
  );
}
