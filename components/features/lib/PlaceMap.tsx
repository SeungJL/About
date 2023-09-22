import { useEffect, useRef, useState } from "react";
import { useFailToast } from "../../../hooks/CustomToast";

interface ISpaceMap {
  lat?: number;
  lon?: number;
}

function PlaceMap({ lat, lon }: ISpaceMap) {
  const mapRef = useRef();
  const failToast = useFailToast();

  const [myLat, setMyLat] = useState(null);
  const [myLon, setMyLon] = useState(null);

  useEffect(() => {
    const option = {
      center: new naver.maps.LatLng(lat, lon),
      scaleControl: false,
      mapDataControl: false,
      zoom: 14,
    };
    const container = document.getElementById("map");
    const map = new naver.maps.Map(container, option);

    const markers = new naver.maps.Marker({
      position: new naver.maps.LatLng(lat, lon),
      map,
      icon: {
        url: "/map/locationDot.svg",
        size: new naver.maps.Size(40, 40),
        scaledSize: new naver.maps.Size(40, 40),
        anchor: new naver.maps.Point(15, 30),
      },
    });
    const additionalMarker =
      myLat !== null &&
      myLon !== null &&
      new naver.maps.Marker({
        position: new naver.maps.LatLng(myLat, myLon),
        map,
        icon: {
          url: "/map/markerMine.svg",
          size: new naver.maps.Size(40, 40),
          scaledSize: new naver.maps.Size(40, 40),
          anchor: new naver.maps.Point(15, 30),
        },
      });
    markers.setMap(map);
    additionalMarker && additionalMarker.setMap(map);
  }, [lat, lon, myLat, myLon]);

  useEffect(() => {
    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setMyLat(latitude);
      setMyLon(longitude);
    };

    const onError = (error) => {
      failToast("free", "오류가 발생했어요! 관리자에게 문의해주세요!");
    };

    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    else console.error("Geolocation is not supported by this browser.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="map" ref={mapRef} style={{ width: "100%", height: "360px" }} />
  );
}

export default PlaceMap;
