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
  padding: var(--margin-md) var(--margin-sub);

  background-color: white;
  border-radius: var(--border-radius2);
  box-shadow: var(--box-shadow-b);
`;

const ItemText = styled.span`
  font-weight: 600;
  margin-right: var(--margin-sub);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-min);
  > span:nth-child(2) {
    margin: 0 var(--margin-min);
  }
`;

const LocationSub = styled.div`
  color: var(--font-h3);
  font-size: 12px;
  margin: 2px 0;
  margin-left: 44px;
`;

const Secret = styled.div`
  display: flex;
  align-items: center;

  > span:first-child {
    margin-left: var(--margin-min);
    margin-right: var(--margin-md);
  }
`;

export default GroupStudyDetailInfo;
