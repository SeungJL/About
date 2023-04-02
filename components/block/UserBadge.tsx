import { Badge } from "@chakra-ui/react";
import styled from "styled-components";

export default function RoleBadge({ role }) {
  let badgeName = "스터디원";
  if (role === "member") badgeName = "스터디원";
  if (role === "previliged") badgeName = "관리자";
  return (
    <Badge
      colorScheme={role === "member" ? "teal" : "orange"}
      fontSize="12"
      variant="subtle"
    >
      {badgeName}
    </Badge>
  );
}
