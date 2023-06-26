import { Badge } from "@chakra-ui/react";
import styled from "styled-components";
import { GatherCategoryIcons, GATHER_CATEGORY } from "../../../storage/Gather";

interface IGatherBadge {
  typeTitle: string;
}

function GatherBadge({ typeTitle }: IGatherBadge) {
  const categoryIcon =
    GatherCategoryIcons[
      GATHER_CATEGORY?.findIndex((item) => item?.title === typeTitle)
    ];
  return (
    <Badge p="4px 6px" my="4px" fontSize="12px" alignSelf="flex-start">
      {categoryIcon}
      <Category>{typeTitle}</Category>
    </Badge>
  );
}

const Layout = styled.div``;
const Category = styled.span`
  margin: 0 4px;
`;

export default GatherBadge;
