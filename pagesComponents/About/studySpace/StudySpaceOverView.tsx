import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { IPlace } from "../../../types/studyDetails";

function StudySpaceOverView({ space }: { space: IPlace }) {
  return (
    <Layout>
      <span>
        {space?.brand} {space?.branch}점
      </span>
      <SpaceDetail style={{ marginLeft: "1px" }}>
        <span>
          <span>위치: </span> 수원시 권선구 권광로 119 (임시)
        </span>
        <FontAwesomeIcon icon={faLocationDot} size="sm" />
        &nbsp;지도
      </SpaceDetail>
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 36px;
  padding-bottom: 24px;
  > span:first-child {
    font-weight: 600;
    font-size: 18px;
  }
  > div:first-child {
    margin-left: 20px;
    background-color: red;
  }
`;

const SpaceDetail = styled.div`
  color: var(--font-h2);
  font-size: 13px;
  font-weight: 600;
  padding-left: 6px;
  margin-top: 4px;

  > span {
    color: var(--font-h3);
    margin-right: 10px;
    > span {
      color: var(--font-h2);
    }
  }
`;

export default StudySpaceOverView;
