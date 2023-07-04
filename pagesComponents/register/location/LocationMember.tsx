import {
  faCaretUp,
  faUserClock,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Location } from "../../../types/system";

function LocationMember({ location }: { location: Location }) {
  const memberCnt = location === "수원" ? 181 : 53;
  const newCnt = location === "수원" ? 5 : 3;

  return (
    <Layout>
      {location === "안양" ? (
        <Member>
          <MemberCnt>
            <FontAwesomeIcon icon={faUserClock} size="xs" />
            <span>24</span>
          </MemberCnt>
        </Member>
      ) : location === "강남" ? null : (
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
