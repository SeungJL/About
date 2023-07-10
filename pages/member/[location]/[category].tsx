import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import Header from "../../../components/layouts/Header";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import dbConnect from "../../../libs/dbConnect";
import { birthToDayjs } from "../../../libs/utils/dateUtils";
import { birthToAge } from "../../../libs/utils/membersUtil";
import { User } from "../../../models/user";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { transferUserDataState } from "../../../recoil/transferDataAtoms";
import { FRIEND_RECOMMEND_CATEGORY } from "../../../storage/friend";
import { IUser } from "../../../types/user";

function FriendCategory({ membersListAll }: { membersListAll: IUser[] }) {
  const router = useRouter();
  const idx = Number(router.query?.category);

  const locationUrl = router?.query?.location;

  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const [filterMember, setFilterMember] = useState<IUser[]>([]);

  const { data, isLoading } = useUserInfoQuery();
  console.log(locationUrl);
  const setUserData = useSetRecoilState(transferUserDataState);

  useEffect(() => {
    if (!isLoading) {
      if (idx === 0)
        setFilterMember(
          membersListAll?.filter(
            (who) => +birthToAge(who?.birth) === +birthToAge(data?.birth)
          )
        );
      if (idx === 1)
        setFilterMember(
          membersListAll?.filter(
            (who) =>
              who?.mbti === data?.mbti && who?.location === data?.location
          )
        );

      if (idx === 2)
        setFilterMember(
          membersListAll?.filter((who) => {
            const birthDayjs = birthToDayjs(who.birth);

            return (
              birthDayjs.month() === dayjs().month() &&
              who?.location === data?.location
            );
          })
        );
      if (idx === 3) {
        setFilterMember(
          membersListAll?.filter((who) => {
            return (
              who?.majors &&
              who?.majors[0]?.department === data?.majors[0]?.department
            );
          })
        );
      }
    }
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
          <Item key={who?.uid} onClick={() => onClickProfile(who)}>
            <ProfileHeader>
              <ProfileIcon user={who} size="md" />
              <span>{who?.name}</span>
            </ProfileHeader>

            <Info>
              <Detail>
                <span>나이</span>
                <span>{birthToAge(who?.birth)}</span>
                {idx === 2 && (
                  <Birthday>
                    / {birthToDayjs(who?.birth).format("M월 D일")}
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
  padding: 14px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const Item = styled.div`
  border: 1.5px solid var(--font-h6);
  border-radius: var(--border-radius-sub);
  padding: 6px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-weight: 600;
    margin-left: 14px;
    font-size: 15px;
  }
`;

const Info = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  line-height: 2.2;
  padding-left: 4px;
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
  margin-left: 4px;
  font-weight: 600;
  color: var(--font-h1);
`;

export default FriendCategory;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }

  await dbConnect();

  const user = await User.find();
  const filterUser = user?.filter((who) => who?.isActive);
  const membersListAll = JSON.parse(safeJsonStringify(filterUser));

  return { props: { membersListAll } };
};
