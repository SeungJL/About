import styled from "styled-components";

export default function UserBadge({ role }) {
  let badgeName = role;
  if (badgeName === "member") badgeName = "스터디원";
  if (badgeName === "previliged") badgeName = "관리자";
  return <UserBadgeLayout role={role}>{badgeName}</UserBadgeLayout>;
}

const UserBadgeLayout = styled.div<{ role: string }>`
  background-color: ${(props) => {
    const State = props.role;
    if (State === "member") return "#c6f6d5";
    if (State === "previliged") return "#ffc72c";
  }};
  color: ${(props) => {
    const State = props.role;
    if (State === "member") return "rgb(34,84,61)";
    if (State === "previliged") return "#2c3e50";
  }};

  text-align: center;

  font-size: 10px;
  border-radius: 8px;
  padding: 0px 4px;
`;
