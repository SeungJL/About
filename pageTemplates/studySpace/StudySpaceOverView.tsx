import { Button } from "@chakra-ui/react";
import { faClock, faLocationDot, faX } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import PlaceMap from "../../../components/features/location/PlaceMap";
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
          <DetailItem>
            <div>
              <IconWrapper>
                <FontAwesomeIcon icon={faLocationDot} size="lg" />
              </IconWrapper>
              <span>{info.location}</span>
            </div>
            <Button
              size="xs"
              colorScheme="mintTheme"
              leftIcon={<FontAwesomeIcon icon={faLocationDot} />}
              onClick={() => setIsModal(true)}
            >
              지도보기
            </Button>
          </DetailItem>
          <DetailItem>
            <div>
              <IconWrapper>
                <FontAwesomeIcon icon={faClock} />
              </IconWrapper>
              <span>{info.time}</span>
            </div>
          </DetailItem>
        </SpaceDetail>
      </Layout>
      <HrDiv />
      {isModal && (
        <MapWrapper>
          <MapBtn onClick={() => setIsModal(false)}>
            <FontAwesomeIcon icon={faX} />
          </MapBtn>
          <PlaceMap lat={place.latitude} lon={place.longitude} />
        </MapWrapper>
      )}
    </>
  );
}

const Layout = styled.div`
  padding: 0 var(--margin-main);
  padding-top: 20px;
  padding-bottom: var(--padding-sub);
  background-color: white;
  > span:first-child {
    font-weight: 700;
    font-size: 20px;
  }
`;

const SpaceDetail = styled.div`
  color: var(--font-h1);
  margin-top: var(--margin-main);
  display: flex;
  flex-direction: column;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--font-h1);
  margin-bottom: var(--margin-md);
  font-size: 13px;
  > div {
    display: flex;
  }
`;
const Time = styled.span``;

const IconWrapper = styled.div`
  color: var(--font-h3);
  width: 14px;
  margin-right: var(--margin-md);
`;

const Map = styled.div`
  display: flex;
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
const HrDiv = styled.div`
  height: 6px;
  background-color: var(--font-h56);
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.04) inset;
`;

export default StudySpaceOverview;
