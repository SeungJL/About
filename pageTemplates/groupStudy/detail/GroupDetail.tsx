import { faVenusMars } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { IGroupStudy } from "../../../types/page/groupStudy";
dayjs.locale("ko");

interface IGroupStudyDetailInfo {
  groupStudy: IGroupStudy;
}

function GroupStudyDetailInfo({ groupStudy }: IGroupStudyDetailInfo) {
  return (
    <Layout>
      <Item>
        <ItemText>지역</ItemText>
        <span>{groupStudy.location}</span>
      </Item>
      <Item>
        <ItemText>목적</ItemText>
        <span>
          {groupStudy.category.main} - {groupStudy.category.sub}
        </span>
        {groupStudy.gender && (
          <FontAwesomeIcon icon={faVenusMars} color="#9E7CFF" />
        )}
      </Item>
      <Item>
        <ItemText>활동</ItemText>
        <span>{groupStudy.period}</span>
      </Item>
      <Item>
        <ItemText>개설</ItemText>
        <span>
          {dayjsToFormat(dayjs(groupStudy.createdAt), "YYYY년 M월 D일")}
        </span>
      </Item>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--gap-2) var(--gap-3);

  background-color: white;
  border-radius: var(--rounded);
  box-shadow: var(--shadow);
`;

const ItemText = styled.span`
  font-weight: 600;
  margin-right: var(--gap-3);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--gap-1);
  > span:nth-child(2) {
    margin: 0 var(--gap-1);
  }
`;

const LocationSub = styled.div`
  color: var(--gray-3);
  font-size: 12px;
  margin: 2px 0;
  margin-left: 44px;
`;

const Secret = styled.div`
  display: flex;
  align-items: center;

  > span:first-child {
    margin-left: var(--gap-1);
    margin-right: var(--gap-2);
  }
`;

export default GroupStudyDetailInfo;
