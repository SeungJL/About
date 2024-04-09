import { faLeft, faRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import ImageTileGridLayout, {
  IImageTileData,
} from "../../../components/molecules/layouts/ImageTitleGridLayout";
import { MAX_USER_PER_PLACE } from "../../../constants/settingValue/study/study";
import { useToast } from "../../../hooks/custom/CustomToast";
import { IPlace } from "../../../types/study/studyDetail";
import { IParticipation } from "../../../types/studyTypes/studyVoteTypes";

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

  const imageDataArr: IImageTileData[] = (
    isFirst ? pagePlaces?.first : pagePlaces?.second
  )?.map((par) => ({
    imageUrl: par.place.image,
    text: par.place.brand,
    func: () => onClick(par),
    id: par.place._id,
  }));

  return (
    <Layout isTwoPage={isTwoPage}>
      {imageDataArr && (
        <ImageTileGridLayout
          imageDataArr={imageDataArr}
          grid={{ row: 2, col: 4 }}
          selectedId={selectPlaces.map((place) => place._id)}
        />
      )}

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
  padding: 12px 20px;
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
  padding: 8px;
  position: absolute;
  top: 38%;
  left: -8px;
`;
const RightArrow = styled.div`
  padding: 8px;
  position: absolute;
  top: 38%;
  right: -8px;
`;

export default PlaceSelectorSub;
