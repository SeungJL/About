import { MutableRefObject, useEffect, useRef } from "react";
import { STUDY_VOTE_ICON } from "../../../constants/settingValue/study";
import { createNaverMapDot } from "../../../helpers/utilHelpers";
import { DispatchType } from "../../../types/reactTypes";
import { IStudyParticipate } from "../../../types/study/study";
import { IParticipation, IPlace } from "../../../types/study/studyDetail";

interface IInitialSetting {
  mapRef: MutableRefObject<any>;
  markersRef: MutableRefObject<{ marker: any; place: IPlace }[]>;
  places: IParticipation[];

  setVoteInfo: DispatchType<IStudyParticipate>;
  setNaverMap: DispatchType<any>;
}

function InitialSetting({
  mapRef,
  places,
  setVoteInfo,
  setNaverMap,
  markersRef,
}: IInitialSetting) {
  const infoRef = useRef<naver.maps.InfoWindow>();

  //초기 세팅
  useEffect(() => {
    if (!mapRef.current) return;
    const maxBounds = new naver.maps.LatLngBounds(
      createNaverMapDot(37.22711, 126.955637),
      createNaverMapDot(37.357058, 127.142965)
    );
    const map = new naver.maps.Map(mapRef.current, {
      center: createNaverMapDot(37.278992, 127.025727),
      zoom: 13,
      minZoom: 12,
      maxBounds: maxBounds,
      mapTypeControl: false,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false,
    });
    //마커 세팅
    if (!places) return;
    places.forEach((par) => {
      const place = par.place;
      const icon = STUDY_VOTE_ICON["default"];

      const marker = new naver.maps.Marker({
        map: map,
        position: createNaverMapDot(place.latitude, place.longitude),
        title: place.brand,
        shape: { type: "rect", coords: [-5, -5, 30, 30] },
        icon: {
          content: icon,
          size: new naver.maps.Size(25, 25),
          anchor: new naver.maps.Point(12.5, 12.5),
        },
      });

      markersRef.current.push({ marker, place: par.place });

      naver.maps.Event.addListener(marker, "click", function () {
        setVoteInfo((old) => {
          if (!old?.place) {
            map.setCenter(createNaverMapDot(place.latitude, place.longitude));
            return { ...old, place: place };
          } else if (place._id === old.place._id) {
            return { ...old, place: null, subPlace: [] };
          } else if (
            old?.subPlace.map((place) => place._id).includes(place._id)
          ) {
            return {
              ...old,
              subPlace: old.subPlace.filter((item) => item._id !== place._id),
            };
          } else return { ...old, subPlace: [...old.subPlace, place] };
        });
      });
    });

    naver.maps.Event.addListener(map, "click", function () {
      if (!infoRef) return;
      if (infoRef.current?.getMap()) infoRef.current.close();
    });

    setNaverMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef, markersRef, places]);

  return null;
}

export default InitialSetting;
