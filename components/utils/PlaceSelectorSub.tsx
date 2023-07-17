import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IPlace } from "../../types/study/study";
import { StudySpaceLogo } from "../ui/DesignAdjustment";

interface IPlaceSelectorSub {
  places: IPlace[];
  selectPlaces: IPlace[];
  setSelectPlaces: Dispatch<SetStateAction<IPlace[]>>;
}

function PlaceSelectorSub({
  places,
  selectPlaces,
  setSelectPlaces,
}: IPlaceSelectorSub) {
  const onClick = (place: IPlace) => {
    setSelectPlaces((old) => {
      if (old.includes(place)) return old.filter((item) => item !== place);
      return [...old, place];
    });
  };

  return (
    <Layout>
      {places?.map((place) => (
        <Item key={place._id}>
          <Place
            isSelected={selectPlaces.includes(place)}
            onClick={() => onClick(place)}
          >
            <StudySpaceLogo place={place} isBig={true} />
          </Place>
          <Name>{place.branch}</Name>
        </Item>
      ))}
    </Layout>
  );
}

const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex: 1;
  margin-bottom: var(--margin-main);
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Place = styled.div<{ isSelected: boolean }>`
  border-radius: var(--border-radius-main);
  overflow: hidden;
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--margin-md);
  border: ${(props) =>
    props.isSelected ? "2px solid var(--color-mint)" : "var(--border-main)"};
`;

const Name = styled.span`
  font-size: 13px;
`;

export default PlaceSelectorSub;
