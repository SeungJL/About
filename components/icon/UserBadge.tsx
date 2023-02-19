import styled from "styled-components";

const UserBadgeLayout = styled.div`
  background-color: #c6f6d5;
  color: rgb(34, 84, 61);
  font-size: 0.8em;
  padding: 1px;
  text-align: center;
  width: 50px;
  height: 20px;
  border-radius: 8px;
`;

export default function UserBadge({ role }) {
  return <UserBadgeLayout>{role}</UserBadgeLayout>;
}
