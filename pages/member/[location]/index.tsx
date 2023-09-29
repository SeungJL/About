import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";
import styled from "styled-components";
import BlurredPart from "../../../components/common/masks/BlurredPart";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
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
import { isGuestState } from "../../../recoil/userAtoms";
import { IGroupedMembers, MemberGroup } from "../../../types/page/member";
import { IUser } from "../../../types/user/user";

interface IMember {
  usersAll: IUser[];
}

const MEMBER_SECTIONS: MemberGroup[] = ["member", "human", "birth", "resting"];

export const SECTION_NAME: Record<MemberGroup, string> = {
  member: "활동 멤버",
  human: "수습 멤버",
  resting: "휴식 멤버",
  birth: "생일",
};

function Member({ usersAll }: IMember) {
  const router = useRouter();
  const location = router.query.location;
  const isGuest = useRecoilValue(isGuestState);

  const setTransferMemberData = useSetRecoilState(transferMemberDataState);

  const [groupedMembers, setgroupedMembers] = useState<IGroupedMembers>();
  const [locationMemberCnt, setLocationMemberCnt] = useState<number>();

  //멤버 분류
  useEffect(() => {
    if (!location) return;
    const locationMembers = usersAll.filter((who) => who.location === location);
    setLocationMemberCnt(locationMembers.length);
    const classified = {
      member: [],
      human: [],
      resting: [],
      birth: [],
    };
    locationMembers.forEach((who) => {
      switch (who.role) {
        case "member":
        case "previliged":
        case "manager":
          classified.member.push(who);
          break;
        case "human":
          classified.human.push(who);
          break;
        case "resting":
          if (dayjs(who.rest.endDate) >= dayjs()) classified.resting.push(who);
          else classified.member.push(who);
          break;
      }
      const today = dayjsToFormat(dayjs(), "MMDD");
      if (who.role !== "human" && who.birth.slice(2) === today) {
        classified.birth.push(who);
      }
    });
    setgroupedMembers(classified);
  }, [location, usersAll]);

  //상세페이지로 이동
  const onClickSection = (section: MemberGroup) => {
    setTransferMemberData({ section, members: groupedMembers[section] });
    router.push(`/member/${location}/detail`);
  };

  return (
    <>
      <MemberHeader />
      {groupedMembers ? (
        <Layout>
          <MemberOverview
            totalMemberCnt={locationMemberCnt}
            activeMemberCnt={groupedMembers.member.length}
          />
          <HrDiv />
          <MemberMyProfile />
          <HrDiv />
          <MembersContainer>
            <MemberTitle>멤버 소개</MemberTitle>
            {MEMBER_SECTIONS.map((section) => {
              if (section === "birth" && groupedMembers.birth.length === 0)
                return;
              return (
                <Section key={section}>
                  <MemberSectionTitle
                    section={section}
                    onClickSection={onClickSection}
                  />
                  <BlurredPart isBlur={isGuest}>
                    <MemberSectionList members={groupedMembers[section]} />
                  </BlurredPart>
                </Section>
              );
            })}
          </MembersContainer>
          <HrDiv />
          <MemberRecommend />
        </Layout>
      ) : (
        <MemberSkeleton />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const user = await User.find();
  const filterUser = user?.filter((who) => who?.isActive);
  const usersAll = JSON.parse(safeJsonStringify(filterUser));

  return { props: { usersAll } };
};

const MembersContainer = styled.div`
  margin: 0 var(--margin-main);
  padding-top: var(--padding-sub);
  padding-bottom: var(--padding-main);
  > section {
    padding-top: var(--margin-main);
  }
`;

const Layout = styled.div`
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
  background-color: var(--font-h6);
`;
export default Member;
