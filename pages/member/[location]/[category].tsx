import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import Header from "../../../components/layout/Header";
import { birthToAge, birthToDayjs } from "../../../helpers/converterHelpers";
import { useUserInfoQuery } from "../../../hooks/user/queries";

import { FRIEND_RECOMMEND_CATEGORY } from "../../../constants/contents/friend";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import {
  transferMemberDataState,
  transferUserDataState,
} from "../../../recoil/transferDataAtoms";
import { IUser } from "../../../types/user/user";

function FriendCategory() {
  const router = useRouter();
  const locationUrl = router.query?.location;
  const idx = Number(router.query?.category);

  const membersData = useRecoilValue(transferMemberDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const setUserData = useSetRecoilState(transferUserDataState);

  const [filterMember, setFilterMember] = useState<IUser[]>([]);

  const { data: userInfo, isLoading } = useUserInfoQuery();

  const members = membersData?.members;

  useEffect(() => {
    if (isLoading || !members) return;

    const filtered = members.filter((who) => {
      switch (idx) {
        case 0:
          return birthToAge(who.birth) === birthToAge(userInfo.birth);
        case 1:
          return who.mbti === userInfo.mbti;
        case 2:
          const birthDayjs = birthToDayjs(who.birth);
          return birthDayjs.month() === dayjs().month();
        case 3:
          return (
            who?.majors &&
            who?.majors[0]?.department === userInfo?.majors[0]?.department
          );
      }
    });
    setFilterMember(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onClickProfile = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <>
      <Header
        title={FRIEND_RECOMMEND_CATEGORY[idx]}
        url={`/member/${locationUrl}`}
      />
      <Layout>
        {filterMember?.map((who) => (
          <Item key={who.uid} onClick={() => onClickProfile(who)}>
            <ProfileHeader>
              <ProfileIcon user={who} size="md" />
              <span>{who.name}</span>
            </ProfileHeader>
            <Info>
              <Detail>
                <span>나이</span>
                <span>{birthToAge(who.birth)}</span>
                {idx === 2 && (
                  <Birthday>
                    / {dayjsToFormat(birthToDayjs(who.birth), "M월 D일")}
                  </Birthday>
                )}
              </Detail>
              <Detail>
                <span>성별</span>
                <span>{who?.gender.slice(0, 1)}</span>
              </Detail>
              <Detail>
                <span>MBTI</span>
                <span>{who?.mbti || "미작성"}</span>
              </Detail>
              <Detail>
                <span>전공</span>
                <span>{who?.majors ? who?.majors[0]?.detail : "미작성"}</span>
              </Detail>
            </Info>
          </Item>
        ))}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--margin-md);
`;

const Item = styled.div`
  border: var(--border-main-light);
  border-radius: var(--border-radius-sub);
  padding: var(--padding-md);
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-weight: 600;
    margin-left: var(--margin-main);
    font-size: 15px;
  }
`;

const Info = styled.div`
  margin-top: var(--margin-sub);
  display: flex;
  flex-direction: column;
  line-height: 2.2;
  padding-left: var(--padding-min);
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  > span:first-child {
    display: inline-block;
    width: 50px;
    font-size: 12px;
    font-weight: 600;
    color: var(--font-h3);
  }
  > span:last-child {
    color: var(--font-h1);
    font-size: 13px;
  }
`;

const Birthday = styled.span`
  margin-left: var(--margin-min);
  font-weight: 600;
  color: var(--font-h1);
`;

export default FriendCategory;
