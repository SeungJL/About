import { useToast } from "@chakra-ui/react";
import styled from "styled-components";
import { MAX_USER_PER_PLACE } from "../../constants/study";

import { IplaceInfo, IPlaceSelecter } from "../../types/statistics";
import { LogoSmAdjustmentImage } from "../ui/DesignAdjustment";

function PlaceSelectorLg({
  placeInfoArr,
  firstPlace,
  secondPlaces,
  setSelectedPlace,
  isSelectUnit,
}: IPlaceSelecter) {
  const toast = useToast();
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
      if (isSelectUnit && place.voteCnt >= MAX_USER_PER_PLACE) {
        toast({
          title: "정원초과",
          description: `해당 장소는 정원이 모두 차서 2지망으로만 투표가 가능해요! 다른 장소로 선택해주세요!`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
      if (isSelectUnit) setSelectedPlace([place]);
      else setSelectedPlace((old) => [...old, place]);
    }
  };

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
          <PlaceItem
            key={idx}
            isSelected={isSelected}
            disabled={isFirstSelected}
            firstSelected={isFirstSelected}
            onClick={() => handlePlaceIconClicked(info)}
            isMax={info?.voteCnt >= MAX_USER_PER_PLACE}
            isFirst={isSelectUnit}
          >
            <PlaceIcon>
              <LogoSmAdjustmentImage place={place} />
            </PlaceIcon>
            <span>{place?.branch}</span>
          </PlaceItem>
        );
      })}
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;
const PlaceItem = styled.button<{
  isSelected: boolean;
  firstSelected: boolean;
  isMax: boolean;
  isFirst: boolean;
}>`
  background-color: ${(props) =>
    props.isMax && props.isFirst ? "var(--font-h5)" : "white"};

  box-shadow: ${(props) =>
    props.isSelected || props.firstSelected
      ? "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)"
      : "none"};
  display: flex;
  align-items: center;
  border: 1px solid var(--font-h4);
  padding: 0 6px;
  border: ${(props) =>
    props.firstSelected
      ? "2px solid var(--color-red)"
      : props.isSelected
      ? "2px solid var(--color-mint)"
      : "1px solid var(--font-h4)"};

  border-radius: var(--border-radius);
  > span {
    text-align: center;
    font-size: 14px;
    color: var(--font-h1);
  }
`;
const PlaceIcon = styled.div`
  margin: 5px 0;
  margin-right: 14px;
  border-radius: 25%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;
  overflow: hidden;
`;
export default PlaceSelectorLg;
