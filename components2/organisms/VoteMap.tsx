import { IMapOptions, IMarkerOptions } from "@/types/lib/naverMapTypes";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (!mapRef?.current || typeof naver === "undefined") return;
    const map = new naver.maps.Map(mapRef.current, mapOptions);

    markersOptions?.forEach((markerOptions) => {
      const marker = new naver.maps.Marker({ map, ...markerOptions });

      if (markerOptions.infoWindow) {
        const info = new naver.maps.InfoWindow(markerOptions.infoWindow);
        info.open(map, marker);
      }
      if (markerOptions.polyline) {
        new naver.maps.Polyline({ map, ...markerOptions.polyline });
      }

      naver.maps.Event.addListener(marker, "click", () => {
        map.setCenter(markerOptions.position);
        if (handleMarker) {
          handleMarker(markerOptions.id);
        }
      });
    });
  }, [markersOptions]);

  return <div ref={mapRef} id="map" className="w-full aspect-square" />;
}
