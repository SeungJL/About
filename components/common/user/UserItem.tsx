import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../recoil/transferDataAtoms";
import { IUser } from "../../../types/user/user";
import ProfileIcon from "./Profile/ProfileIcon";

interface IUserItem {
  user: IUser;

  children: React.ReactNode;
}

export const UserItem = ({ user, children }: IUserItem) => {
  const router = useRouter();
  const setUserData = useSetRecoilState(transferUserDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const onClickProfile = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };
  return (
    <MemberItem key={user.uid} onClick={() => onClickProfile(user)}>
      <ProfileIcon user={user} size="sm" />
      <UserOverview>
        <span>{user?.name}</span>
        <div>{user.comment}</div>
      </UserOverview>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </MemberItem>
  );
};

const MemberItem = styled.div`
  padding: var(--gap-2) 0;
  display: flex;
  align-items: center;

  border-bottom: var(--border-light);
`;

const UserOverview = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  margin-left: var(--gap-3);
  > span:first-child {
    font-size: 14px;
    font-weight: 600;
  }
  > div:last-child {
    width: 95%;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    font-size: 13px;
    color: var(--gray-2);
  }
`;

const ChildrenWrapper = styled.div``;
