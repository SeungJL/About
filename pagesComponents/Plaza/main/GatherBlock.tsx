import { background } from "@chakra-ui/react";
import {
  faCalendarDay,
  faUserCheck,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { ChangeEvent } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ProfileIconMd from "../../../components/common/Profile/ProfileIconMd";
import ProfileIconSm from "../../../components/common/Profile/ProfileIconSm";
import ProfileIconSmOne from "../../../components/common/Profile/ProfileIconSmOne";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import { ICategory } from "../../../pages/members/[type]";
import { category, IPlazaData } from "../../../types/plaza";

function GatherBlock({
  data,
  category,
}: {
  data: IPlazaData;
  category: category;
}) {
  const { data: user } = useUserInfoQuery();

  return (
    <Layout>
      <Header>
        <Status>모집중</Status>·<Category>모임</Category>·
        <Location>아주대</Location>
      </Header>
      <Title>저녁 산책</Title>
      <Detail>
        <Condition>
          <FontAwesomeIcon icon={faUserCheck} color="var(--font-h4)" />
          <span>20대</span>
        </Condition>
        <Date>
          <FontAwesomeIcon icon={faCalendarDay} color="var(--font-h4)" />
          <span>5월 24일</span>
        </Date>
      </Detail>
      <Participant>
        <Writer>
          <ProfileIconSmOne user={user} />
          <span>승주</span>
        </Writer>
        <Voter>
          <FontAwesomeIcon icon={faUserGroup} color="var(--font-h4)" />
          <span>3/5명</span>
        </Voter>
      </Participant>
    </Layout>
  );
}

export default GatherBlock;

const Layout = styled.div`
  display: flex;
  flex-direction: column;

  border-bottom: 6px solid var(--font-h6);
  padding: 14px;
`;

const Header = styled.header`
  font-size: 12px;
  color: var(--font-h3);
  display: flex;
  align-items: center;
`;

const Status = styled.span`
  color: var(--color-mint);
  margin-right: 4px;
`;

const Category = styled.span`
  margin: 0 4px;
`;

const Location = styled.span`
  margin-left: 4px;
`;

const Title = styled.div`
  margin: 6px 0;
  font-size: 15px;
  font-weight: 600;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 2;
`;

const Condition = styled.div`
  > span {
    margin-left: 8px;
  }
`;

const Date = styled.div`
  > span {
    margin-left: 12px;
  }
`;

const Participant = styled.div`
  margin-top: 12px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  > span {
    margin-left: 8px;
  }
`;

const Voter = styled.div`
  display: flex;
  align-items: center;
  > span {
    color: var(--font-h2);
    font-weight: 600;

    margin-left: 3px;
  }
`;
