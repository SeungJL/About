import { Skeleton } from "@chakra-ui/react";
import styled from "styled-components";

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

const Layout = styled.div`
  height: 100px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px;
`;

export default AboutMainSkeletonItem;
