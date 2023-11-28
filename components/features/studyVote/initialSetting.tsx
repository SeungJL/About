import { MutableRefObject, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { STUDY_VOTE_ICON } from "../../../constants/settingValue/study/study";
import { createNaverMapDot } from "../../../helpers/utilHelpers";
import { locationState } from "../../../recoil/userAtoms";
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
  const location = useRecoilValue(locationState);
  const infoRef = useRef<naver.maps.InfoWindow>();

  //초기 세팅
  useEffect(() => {
    const LOCATION_CENTER = {
      수원: createNaverMapDot(37.278992, 127.025727),
      안양: createNaverMapDot(37.388896, 126.950088),
      양천: createNaverMapDot(37.527588, 126.896441),
      강남: createNaverMapDot(37.503744, 127.048898),
    };
    const createBound = (
      lat1: number,
      lng1: number,
      lat2: number,
      lng2: number
    ) =>
      new naver.maps.LatLngBounds(
        createNaverMapDot(lat1, lng1),
        createNaverMapDot(lat2, lng2)
      );

    const MAX_BOUNDS = {
      수원: createBound(37.22711, 126.955637, 37.357058, 127.142965),
      안양: createBound(37.451075, 126.888074, 37.363247, 126.984474),
      양천: createBound(37.553289, 126.819398, 37.482753, 126.941598),
      강남: createBound(37.532565, 126.991213, 37.468873, 127.107285),
    };
    if (!mapRef.current) return;

    const map = new naver.maps.Map(mapRef.current, {
      center: LOCATION_CENTER[location],
      zoom: 13,
      minZoom: 12,
      maxBounds: MAX_BOUNDS[location],
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
