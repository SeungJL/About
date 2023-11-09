import { faRotate } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";
import {} from "react-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { useStudyPlacesQuery } from "../../../hooks/study/queries";
import { locationState } from "../../../recoil/userAtoms";
import { IModal } from "../../../types/reactTypes";

function StudyVoteMap({ setIsModal }: IModal) {
  const mapRef = useRef<naver.maps.Map>(null);

  const location = useRecoilValue(locationState);

  const { data } = useStudyPlacesQuery(location);

  const locationPoints = data?.map((place) => ({
    lat: place?.latitude,
    lon: place?.longitude,
  }));

  useEffect(() => {
    if (!mapRef.current) return;
    const map = new naver.maps.Map(mapRef.current as naver.maps.Map, {
      center: new naver.maps.LatLng(37.2789488, 127.0429329),
      zoom: 13,
      minZoom: 12,
    });
  }, [mapRef]);

 

  const onClickCenter = () => {
    mapRef.current.setCenter;
  };

  return (
    <Layout>
      <Container>
        <Map id="map" ref={mapRef} />
        <ReturnBtn>
          <FontAwesomeIcon icon={faRotate} size="lg" />
        </ReturnBtn>
      </Container>
    </Layout>
  );
}
const Map = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = styled.div`
  position: fixed;
  z-index: 20;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  aspect-ratio: 1/1;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;


const ReturnBtn = styled.button`
  position: absolute;
  top: var(--margin-sub);
  left: var(--margin-sub);
`;

export default StudyVoteMap;
