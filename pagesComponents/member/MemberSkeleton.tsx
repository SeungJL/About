import styled from "styled-components";
import MemberRecommend from "./MemberRecommend";
import MemberSectionTitle from "./MemberSectionTitle";
import MemberMyProfileSkeleton from "./memberSkeleton/MemberMyProfileSkeleton";
import MemberOverviewSkeleton from "./memberSkeleton/MemberOverviewSkeleton";
import MemberSectionListSkeleton from "./memberSkeleton/MemberSectionListSkeleton";

function MemberSkeleton() {
  return (
    <Layout>
      <MemberOverviewSkeleton />
      <HrDiv />
      <MemberMyProfileSkeleton />
      <HrDiv />
      <MembersContainer>
        <MemberTitle>멤버 소개</MemberTitle>
        <Section>
          <MemberSectionTitle section="member" />
          <MemberSectionListSkeleton />
        </Section>
        <Section>
          <MemberSectionTitle section="human" />
          <MemberSectionListSkeleton />
        </Section>
        <Section>
          <MemberSectionTitle section="resting" />
          <MemberSectionListSkeleton />
        </Section>
      </MembersContainer>
      <HrDiv />
      <MemberRecommend />
    </Layout>
  );
}

const Layout = styled.div`
  > div:first-child {
    margin-top: 0;
  }
`;
const MembersContainer = styled.div`
  margin: 0 var(--margin-main);
  padding-top: var(--padding-sub);
  padding-bottom: var(--padding-main);
  > section {
    padding-top: var(--margin-main);
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
export default MemberSkeleton;
