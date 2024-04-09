import styled from "styled-components";

import { IUserSummary } from "../../../types/models/userTypes/userInfoTypes";
import Avatar from "../../atoms/Avatar";
import UserBadge from "../../atoms/badges/UserBadge";

export interface IProfileCommentCard {
  user: IUserSummary;
  comment?: string;
  rightComponent?: React.ReactNode;
}

export default function ProfileCommentCard({
  user,
  comment,
  rightComponent,
}: IProfileCommentCard) {
  return (
    <CardContainer>
      <Avatar
        image={user.profileImage}
        size="md"
        avatar={user.avatar}
        uid={user.uid}
      />
      <UserInfoContainer>
        <UserNameBadgeContainer>
          <span>{user.name}</span>
          <UserBadge score={user.score} uid={user.uid} />
        </UserNameBadgeContainer>
        <CommentText>{comment !== null ? comment : user.comment}</CommentText>
      </UserInfoContainer>
      <RightComponentContainer>{rightComponent}</RightComponentContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px; /* py-3 px-4 */
  border-bottom: var(--border); /* border-b */
  line-height: 24px; /* leading-6 */
  height: 72px;
`;

const UserInfoContainer = styled.div`
  margin-left: 12px; /* ml-3 */
`;

const UserNameBadgeContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px; /* text-sm */
  font-weight: 600; /* font-semibold */
  > span:first-child {
    margin-right: 6px;
  }
`;

const CommentText = styled.span`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--gray-3); /* text-gray-4 */
  font-size: 13px;
`;

const RightComponentContainer = styled.div`
  margin-left: auto;
`;
