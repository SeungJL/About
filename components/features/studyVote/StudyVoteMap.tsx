import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { STUDY_VOTE_ICON } from "../../../assets/icons/MapChoiceIcon";
import { ITwoButtonNavColProps } from "../../../components2/molecules/navs/TwoButtonNavCol";
import VoteMap from "../../../components2/organisms/VoteMap";
import { STUDY_DISTANCE } from "../../../constants2/serviceConstants/studyConstants/studyDistanceConstants";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import {
  getVoteLocationCenterDot,
  getVoteLocationMaxBound,
} from "../../../libs/study/getStudyVoteMap";
import { PLACE_TO_LOCATION } from "../../../storage/study";
import { IMapOptions, IMarkerOptions } from "../../../types2/lib/naverMapTypes";
import { ActiveLocation } from "../../../types2/serviceTypes/locationTypes";
import {
  IParticipation,
  IPlace,
  IStudyVote,
} from "../../../types2/studyTypes/studyVoteTypes";
import { convertLocationLangTo } from "../../../utils/convertUtils/convertDatas";
import { ModalLayout } from "../../modals/Modals";

export type ChoiceRank = "first" | "second" | "third";

export default function VotePage() {
  const router = useRouter();
  const { data } = useSession();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const date = searchParams.get("date");
  const location = convertLocationLangTo(
    searchParams.get("location") as ActiveLocation,
    "kr"
  );

  const [isTimePicker, setIsTimePicker] = useState(false);
  const [myVote, setMyVote] = useState<IStudyVote>();
  const [precision, setPrecision] = useState<0 | 1 | 2>(1);
  const [voteScore, setVoteScore] = useState(0);
  const [markersOptions, setMarkersOptions] = useState<IMarkerOptions[]>();
  const [subSecond, setSubSecond] = useState<string[]>();

  const { data: studyVoteData } = useStudyVoteQuery(date, location, {
    enabled: !!location && !!date,
  });

  //2지망 장소 추천 및 투표 점수 추가
  useEffect(() => {
    if (!studyVoteData || !data?.user?.uid) return;
    const place = myVote?.place;
    if (place) {
      const { sub1, sub2 } = getSecondRecommendations(
        studyVoteData,
        place,
        precision
      );
      setSubSecond(sub2);
      setMyVote((old) => ({
        ...old,
        subPlace: [...sub1, ...sub2],
      }));
      setVoteScore(
        (old) =>
          old + getPlaceVoteRankScore(place, studyVoteData, data.user.uid)
      );
    } else setMyVote((old) => ({ ...old, subPlace: [] }));
  }, [myVote?.place]);

  useEffect(() => {
    if (!studyVoteData) return;
    setMarkersOptions(getMarkersOptions(studyVoteData, myVote, subSecond));
  }, [studyVoteData, myVote]);

  const mapOptions = getMapOptions(location);

  const handlePlaceVote = (id: string) => {
    setMyVote((old) => setVotePlaceInfo(id, old));
  };
  //인원 없을떄 투표하면
  // 신청 장소 비례해서

  const onClick = () => {
    router.replace("/");
  };

  const twoButtonNavOptions: ITwoButtonNavColProps = {
    up: {
      text: "시간 선택",
      func: () => setIsTimePicker(true),
    },
    down: {
      func: () => router.replace("/", { scroll: false }),
    },
    size: "lg",
  };

  return (
    <>
      <ModalLayout>
        <Layout>
          <div className="flex justify-between font-semibold">
            <div className="">점수 계산 </div>
            <div className="">+11 POINT</div>
          </div>
          <MapLayout>
            <VoteMap
              mapOptions={mapOptions}
              markersOptions={markersOptions}
              handleMarker={handlePlaceVote}
            />
          </MapLayout>
          <div className="p-4">
            {/* <TwoButtonNavCol props={twoButtonNavOptions} /> */}
          </div>
        </Layout>
        {/* <BottomDrawer /> */}
      </ModalLayout>
    </>
  );
}
const Layout = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const MapLayout = styled.div`
  aspect-ratio: 1/1;
`;

export const getSecondRecommendations = (
  voteData: IParticipation[],
  placeId: string,
  precision: 0 | 1 | 2
): { sub1: string[]; sub2: string[] } => {
  let temp1: string[] = [];
  let temp2: string[] = [];
  if (precision !== 0) temp1 = [...getRecommendations(placeId, 1)];
  if (precision === 2) temp2 = [...getRecommendations(placeId, 2)];

  const newSubPlaces1: string[] = [];
  const newSubPlaces2: string[] = [];
  temp1.forEach((subPlace) => {
    if (voteData.some((par) => par.place._id === subPlace)) {
      newSubPlaces1.push(subPlace);
    }
  });
  temp2.forEach((subPlace) => {
    if (voteData.some((par) => par.place._id === subPlace)) {
      newSubPlaces2.push(subPlace);
    }
  });
  return { sub1: newSubPlaces1, sub2: newSubPlaces2 };
};

