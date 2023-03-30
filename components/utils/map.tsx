import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const Map = ({
  lat = 37.2845789,
  lang = 127.0443293,
}: {
  lat?: number;
  lang?: number;
}) => {
  const mapRef = useRef();
  useEffect(() => {
    const location = new naver.maps.LatLng(lat, lang);
    const option = {
      center: new naver.maps.LatLng(lat, lang),
      scaleControl: false,
      mapDataControl: false,
      zoom: 14,
    };
    const container = document.getElementById("map");
    const map = new naver.maps.Map(container, option);

    const markers = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lang),
      map,
      icon: {
        url: "/locationDot.svg",
        size: new naver.maps.Size(100, 100),
        scaledSize: new naver.maps.Size(34, 36),
      },
    });
    markers.setMap(map);
  }, [lat, lang]);

  return (
    <div id="map" ref={mapRef} style={{ width: "400px", height: "400px" }} />
  );
};

export default Map;
