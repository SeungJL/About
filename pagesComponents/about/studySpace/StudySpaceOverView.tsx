import { faLocationDot } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import PlaceMap from "../../../components/features/lib/PlaceMap";
import { IStudySpaceInfo } from "../../../storage/study";
import { IPlace } from "../../../types/study/studyDetail";

interface IStudySpaceOverview {
  place: IPlace;
  info: IStudySpaceInfo;
}

function StudySpaceOverview({ place, info }: IStudySpaceOverview) {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Layout>
        <span>
          {place.brand} {place.branch}
        </span>
        <SpaceDetail>
          <Location>
            위치: <span>{info.location}</span>
            <div onClick={() => setIsModal(true)}>
              <FontAwesomeIcon icon={faLocationDot} size="sm" />
              <span>지도</span>
            </div>
          </Location>
          <Time>
            시간: <span>{info.time}</span>
          </Time>
        </SpaceDetail>
      </Layout>
      {isModal && (
        <MapWrapper>
          <MapBtn onClick={() => setIsModal(false)}>X</MapBtn>
          <PlaceMap lat={place.latitude} lon={place.longitude} />
        </MapWrapper>
      )}
    </>
  );
}

const Layout = styled.div`
  margin: 0 var(--margin-main);
  margin-top: 28px;
  margin-bottom: var(--padding-sub);
  > span:first-child {
    font-weight: 600;
    font-size: 18px;
  }
`;

const SpaceDetail = styled.div`
  color: var(--font-h2);
  font-size: 12px;
  font-weight: 600;
  margin-top: var(--margin-sub);
  display: flex;
  flex-direction: column;
  > span {
    > span {
      margin-left: var(--margin-min);
    }
  }
`;
const Location = styled.span`
  display: flex;
  > span {
    color: var(--font-h1);
    margin-right: var(--margin-sub);
  }
  > div {
    > span:last-child {
      margin-left: var(--margin-min);
    }
  }
`;
const Time = styled.span`
  color: var(--font-h1);
`;

const MapWrapper = styled.div`
  position: relative;
`;

const MapBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--font-h7);
  width: 40px;
  font-size: 18px;
  font-weight: 600;
  height: 40px;
  z-index: 100;
`;

export default StudySpaceOverview;
