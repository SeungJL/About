import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import BlurredPart from "../../../components/common/BlurredPart";
import dbConnect from "../../../libs/backend/dbConnect";
import { User } from "../../../models/user";
import MemberHeader from "../../../pagesComponents/member/MemberHeader";
import MemberMyProfile from "../../../pagesComponents/member/MemberMyProfile";
import MemberOverview from "../../../pagesComponents/member/MemberOverview";
import MemberRecommend from "../../../pagesComponents/member/MemberRecommend";
import MemberSectionList from "../../../pagesComponents/member/MemberSectionList";
import MemberSectionTitle from "../../../pagesComponents/member/MemberSectionTitle";
import MemberSkeleton from "../../../pagesComponents/member/MemberSkeleton";
import { transferMemberDataState } from "../../../recoil/transferDataAtoms";
import { MemberSectionCategory } from "../../../types/page/member";
import { IUser } from "../../../types/user/user";

interface IMember {
  membersAll: IUser[];
}

function Member({ membersAll }: IMember) {
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const router = useRouter();
  const location = router.query.location;

  const setTransferMemberData = useSetRecoilState(transferMemberDataState);

  const [members, setMembers] = useState<IUser[]>();
  const [memberMembers, setMemberMembers] = useState<IUser[]>();
  const [humanMembers, setHumanMembers] = useState<IUser[]>();
  const [restingMembers, setRestingMembers] = useState<IUser[]>();
  const [birthMembers, setBirthMembers] = useState<IUser[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [clickSection, setClickSection] = useState<MemberSectionCategory>();

  useEffect(() => {
    setMembers(
      membersAll?.filter(
        (who) => who?.location === (isGuest ? "수원" : location)
      )
    );
  }, [isGuest, location, membersAll]);

  useEffect(() => {
    if (!members) return;
    let memberArr = [];
    let humanArr = [];
    let restingArr = [];
    let adminArr = [];
    let birthArr = [];
    members?.forEach((who) => {
      if (who?.name === "guest") return;

      if (who.role === "member") memberArr.push(who);
      if (who.role === "previliged" || who.role === "manager")
        adminArr.push(who);
      if (who.role === "human") humanArr.push(who);
      if (who.role === "resting") restingArr.push(who);

      if (who.birth.slice(2) === dayjs().format("MMDD") && who.role !== "human")
        birthArr.push(who);
    });
    setMemberMembers([...adminArr, ...memberArr]);
    setHumanMembers(humanArr);
    setRestingMembers(restingArr);
    setBirthMembers(birthArr);
    setIsLoading(false);
  }, [members]);

  useEffect(() => {
    if (!clickSection) return;
    const memberData =
      clickSection === "활동 멤버"
        ? memberMembers
        : clickSection === "수습 멤버"
        ? humanMembers
        : restingMembers;
    setTransferMemberData({ category: clickSection, memberData });
    router.push(`/member/${location}/detail`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickSection]);

  return (
    <>
      <MemberHeader />
      <Layout isLoading={isLoading}>
        <MemberOverview
          totalMemberCnt={members?.length}
          activeMemberCnt={memberMembers?.length}
        />
        <HrDiv />
        <>
          <MemberMyProfile />
          <HrDiv />
          <MembersContainer>
            <MemberTitle>멤버 소개</MemberTitle>
            {birthMembers?.length !== 0 && (
              <Section>
                <MemberSectionTitle
                  category="생일"
                  subTitle="생일을 축하해요!"
                  setClickSection={setClickSection}
                />
                <BlurredPart isBlur={isGuest}>
                  <MemberSectionList users={birthMembers} />
                </BlurredPart>
              </Section>
            )}
            <Section>
              <MemberSectionTitle
                category="활동 멤버"
                subTitle="정식 활동 멤버입니다"
                setClickSection={setClickSection}
              />
              <BlurredPart isBlur={isGuest}>
                <MemberSectionList users={memberMembers} />
              </BlurredPart>
            </Section>
            <Section>
              <MemberSectionTitle
                category="수습 멤버"
                subTitle="열심히 활동해봐요~!"
                setClickSection={setClickSection}
              />
              <BlurredPart isBlur={isGuest}>
                <MemberSectionList users={humanMembers} />
              </BlurredPart>
            </Section>
            <Section>
              <MemberSectionTitle
                category="휴식 멤버"
                subTitle="휴식중인 멤버입니다"
                setClickSection={setClickSection}
              />
              <BlurredPart isBlur={isGuest}>
                <MemberSectionList users={restingMembers} />
              </BlurredPart>
            </Section>
          </MembersContainer>
          <HrDiv />
          <MemberRecommend />
        </>
      </Layout>
      {isLoading && <MemberSkeleton />}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
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
