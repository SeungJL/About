import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import dbConnect from "../../libs/dbConnect";
import { User } from "../../models/user";
import MemberHeader from "../../pagesComponents/member/MemberHeader";
import MemberMyProfile from "../../pagesComponents/member/MemberMyProfile";
import MemberOverview from "../../pagesComponents/member/MemberOverview";
import MemberRecommend from "../../pagesComponents/member/MemberRecommend";
import MemberSectionList from "../../pagesComponents/member/MemberSectionList";
import MemberSectionTitle from "../../pagesComponents/member/MemberSectionTitle";
import MemberSkeleton from "../../pagesComponents/member/MemberSkeleton";
import { IUser } from "../../types/user";
function Member({ membersAll }) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const router = useRouter();
  const location = router.query.location;

  const [members, setMembers] = useState<IUser[]>();
  const [memberMembers, setMemberMembers] = useState<IUser[]>();
  const [humanMembers, setHumanMembers] = useState<IUser[]>();
  const [restingMembers, setRestingMembers] = useState<IUser[]>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMembers(membersAll?.filter((who) => who?.location === location));
  }, [location, membersAll]);

  useEffect(() => {
    if (!members) return;
    let memberArr = [];
    let humanArr = [];
    let restingArr = [];
    members?.forEach((who) => {
      if (
        who.role === "member" ||
        who.role === "previliged" ||
        who.role === "manager"
      )
        memberArr.push(who);
      if (who.role === "human") humanArr.push(who);
      if (who.role === "resting") restingArr.push(who);
    });
    setMemberMembers(memberArr);
    setHumanMembers(humanArr);
    setRestingMembers(restingArr);
    setIsLoading(false);
  }, [members]);

  return (
    <>
      <MemberHeader />
      <Layout isLoading={isLoading}>
        <MemberOverview
          totalMemberCnt={members?.length}
          activeMemberCnt={memberMembers?.length}
        />
        <HrDiv />
        {!isGuest && (
          <>
            <MemberMyProfile />
            <HrDiv />
            <MembersContainer>
              <MemberTitle>멤버 소개</MemberTitle>
              <Section>
                <MemberSectionTitle
                  category="활동 멤버"
                  subTitle="정식 활동 멤버입니다"
                />
                <MemberSectionList users={memberMembers} />
              </Section>
              <Section>
                <MemberSectionTitle
                  category="수습 멤버"
                  subTitle="열심히 활동해봐요~!"
                />
                <MemberSectionList users={humanMembers} />
              </Section>
              <Section>
                <MemberSectionTitle
                  category="휴식 멤버"
                  subTitle="휴식중인 멤버입니다"
                />
                <MemberSectionList users={restingMembers} />
              </Section>
            </MembersContainer>
            <HrDiv />
            <MemberRecommend />
          </>
        )}
      </Layout>

      {isLoading && <MemberSkeleton />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const user = await User.find();
  const filterUser = user?.filter((who) => who?.isActive);
  const membersAll = JSON.parse(safeJsonStringify(filterUser));

  return { props: { membersAll } };
};

const MembersContainer = styled.div`
  margin: 0 var(--margin-main);
  padding-top: var(--padding-sub);
  padding-bottom: var(--padding-main);
  > section {
    padding-top: var(--margin-main);
  }
`;

const Layout = styled.div<{ isLoading: boolean }>`
  visibility: ${(props) => (props.isLoading ? "hidden" : "visibility")};
  > div:first-child {
    margin-top: 0;
  }
`;

const Section = styled.section`
  > div:last-child {
    height: 60px;
    margin: var(--margin-sub) 0;
    margin-left: -8px;
  }
`;
const MemberTitle = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const HrDiv = styled.div`
  margin: 0 !important;
  padding: 0 !important;
  height: 1px;
  background-color: var(--font-h5);
`;
export default Member;