const getRecommendations = (
  placeId: string,
  targetDistance: number
): string[] => {
  let placesAtDistance = new Set<string>();
  const location = PLACE_TO_LOCATION[placeId];
  const targets = STUDY_DISTANCE[location][targetDistance];
  if (targets) {
    targets.forEach((pair) => {
      if (pair[0] === placeId) placesAtDistance.add(pair[1]);
      else if (pair[1] === placeId) placesAtDistance.add(pair[0]);
    });
  }
  return Array.from(placesAtDistance);
};

export const getPlaceVoteRankScore = (
  placeId: string,
  voteData: IParticipation[],
  uid: string
) => {
  const mainVoteAttCnt = voteData
    .find((par) => par.place._id === placeId)
    ?.attendences.filter((att) => att.user.uid !== uid).length;

  switch (mainVoteAttCnt) {
    case 0:
      return 2;
    case 1:
      return 4;
    case 2:
      return 6;
  }
  return 0;
};

export const getMapOptions = (
  location: ActiveLocation
): IMapOptions | undefined => {
  if (typeof naver === "undefined") return undefined;
  return {
    center: getVoteLocationCenterDot()[location],
    zoom: 13,
    minZoom: 12,
    maxBounds: getVoteLocationMaxBound()[location],
    mapTypeControl: false,
    scaleControl: false,
    logoControl: false,
    mapDataControl: false,
  };
};

export const getMarkersOptions = (
  studyVoteData?: IParticipation[],
  myVote?: IStudyVote,
  secondLine?: string[]
): IMarkerOptions[] | undefined => {
  if (typeof naver === "undefined" || !studyVoteData) return;

  const mainPlace = studyVoteData?.find(
    (par) => par.place._id === myVote?.place
  )?.place;

  return studyVoteData.map((par) => {
    const placeId = par.place._id;

    const iconType =
      placeId === myVote?.place
        ? "main"
        : myVote?.subPlace?.includes(placeId)
        ? "sub"
        : "default";
    const infoWindow = placeId === myVote?.place ? getInfoWindow(par) : null;
    const polyline =
      mainPlace && myVote?.subPlace?.includes(placeId)
        ? getPolyline(mainPlace, par.place, secondLine?.includes(placeId))
        : null;

    return {
      id: par.place._id,
      position: new naver.maps.LatLng(par.place.latitude, par.place.longitude),
      title: par.place.brand,
      shape: { type: "rect", coords: [-5, -5, 30, 30] },
      icon: {
        content: STUDY_VOTE_ICON[iconType],
        size: new naver.maps.Size(25, 25),
        anchor: new naver.maps.Point(12.5, 12.5),
      },
      infoWindow,
      polyline,
    };
  });
};

const getInfoWindow = (par: IParticipation) => {
  return {
    content: `<div style=" font-size:12px; padding:4px 6px"><span style="font-weight:600; color:#565B67;">${par.place.brand}</span><br/><span>현재 신청 인원:<span style="color:#00c2b3; font-weight:500;"> ${par.attendences.length}명</span></span></div>`,
    borderWidth: 1,
    disableAnchor: false,
    backgroundColor: "var(--font-h8)",
    borderColor: "var(--font-h3)",
    anchorSize: new naver.maps.Size(10, 10),
    anchorColor: "var(--font-h8)",
  };
};

const getPolyline = (
  mainPlace: IPlace,
  subPlace: IPlace,
  isSecondSub?: boolean
) => {
  const { latitude, longitude } = mainPlace;
  const { latitude: subLat, longitude: subLon } = subPlace;
  return {
    path: [
      new naver.maps.LatLng(latitude, longitude),
      new naver.maps.LatLng(subLat, subLon),
    ],
    strokeColor: isSecondSub ? "#f87171" : "var(--color-mint)",
    strokeOpacity: 0.5,
    strokeWeight: 3,
  };
};

export const setVotePlaceInfo = (
  id: string,
  voteInfo?: IStudyVote
): IStudyVote => {
  if (!voteInfo?.place) return { ...voteInfo, place: id };
  else if (voteInfo.place === id) {
    return { ...voteInfo, place: undefined, subPlace: undefined };
  } else if (voteInfo?.subPlace?.includes(id)) {
    return {
      ...voteInfo,
      subPlace: voteInfo.subPlace.filter((place) => place !== id),
    };
  } else
    return {
      ...voteInfo,
      subPlace: [...(voteInfo?.subPlace || []), id],
    };
};
