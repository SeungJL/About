import { useEffect, useRef } from "react";
import styled from "styled-components";
import { IMapOptions, IMarkerOptions } from "../../types2/lib/naverMapTypes";
const NEXT_PUBLIC_NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
interface IVoteMap {
  mapOptions?: IMapOptions;
  markersOptions?: IMarkerOptions[];
  handleMarker?: (id: string) => void;
}

export default function VoteMap({
  mapOptions,
  markersOptions,
  handleMarker,
}: IVoteMap) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);
  const mapElementsRef = useRef({
    markers: [],
    polylines: [],
  });

  useEffect(() => {
    if (!mapRef?.current || typeof naver === "undefined") return;
    const map = new naver.maps.Map(mapRef.current, mapOptions);
    mapInstanceRef.current = map;
  }, []);

  useEffect(() => {
    if (!mapRef?.current || typeof naver === "undefined") return;
    const map = mapInstanceRef.current;

    //새로운 옵션 적용 전 초기화
    mapElementsRef.current.markers.forEach((marker) => marker.setMap(null));
    mapElementsRef.current.polylines.forEach((polyline) =>
      polyline.setMap(null)
    );
    mapElementsRef.current = { markers: [], polylines: [] };

    //새로운 옵션 적용
    markersOptions?.forEach((markerOptions) => {
      const marker = new naver.maps.Marker({
        map,
        ...markerOptions,
      });

      if (markerOptions.infoWindow) {
        const info = new naver.maps.InfoWindow(markerOptions.infoWindow);
        info.open(map, marker);
      }
      if (markerOptions.polyline) {
        const polyline = new naver.maps.Polyline({
          map,
          ...markerOptions.polyline,
        });
        mapElementsRef.current.polylines.push(polyline);
      }

      naver.maps.Event.addListener(marker, "click", () => {
        map.setCenter(markerOptions.position);
        if (handleMarker) {
          handleMarker(markerOptions.id);
        }
      });
      mapElementsRef.current.markers.push(marker);
    });
  }, [markersOptions]);

  return <Map ref={mapRef} id="map" />;
}

const Map = styled.div`
  width: 100%;
  height: 100%;
`;
