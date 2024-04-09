import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import styled from "styled-components";
import { MainLoading } from "../../components/atoms/loaders/MainLoading";
import Header from "../../components/layouts/Header";
import Slide from "../../components/layouts/PageSlide";
import ProfileCommentCard from "../../components/molecules/cards/ProfileCommentCard";
import {
  useUidsToUsersInfoQuery,
  useUserInfoQuery,
} from "../../hooks/user/queries";
import { prevPageUrlState } from "../../recoils/navigationRecoils";
import { transferUserSummaryState } from "../../recoils/transferRecoils";
import { IUserSummary } from "../../types/models/userTypes/userInfoTypes";

function ProfileFriend() {
  const router = useRouter();

  const { data: userInfo } = useUserInfoQuery();

  const setUserData = useSetRecoilState(transferUserSummaryState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);

  const { data: friends } = useUidsToUsersInfoQuery(userInfo?.friend, {
    enabled: !!userInfo?.friend,
  });

  const onClickUser = (user: IUserSummary) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <>
      <Header title="내 친구 목록" url="/user" />
      {friends ? (
        <Slide>
          {friends?.map((who) => {
            return (
              <Item key={who.uid} onClick={() => onClickUser(who)}>
                <ProfileCommentCard user={who} comment={who.comment} />
              </Item>
            );
          })}
        </Slide>
      ) : (
        <MainLoading />
      )}
    </>
  );
}

const Container = styled.div``;

const Item = styled.div``;

const ProfileWrapper = styled.div``;

const Info = styled.div`
  height: 38px;
  flex: 1;
  margin-left: var(--gap-3);
  display: flex;

  flex-direction: column;

  justify-content: space-between;
  > div:last-child {
    margin-top: 2px;
    font-size: 12px;
    color: var(--gray-3);
    display: flex;
    flex-direction: column;
  }
`;

const RestInfo = styled.div`
  > span:first-child {
    margin-right: var(--gap-1);
  }
  > span:nth-child(2) {
    margin-left: var(--gap-1);
  }
`;

const DDay = styled.span`
  color: var(--color-red);
  margin-left: var(--gap-2);
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
`;

export default ProfileFriend;
