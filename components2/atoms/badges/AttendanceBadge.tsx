import { Badge } from "@chakra-ui/react";
import styled from "styled-components";
interface IAttendanceBadge {
  type: "attend" | "dismissed";
  time?: string;
}

export default function AttendanceBadge({ type, time }: IAttendanceBadge) {
  return (
    <BadgeContainer time={time}>
      <Badge
        p="3px 6px"
        variant="outline"
        colorScheme={type === "attend" ? "mintTheme" : "redTheme"}
      >
        {type === "attend" ? "출석" : "불참"}
      </Badge>
      {time && <TimeText>{time}</TimeText>}
    </BadgeContainer>
  );
}

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${(props) => (props.time ? "8px" : "0")};
`;

const TimeText = styled.span`
  font-size: 10px; /* Equivalent to text-xxs */
  color: var(--gray-3); /* Assuming text-gray-4 maps to this color */
`;
