import { Skeleton } from "@chakra-ui/react";

function AboutMainSkeletonItem() {
  return (
    <Skeleton
      h="100px"
      borderRadius="8px"
      mb="12px"
      p="12px"
      startColor="RGB(227, 230, 235)"
      endColor="rgb(246,247,249)"
    ></Skeleton>
  );
}

export default AboutMainSkeletonItem;
