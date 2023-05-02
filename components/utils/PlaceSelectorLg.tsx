import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import styled from "styled-components";
import { MAX_USER_PER_PLACE } from "../../constants/study";

import { IplaceInfo, IPlaceSelecter } from "../../types/statistics";

function PlaceSelectorLg({
  placeInfoArr,
  firstPlace,
  secondPlaces,
  setSelectedPlace,
  isSelectUnit,
}: IPlaceSelecter) {
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
        console.log(info);
        return (
          <PlaceItem
            key={idx}
            isSelected={isSelected}
            disabled={isFirstSelected}
            firstSelected={isFirstSelected}
            onClick={() => handlePlaceIconClicked(info)}
          >
            <PlaceIcon>
              <Image
                src={`${place?.image}`}
                alt="studySpace"
                width={36}
                height={36}
                unoptimized={true}
              />
            </PlaceIcon>
            <span>{place?.branch}</span>
          </PlaceItem>
        );
      })}
    </Layout>
  );
}

const Layout = styled.div`
  margin-top: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
`;
const PlaceItem = styled.button<{
  isSelected: boolean;
  firstSelected: boolean;
}>`
  box-shadow: ${(props) =>
    props.isSelected || props.firstSelected
      ? "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.1)" // 추천하는 box shadow 스타일입니다.
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
`;
export default PlaceSelectorLg;
