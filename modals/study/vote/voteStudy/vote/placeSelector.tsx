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
import { MAX_USER_PER_PLACE } from "../../../../../constants/system";
import { IPlace } from "../../../../../models/place";
import { IPlaceStatus } from "../../../../../types/study";

const PlaceSelector = ({
  placeInfoArr,
  firstPlace,
  secondPlaces,
  setSelectedPlace,
  isSelectUnit,
}: IPlaceSelecter) => {
  const handlePlaceIconClicked = (place: IplaceInfo) => {
    if (place.voteCnt >= MAX_USER_PER_PLACE) {
      maxToast();
      return;
    }
    if (isSelectUnit) {
      setSelectedPlace(place);
      return;
    } else setSelectedPlace(place);
  };
  const maxToast = useToast({
    title: "정원초과",
    description: `장소당 최대 ${MAX_USER_PER_PLACE}명까지 신청할 수 있어요.`,
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });
  return (
    <PlaceSelectorLayout>
      {placeInfoArr?.map((info, idx) => {
        const isSelectedOne = firstPlace?.some((place) => place === info);
        const isSelectedTwo = secondPlaces?.some((place) => place === info);
        const place = info.placeName;
        return (
          <PlaceItem key={idx}>
            <PlaceIcon
              onClick={() => handlePlaceIconClicked(info)}
              borderColor={isSelectedOne ? "one" : isSelectedTwo ? "two" : null}
              disabled={isSelectedOne && true}
            >
              <img src={place.image} alt={place.fullname} />
            </PlaceIcon>
            <span>{place.branch}</span>
          </PlaceItem>
        );
      })}
    </PlaceSelectorLayout>
  );
};

export default PlaceSelector;

export interface IplaceInfo extends IPlaceStatus {
  placeName: IPlace;
  voteCnt: number;
}
interface IPlaceSelecter {
  placeInfoArr: IplaceInfo[];
  firstPlace?: IplaceInfo[];
  secondPlaces?: IplaceInfo[];
  setSelectedPlace: (place: IplaceInfo) => void;
  isSelectUnit: boolean;
}

const PlaceSelectorLayout = styled.div`
  display: flex;
  justify-content: space-around;
`;
const PlaceItem = styled.div`
  display: flex;
  flex-direction: column;
`;
const PlaceIcon = styled.button<{ borderColor?: string }>`
  width: 60px;
  height: 60px;
  margin: 5px 0;
  border-radius: 25%;
  border: 3px solid black;
  border-color: ${(props) =>
    props.borderColor === "one"
      ? "lightcoral"
      : props.borderColor === "two"
      ? "lightskyblue"
      : null};
  overflow: hidden;
`;
