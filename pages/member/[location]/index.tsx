import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import BlurredPart from "../../../components/common/masks/BlurredPart";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { useAdminUsersControlQuery } from "../../../hooks/admin/quries";
import { useStudyPlacesQuery } from "../../../hooks/study/queries";
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

const MEMBER_SECTIONS: MemberGroup[] = ["birth", "member", "human", "resting"];

export const SECTION_NAME: Record<MemberGroup, string> = {
  member: "활동 멤버",
  human: "수습 멤버",
  resting: "휴식 멤버",
  birth: "생일",
};

function Member() {
  const router = useRouter();
  const location = router.query.location;
  const isGuest = useRecoilValue(isGuestState);

  const setTransferMemberData = useSetRecoilState(transferMemberDataState);

  const [groupedMembers, setgroupedMembers] = useState<IGroupedMembers>();
  const [locationMembers, setLocationMembers] = useState<IUser[]>();

  const { data: usersAll, isLoading } = useAdminUsersControlQuery();

  const { data: studyPlaces } = useStudyPlacesQuery();
  const locationPlaces = studyPlaces?.filter(
    (place) => place?.location === location
  );

  //멤버 분류
  useEffect(() => {
    if (!location || isLoading) return;

    const locationMembers = usersAll
      .filter((who) => who.location === location)
      .sort((a, b) => (a.score > b.score ? -1 : 1));
    setLocationMembers(locationMembers);

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
  }, [isLoading, location, usersAll]);

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
            totalMemberCnt={locationMembers.length}
            activeMemberCnt={groupedMembers.member.length}
            locationPlaces={locationPlaces}
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
          <MemberRecommend members={locationMembers} />
        </Layout>
      ) : (
        <MemberSkeleton />
      )}
    </>
  );
}

const MembersContainer = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
  > section {
    margin-top: var(--margin-sub);
  }
`;

const Layout = styled.div`
  margin-top: var(--margin-min);
  > div:first-child {
    margin-top: 0;
  }
`;

const Section = styled.section`
  > div:last-child {
    height: 60px;
    margin-top: var(--margin-sub);
    margin-left: -8px;
  }
`;
const MemberTitle = styled.span`
  font-size: 14px;
  font-weight: 800;
`;

const HrDiv = styled.div`
  margin: 0 !important;
  padding: 0 !important;
  height: 1px;
  background-color: var(--font-h6);
`;
export default Member;
