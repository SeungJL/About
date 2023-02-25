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
  font-size: ${(props) => {
    const State = props.role;
    if (State === "member") return "0.8em";
    if (State === "previliged") return "0.9em";
  }};
  padding: 1px;
  text-align: center;
  width: 50px;
  height: 18px;
  font-size: 0.8em;
  border-radius: 8px;
`;
