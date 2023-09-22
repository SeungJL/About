import { SetStateAction } from "react";
import styled from "styled-components";
import { MAX_USER_PER_PLACE } from "../../../constants/study";
import { useFailToast } from "../../../hooks/CustomToast";
import { IStudyVotePlaces } from "../../../modals/study/studyVoteMainModal/StudyVoteMainModal";

import { IPlace } from "../../../types/study/study";
import { IStudyPlaces } from "../../../types/study/studyUserAction";
import { StudySpaceLogo } from "../../utils/DesignAdjustment";

interface IPlaceSelector {
  places: IStudyVotePlaces[] | IPlace[];
  votePlaces: IStudyPlaces;
  setVotePlaces: React.Dispatch<SetStateAction<IStudyPlaces>>;
  isMain: boolean;
}

type Selected = "main" | "sub" | "none";

function PlaceSelector({
  places,
  votePlaces,
  setVotePlaces,
  isMain,
}: IPlaceSelector) {
  const failToast = useFailToast();

  const isGridLayout = places?.length > 4;

  const onClickItem = (place: IPlace, isMax?: boolean) => {
    if (isMax) {
      failToast(
        "free",
        "해당 장소는 인원이 모두 차서 2지망으로만 신청이 가능해요!"
      );
      return;
    }
    if (isMain) {
      setVotePlaces((old) => ({ ...old, place }));
      return;
    }
    let subPlace = [...votePlaces.subPlace];
    const findItem = subPlace.indexOf(place);
    if (findItem === -1) subPlace = [...subPlace, place];
    else subPlace.splice(findItem, 1);
    setVotePlaces((old) => ({ ...old, subPlace }));
  };

  return (
    <>
      <Layout isGridLayout={isGridLayout}>
        {places?.map((place) => {
          const placeInfo = place?.place || place;
          let selected: Selected = "none";
          if (placeInfo === votePlaces.place) selected = "main";
          if (votePlaces.subPlace.find((subPlace) => subPlace === placeInfo))
            selected = "sub";
          const isMax = isMain && place.voteCnt >= MAX_USER_PER_PLACE;
          return (
            <>
              {isGridLayout ? (
                <Item
                  selected={selected}
                  key={placeInfo._id}
                  onClick={() => onClickItem(placeInfo, isMax)}
                  isMax={isMax}
                >
                  <PlaceIcon>
                    <StudySpaceLogo place={placeInfo} isBig={false} />
                  </PlaceIcon>
                  <Name>{placeInfo.branch}</Name>
                </Item>
              ) : (
                <FlexItem key={placeInfo._id}>
                  <FlexPlaceIcon
                    selected={selected}
                    onClick={() => onClickItem(placeInfo)}
                  >
                    <StudySpaceLogo place={placeInfo} isBig={true} />
                  </FlexPlaceIcon>
                  <FlexName>{placeInfo.branch}</FlexName>
                </FlexItem>
              )}
            </>
          );
        })}
      </Layout>
    </>
  );
}

const Layout = styled.div<{ isGridLayout: boolean }>`
  margin-top: var(--margin-min);
  display: ${(props) => (props.isGridLayout ? "grid" : "flex")};
  grid-template-columns: repeat(2, 1fr);
  gap: var(--margin-md);
`;

const Item = styled.button<{ selected: Selected; isMax: boolean }>`
  display: flex;
  height: 54px;
  align-items: center;
  border: ${(props) =>
    props.selected === "none"
      ? "var(--border-main)"
      : props.selected === "main"
      ? "2px solid var(--color-mint)"
      : "2px solid var(--color-orange)"};
  padding: var(--padding-min);
  border-radius: var(--border-radius-sub);
  background-color: ${(props) => props.isMax && "var(--font-h7)"};
`;

const PlaceIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Name = styled.span`
  margin-left: var(--margin-min);
  font-size: 14px;
  font-weight: 600;
`;

const FlexItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: var(--border-radius-main);
`;

const FlexPlaceIcon = styled.div<{ selected: Selected }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-main);
  border: ${(props) =>
    props.selected === "none"
      ? "var(--border-main)"
      : props.selected === "main"
      ? "2px solid var(--color-mint)"
      : "2px solid var(--color-orange)"};
`;

const FlexName = styled.span`
  margin-top: var(--margin-min);
  font-size: 12px;
`;

export default PlaceSelector;
