import { faLeft, faRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { IPlace } from "../../../types/study/studyDetail";
import { StudySpaceLogo } from "../../utils/CustomImages";

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
  const isTwoPage = places?.length > 8;

  const first = [];
  const second = [];

  const [pagePlaces, setPagePlaces] = useState<{
    first: IPlace[];
    second: IPlace[];
  }>();
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (!places) return;
    setPagePlaces({
      first: places.slice(0, 8),
      second: places.slice(8),
    });
  }, [isTwoPage, places]);

  const onClick = (place: IPlace) => {
    setSelectPlaces((old) => {
      if (old.includes(place)) return old.filter((item) => item !== place);
      return [...old, place];
    });
  };

  const onClickArrow = (type: "left" | "right") => {
    if (type === "left") {
      setIsFirst(true);
    }
    if (type === "right") {
      setIsFirst(false);
    }
  };

  return (
    <Layout isTwoPage={isTwoPage}>
      {(isFirst ? pagePlaces?.first : pagePlaces?.second)?.map((place) => (
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
      {!isFirst && (
        <LeftArrow onClick={() => onClickArrow("left")}>
          <FontAwesomeIcon icon={faLeft} />
        </LeftArrow>
      )}
      {isTwoPage && isFirst && (
        <RightArrow onClick={() => onClickArrow("right")}>
          <FontAwesomeIcon icon={faRight} />
        </RightArrow>
      )}
    </Layout>
  );
}

const Layout = styled.div<{ isTwoPage: boolean }>`
  position: relative;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: ${(props) =>
    props.isTwoPage ? "repeat(2,1fr)" : "repeat(4, 1fr)"};
  flex: 1;
  margin-bottom: var(--margin-main);
  gap: var(--margin-min);
  padding: ${(props) => (props.isTwoPage ? "0 var(--margin-sub)" : null)};
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
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--margin-min);
  border: ${(props) =>
    props.isSelected ? "2px solid var(--color-mint)" : "var(--border-main)"};
`;

const Name = styled.span`
  font-size: 13px;
  white-space: nowrap;
`;

const LeftArrow = styled.div`
  padding: var(--padding-min);
  position: absolute;
  top: 42%;
`;
const RightArrow = styled.div`
  padding: var(--padding-min);
  position: absolute;
  top: 42%;
  right: 0;
`;

export default PlaceSelectorSub;
