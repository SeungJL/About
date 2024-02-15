import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/loaders/MainLoading";
import BlurredPart from "../../../components/common/masks/BlurredPart";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { useAdminUsersLocationControlQuery } from "../../../hooks/admin/quries";
import { useStudyPlacesQuery } from "../../../hooks/study/queries";
import MemberHeader from "../../../pageTemplates/member/MemberHeader";
import MemberOverview from "../../../pageTemplates/member/MemberOverview";
import MemberRecommend from "../../../pageTemplates/member/MemberRecommend";
import MemberSectionList from "../../../pageTemplates/member/MemberSectionList";
import MemberSectionTitle from "../../../pageTemplates/member/MemberSectionTitle";
import { transferMemberDataState } from "../../../recoil/transferDataAtoms";
import { isGuestState } from "../../../recoil/userAtoms";
import { IGroupedMembers, MemberGroup } from "../../../types/page/member";
import { Location } from "../../../types/system";
import { IUser } from "../../../types/user/user";

const MEMBER_SECTIONS: MemberGroup[] = [
  "birth",
  "member",
  "human",
  "enthusiastic",
  "resting",
];

export const SECTION_NAME: Record<MemberGroup, string> = {
  member: "활동 멤버",
  human: "수습 멤버",
  enthusiastic: "열공 멤버",
  resting: "휴식 멤버",
  birth: "생일",
  groupA: "소그룹 A",
  groupB: "소그룹 B",
  groupC: "소그룹 C",
  groupD: "소그룹 D",
  groupE: "소그룹 E",
  groupF: "소그룹 F",
};

function Member() {
  const router = useRouter();
  const location = router.query.location;
  const isGuest = useRecoilValue(isGuestState);

  const setTransferMemberData = useSetRecoilState(transferMemberDataState);

  const [groupedMembers, setgroupedMembers] = useState<IGroupedMembers>();
  const [locationMembers, setLocationMembers] = useState<IUser[]>();

  const { data: usersAll, isLoading } = useAdminUsersLocationControlQuery(
    location as Location,
    {
      enabled: !!location,
    }
  );

  const { data: studyPlaces } = useStudyPlacesQuery(location as Location);

  //멤버 분류
  useEffect(() => {
    if (!location || isLoading) return;

    const locationMembers = usersAll.sort((a, b) =>
      a.score > b.score ? -1 : 1
    );
    setLocationMembers(locationMembers);

    const classified = {
      member: [],
      human: [],
      resting: [],
      birth: [],
      enthusiastic: [],
      groupA: [],
      groupB: [],
      groupC: [],
      groupD: [],
      groupE: [],
      groupF: [],
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
        case "enthusiastic":
          classified.enthusiastic.push(who);
          break;
        case "resting":
          if (dayjs(who.rest.endDate) >= dayjs()) classified.resting.push(who);
          else classified.member.push(who);
          break;
      }
      const belong = who?.belong?.split("/")?.[1];
      if (belong === "A") classified.groupA.push(who);
      if (belong === "B") classified.groupB.push(who);
      if (belong === "C") classified.groupC.push(who);
      if (belong === "D") classified.groupD.push(who);
      if (belong === "E") classified.groupE.push(who);
      if (belong === "F") classified.groupF.push(who);

      const today = dayjsToFormat(dayjs(), "MMDD");
      if (who.role !== "human" && who.birth.slice(2) === today) {
        classified.birth.push(who);
      }
    });
    setgroupedMembers(classified);
  }, [isLoading, location, usersAll]);

  //상세페이지로 이동
  const onClickSection = (section: MemberGroup) => {
    setTransferMemberData({
      section,
      members: sortGroup(groupedMembers[section]),
    });
    router.push(`/member/${location}/detail`);
  };

  const sortGroup = (members: IUser[]) => {
    const temp = [...members];
    const idx = temp.findIndex(
      (who) => who.role === "manager" || who.role === "previliged"
    );
    if (idx > -1) {
      const item = temp[idx];
      temp.splice(idx, 1);
      temp.unshift(item);
    }
    return temp;
  };

  return (
    <>
      <MemberHeader />
      {groupedMembers ? (
        <Layout>
          <MemberOverview
            onClickSection={onClickSection}
            groups={[
              groupedMembers?.groupA.length
                ? sortGroup(groupedMembers.groupA)
                : null,
              groupedMembers?.groupB.length
                ? sortGroup(groupedMembers.groupB)
                : null,
              groupedMembers?.groupC.length
                ? sortGroup(groupedMembers.groupC)
                : null,
              groupedMembers?.groupD.length
                ? sortGroup(groupedMembers.groupD)
                : null,
              groupedMembers?.groupE.length
                ? sortGroup(groupedMembers.groupE)
                : null,
              groupedMembers?.groupF.length
                ? sortGroup(groupedMembers.groupF)
                : null,
            ]}
          />
          <HrDiv />

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
        <MainLoading />
        // <MemberSkeleton />
      )}
    </>
  );
}

const MembersContainer = styled.div`
  margin: 0 var(--gap-4);
  padding: var(--gap-3) 0;
  > section {
    margin-top: var(--gap-3);
  }
`;

const Layout = styled.div`
  margin-top: var(--gap-1);
  > div:first-child {
    margin-top: 0;
  }
`;

const Section = styled.section`
  > div:last-child {
    height: 60px;
    margin-top: var(--gap-3);
    margin-left: -8px;
  }
`;
const MemberTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  padding: 16px 0;
`;

const HrDiv = styled.div`
  margin: 0 !important;
  padding: 0 !important;
  height: 1px;
  background-color: var(--gray-6);
`;
export default Member;
