import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { MAX_USER_PER_PLACE } from "../../constants/study";

import {
  IplaceInfo,
  IPlaceSelecter,
  IPlaceStatus,
} from "../../types/statistics";
import { IPlace } from "../../types/studyDetails";

const PlaceSelector = ({
  placeInfoArr,
  firstPlace,
  secondPlaces,
  setSelectedPlace,
  isSelectUnit,
}: IPlaceSelecter) => {
  const choicedSpaces = isSelectUnit ? firstPlace : secondPlaces;
  const handlePlaceIconClicked = (place: IplaceInfo) => {
    const isExist = choicedSpaces.some(
      (space) => space.placeName === place.placeName
    );

    if (isExist) {
      setSelectedPlace((old) => {
        const temp = [...old];
        const New = temp.filter((space) => space.placeName !== place.placeName);
        return New;
      });
    } else {
      if (place.voteCnt >= MAX_USER_PER_PLACE) {
        maxToast();
        return;
      }
      if (isSelectUnit) setSelectedPlace([place]);
      else setSelectedPlace((old) => [...old, place]);
    }
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
    <Layout>
      {placeInfoArr?.map((info, idx) => {
        const isSelected = choicedSpaces?.some(
          (place) => place.placeName === info.placeName
        );

        const isFirstSelected =
          !isSelectUnit &&
          firstPlace.some((place) => place.placeName === info.placeName);

        const place = info?.placeName;
        return (
          <PlaceItem key={idx}>
            <PlaceIcon
              onClick={() => handlePlaceIconClicked(info)}
              isSelected={isSelected}
              disabled={isFirstSelected}
              firstSelected={isFirstSelected}
            >
              <Image
                src={`${place?.image}`}
                alt="studySpace"
                width={64}
                height={64}
                unoptimized={true}
              />
            </PlaceIcon>
            <span>{place?.branch}</span>
          </PlaceItem>
        );
      })}
    </Layout>
  );
};

export default PlaceSelector;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PlaceItem = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    text-align: center;
    font-size: 13px;
    color: var(--font-h1);
  }
`;
const PlaceIcon = styled.button<{
  isSelected: boolean;
  firstSelected: boolean;
}>`
  width: 65px;
  height: 65px;
  margin: 5px 0;
  border-radius: 25%;
  border: ${(props) =>
    props.firstSelected
      ? "2px solid var(--color-mint)"
      : props.isSelected
      ? "2px solid var(--color-red)"
      : "1px solid var(--font-h5)"};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
