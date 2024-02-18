import { faLeft, faRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { MAX_USER_PER_PLACE } from "../../../constants/settingValue/study/study";
import { useToast } from "../../../hooks/custom/CustomToast";
import { IPlace } from "../../../types/study/studyDetail";
import { IParticipation } from "../../../types2/studyTypes/studyVoteTypes";
import { StudyLogo } from "../../utils/CustomImages";

interface IPlaceSelectorSub {
  places: IParticipation[];
  selectPlaces: IPlace[];
  setSelectPlaces: Dispatch<SetStateAction<IPlace[]>>;
}

function PlaceSelectorSub({
  places,
  selectPlaces,
  setSelectPlaces,
}: IPlaceSelectorSub) {
  const toast = useToast();
  const isTwoPage = places?.length > 8;

  const [pagePlaces, setPagePlaces] = useState<{
    first: IParticipation[];
    second: IParticipation[];
  }>();
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (!places) return;
    setPagePlaces({
      first: places.slice(0, 8),
      second: places.slice(8),
    });
  }, [isTwoPage, places]);

  const onClick = (par: IParticipation) => {
    if (par.attendences.length >= MAX_USER_PER_PLACE) {
      toast("error", "인원이 마감되었습니다.");
      return;
    }
    const place = par.place;
    setSelectPlaces((old) => {
      if (old.includes(place)) return old.filter((item) => item !== place);
      return [...old, place];
    });
  };

  const onClickArrow = (type: "left" | "right") => {
    if (type === "left") setIsFirst(true);
    if (type === "right") setIsFirst(false);
  };

  return (
    <Layout isTwoPage={isTwoPage}>
      {(isFirst ? pagePlaces?.first : pagePlaces?.second)?.map((par) => (
        <Item
          key={par.place._id}
          isSelected={selectPlaces.includes(par.place)}
          onClick={() => onClick(par)}
        >
          <Place>
            <StudyLogo place={par.place} isBig={true} />
          </Place>
          <Name>{par.place.branch}</Name>
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
  grid-template-rows: repeat(2, 1fr);

  gap: var(--gap-1);
  padding: ${(props) => (props.isTwoPage ? "0 var(--gap-4)" : null)};
`;

const Item = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: var(--rounded-lg);
  border: ${(props) =>
    props.isSelected ? "2px solid var(--color-mint)" : "var(--border)"};
`;

const Place = styled.div`
  border-radius: var(--rounded-lg);
  overflow: hidden;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: var(--gap-1);
`;

const Name = styled.span`
  font-size: 13px;
  white-space: nowrap;
`;

const LeftArrow = styled.div`
  padding: var(--gap-1);
  position: absolute;
  top: 42%;
`;
const RightArrow = styled.div`
  padding: var(--gap-1);
  position: absolute;
  top: 42%;
  right: -8px;
`;

export default PlaceSelectorSub;
