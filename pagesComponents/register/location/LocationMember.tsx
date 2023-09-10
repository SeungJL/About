import { faCaretUp, faUsers } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Location } from "../../../types/system";

function LocationMember({ location }: { location: Location }) {
  const memberCnt =
    location === "수원"
      ? 181
      : location === "양천"
      ? 66
      : location === "안양"
      ? 29
      : location === "강남"
      ? 34
      : 11;

  const newCnt =
    location === "수원"
      ? 4
      : location === "양천"
      ? 3
      : location === "강남"
      ? 4
      : location === "안양"
      ? 2
      : 7;

  return (
    <Layout>
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
