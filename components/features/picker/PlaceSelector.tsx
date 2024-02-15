import { Fragment, SetStateAction } from "react";
import styled from "styled-components";
import { MAX_USER_PER_PLACE } from "../../../constants/settingValue/study/study";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import { IStudyVotePlaces } from "../../../modals/study/studyVoteMainModal/StudyVoteMainModal";
import { IStudyPlaces } from "../../../types/study/study";
import { IPlace } from "../../../types/study/studyDetail";

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

  const layoutMethod = "manyGrid";

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
    const subPlace = [...votePlaces.subPlace];
    const isPlaceInSubPlace = subPlace.some((sub) => sub._id === place._id);

    setVotePlaces((old) => ({
      ...old,
      subPlace: isPlaceInSubPlace
        ? subPlace.filter((sub) => sub._id !== place._id)
        : [...subPlace, place],
    }));
  };

  if (!places) return null;

  return (
    <>
      <Layout layoutMethod={layoutMethod}>
        {places?.map((place) => {
          const placeInfo = place?.place || place;
          let selected: Selected = "none";
          if (placeInfo._id === votePlaces?.place?._id) selected = "main";

          if (
            !isMain &&
            votePlaces.subPlace.some(
              (subPlace) => subPlace._id === placeInfo._id
            )
          ) {
            selected = "sub";
          }
          const isMax = isMain && place.voteCnt >= MAX_USER_PER_PLACE;

          return (
            <Fragment key={placeInfo._id}>
              {false ? (
                <Item
                  selected={selected}
                  onClick={() => onClickItem(placeInfo, isMax)}
                  isMax={isMax}
                >
                  <PlaceIcon>
                    <studyLogo place={placeInfo} isBig={false} />
                  </PlaceIcon>
                  <Name>{placeInfo.branch}</Name>
                </Item>
              ) : (
                <FlexItem>
                  <FlexPlaceIcon
                    selected={selected}
                    onClick={() => onClickItem(placeInfo)}
                  >
                    <studyLogo place={placeInfo} isBig={true} />
                  </FlexPlaceIcon>
                  <FlexName>{placeInfo.branch}</FlexName>
                </FlexItem>
              )}
            </Fragment>
          );
        })}
      </Layout>
    </>
  );
}

const Layout = styled.div<{ layoutMethod: string }>`
  margin-top: var(--gap-1);
  display: ${(props) => (props.layoutMethod === "flex" ? "flex" : "grid")};
  grid-template-columns: ${(props) =>
    props.layoutMethod === "smallGrid" ? "repeat(2, 1fr)" : "repeat(4,1fr)"};
  gap: var(--gap-2);
`;

const Item = styled.button<{ selected: Selected; isMax: boolean }>`
  display: flex;
  height: 54px;
  align-items: center;
  border: ${(props) =>
    props.selected === "none"
      ? "var(--border)"
      : props.selected === "main"
      ? "2px solid var(--color-mint)"
      : "2px solid var(--color-orange)"};
  padding: var(--gap-1);
  border-radius: var(--rounded-lg);
  background-color: ${(props) => props.isMax && "var(--gray-7)"};
`;

const PlaceIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
`;
const Name = styled.span`
  margin-left: var(--gap-1);
  font-size: 14px;
  font-weight: 600;
`;

const FlexItem = styled.div`
  width: 88%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: var(--rounded-lg);

  white-space: nowrap;
`;

const FlexPlaceIcon = styled.div<{ selected: Selected }>`
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--rounded-lg);
  border: ${(props) =>
    props.selected === "none"
      ? "var(--border)"
      : props.selected === "main"
      ? "4px solid var(--color-mint)"
      : "4px solid var(--color-orange)"};
`;

const FlexName = styled.span`
  margin-top: var(--gap-1);
  font-size: 12px;
`;

export default PlaceSelector;
