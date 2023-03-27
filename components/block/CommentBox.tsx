import styled from "styled-components";

const UserCommentBox = styled.div`
  border: 1px solid rgb(0, 0, 0, 0.7);
  padding: 2px;
`;

const UserComment = styled.div`
  > :first-child {
    font-size: 0.8em;
  }
  border: 1px solid rgb(0, 0, 0, 0.7);

  padding: 5px;
  font-size: 0.9em;
`;
export const CommentBox = ({ children }) => (
  <UserCommentBox>
    <UserComment>{children}</UserComment>
  </UserCommentBox>
);
