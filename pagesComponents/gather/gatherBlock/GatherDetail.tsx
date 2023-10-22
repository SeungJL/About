import {
  faCalendarClock,
  faMapLocationDot,
  faUserCheck,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import styled from "styled-components";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { LocationFilterType } from "../../../types/system";

dayjs.locale("ko");

interface IGatherDetail {
  age: number[];
  date: string;
  location: LocationFilterType;
}

function GatherDetail({ age, date, location }: IGatherDetail) {
  return (
    <Layout>
      <Item>
        <FontAwesomeIcon icon={faMapLocationDot} />
        <span>
          {location} {location === "전체" && "지역"}
        </span>
      </Item>
      <Item>
        <FontAwesomeIcon icon={faUserCheck} />
        <span>
          {age[0]} ~ {age[1]}세
        </span>
      </Item>
      <Item>
        <FontAwesomeIcon icon={faCalendarClock} />
        <span>
          {date === "미정"
            ? date
            : dayjsToFormat(dayjs(date), "M.D(ddd) 오후 h:mm")}
        </span>
      </Item>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 2;
  color: var(--font-h2);

  > div:nth-child(2) {
    > span {
      margin-left: 6px;
    }
  }
`;

const Item = styled.div`
  > span {
    margin-left: var(--margin-md);
  }
`;

export default GatherDetail;
