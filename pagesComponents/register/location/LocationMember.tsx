import {
  faCaretUp,
  faUserClock,
  faUsers,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Location } from "../../../types/system";

function LocationMember({ location }: { location: Location }) {
  const memberCnt = location === "수원" ? 171 : location === "양천" ? 51 : 31;
  const newCnt = location === "수원" ? 4 : 2;

  return (
    <Layout>
      {location === "강남" ? (
        <Member>
          <MemberCnt>
            <FontAwesomeIcon icon={faUserClock} size="xs" />
            <span>36</span>
          </MemberCnt>
        </Member>
      ) : false ? null : (
        <Member>
          <MemberCnt>
            <FontAwesomeIcon icon={faUsers} size="xs" />
            <span>{memberCnt}</span>
          </MemberCnt>
          <NewMember>
            <FontAwesomeIcon icon={faCaretUp} />
            <span>{newCnt}</span>
          </NewMember>
        </Member>
      )}
    </Layout>
  );
}

const Layout = styled.div``;

const Member = styled.div`
  color: var(--font-h2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const MemberCnt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 15px;

  > span:last-child {
    margin-left: 4px;
  }
`;
const NewMember = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 13px;
  color: green;
  > span:last-child {
    margin-left: 4px;
  }
`;

export default LocationMember;
