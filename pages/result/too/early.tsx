import { Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";

const TooEarly: NextPage = () => {
  return (
    <VStack height='100%' justifyContent='center'>
      <Text fontSize='xl'>아직 결과가 나오지 않았어요 🤷</Text>
    </VStack>
  )
}

export default TooEarly
