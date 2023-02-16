import {
  AspectRatio,
  Container,
  HStack,
  Select,
  VStack,
  Image,
  Text,
  useToast,
  Button,
} from "@chakra-ui/react";
import { FC, MouseEvent, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { MAX_USER_PER_PLACE } from "../../constants/system";
import { IPlace } from "../../models/place";
import { selectPlacesState } from "../../recoil/atoms";

interface IPlaceSelecter {
  placeInfo: { placeName: IPlace; voteCnt: number; status: string }[];
  selectedPlace?: IPlace;
  setSelectedPlace: (place: IPlace) => void;
  isSelectUnit?: boolean;
}

const PlaceSelectorLayout = styled.div`
  display: flex;
  justify-content: space-around;
`;
const PlaceItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const PlaceIcon = styled.button<{ borderColor: string; borderColor2: string }>`
  width: 60px;
  height: 60px;
  margin: 5px 0;
  border-radius: 25%;
  border: 3px solid black;
  border-color: ${(props) =>
    props.borderColor === "brown" ? props.borderColor : props.borderColor2};
  overflow: hidden;
`;

const PlaceSelector = ({
  placeInfo,
  selectedPlace,
  setSelectedPlace,
  isSelectUnit,
}: IPlaceSelecter) => {
  const toast = useToast();
  const [isUnit, setIsUnit] = useState(true);
  const [selectPlaces, setSelectPlaces] = useRecoilState(selectPlacesState);

  useEffect(() => setIsUnit(isSelectUnit), [isSelectUnit]);

  const placeIconBorderColor = (place: IPlace) => {
    if (selectedPlace?._id == place._id) {
      return "brown";
    }
    const placeInfos = placeInfo.find((pv) => pv.placeName._id == place._id);
    if (
      placeInfos.voteCnt >= MAX_USER_PER_PLACE ||
      placeInfos.status !== "pending"
    ) {
      return "red.400";
    }
    return "";
  };

  const placeDisabled = (place: IPlace) => {
    if (selectedPlace?._id == place._id) {
      return true;
    }
  };

  const PlaceIconBorderColor2 = (place: IPlace) => {
    if (selectPlaces.find((item) => item == place)) {
      return "orange";
    }
  };

  const showForbiddenMessage = () => {
    toast({
      title: "신청 불가",
      description: `해당 장소는 투표 기간이 지났어요.`,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  const handlePlaceIconClick = (place: IPlace, isUnit: boolean) => {
    const vote = placeInfo.find((pv) => pv.placeName._id == place._id);

    if (selectPlaces.find((item) => item == vote.placeName)) {
      const temp = selectPlaces.filter((item) => item !== vote.placeName);
      setSelectPlaces(temp);
      return;
    }

    if (vote.voteCnt < MAX_USER_PER_PLACE) {
      if (isUnit) setSelectedPlace(vote.placeName);
      else {
        setSelectPlaces((item) => [...item, vote.placeName]);
      }
    } else {
      toast({
        title: "정원초과",
        description: `장소당 최대 ${MAX_USER_PER_PLACE}명까지 신청할 수 있어요.`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <PlaceSelectorLayout>
      {placeInfo.map((placeVoteInfo, idx) => (
        <PlaceItem key={idx}>
          <PlaceIcon
            onClick={() =>
              handlePlaceIconClick(placeVoteInfo.placeName, isUnit)
            }
            borderColor={placeIconBorderColor(placeVoteInfo.placeName)}
            borderColor2={PlaceIconBorderColor2(placeVoteInfo.placeName)}
            disabled={placeDisabled(placeVoteInfo.placeName)}
          >
            <img
              src={placeVoteInfo.placeName.image}
              alt={placeVoteInfo.placeName.fullname}
            />
          </PlaceIcon>
          <span>{placeVoteInfo.placeName.branch}</span>
        </PlaceItem>
      ))}
    </PlaceSelectorLayout>
  );
};

export default PlaceSelector;