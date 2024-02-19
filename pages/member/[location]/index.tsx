import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/loaders/MainLoading";
import BlurredPart from "../../../components/common/masks/BlurredPart";
import Slide from "../../../components/layout/PageSlide";
import SectionBar from "../../../components2/molecules/bars/SectionBar";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { useAdminUsersLocationControlQuery } from "../../../hooks/admin/quries";
import MemberHeader from "../../../pageTemplates/member/MemberHeader";
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
      <Slide isFixed={true}>
        <MemberHeader />
      </Slide>
      {groupedMembers ? (
        <Slide>
          <SectionBar title="멤버 소개" size="md" hasMoreBtn={false} />
          <Box mx="16px">
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

            <HrDiv />
          </Box>
          <MemberRecommend members={locationMembers} />
        </Slide>
      ) : (
        <MainLoading />
        // <MemberSkeleton />
      )}
    </>
  );
}

const Section = styled.section`
  margin-top: 12px;
  > div:last-child {
    height: 60px;
    margin-top: var(--gap-3);
    margin-left: -8px;
  }
`;

const HrDiv = styled.div`
  margin: 0 !important;
  padding: 0 !important;
  height: 1px;
  background-color: var(--gray-6);
`;
export default Member;
