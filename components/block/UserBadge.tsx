import { Badge } from "@chakra-ui/react";
import styled from "styled-components";

export default function UserBadge({ role }) {
  let badgeName = "스터디원";
  if (role === "member") badgeName = "스터디원";
  if (role === "previliged") badgeName = "관리자";
  return (
    <Badge
      colorScheme={role === "member" ? "teal" : "orange"}
      fontSize="12"
      variant="outline"
    >
      {badgeName}
    </Badge>
  );
}
