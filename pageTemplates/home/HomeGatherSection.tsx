import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import { IPostThumbnailCard } from "../../components2/molecules/cards/PostThumbnailCard";
import {
  CardColumnLayout,
  CardColumnLayoutSkeleton,
} from "../../components2/organisms/CardColumnLayout";
import { useGatherQuery } from "../../hooks/gather/queries";
import { GatherStatus, IGather } from "../../types2/gatherTypes/gatherTypes";
import { ITextAndColorType } from "../../types2/propTypes";
import { getRandomImage } from "../../utils/imageUtils";

export default function HomeGatherSection() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  const [cardDataArr, setCardDataArr] = useState<IPostThumbnailCard[]>([]);

  const { data: gathers } = useGatherQuery();

  useEffect(() => {
    if (!gathers) return;
    setCardDataArr(setGatherDataToCardCol(gathers).slice(0, 3));
  }, [gathers]);

  return (
    <>
      <SectionBar title="ABOUT 모임" />
      <Layout>
        {cardDataArr ? (
          <CardColumnLayout
            cardDataArr={cardDataArr}
            url={`/gather?location=${location}`}
          />
        ) : (
          <CardColumnLayoutSkeleton />
        )}
      </Layout>
    </>
  );
}

export const setGatherDataToCardCol = (
  gathers: IGather[]
): IPostThumbnailCard[] => {
  const cardCol = gathers.map((gather) => ({
    title: gather.title,
    subtitle:
      gather.place +
      " · " +
      gather.type.title +
      " · " +
      dayjs(gather.date).format("M월 D일(ddd)"),
    participants: [...gather.participants.map((par) => par.user), gather.user],
    url: "/",
    image: {
      url: gather.image || getRandomImage("gather"),
      priority: true,
    },
    badge: getGatherBadge(gather.status),
  }));

  return cardCol;
};

const getGatherBadge = (gatherStatus: GatherStatus): ITextAndColorType => {
  switch (gatherStatus) {
    case "open":
      return { text: "오픈", colorType: "green" };
    case "close":
      return { text: "취소", colorType: "gray" };
    case "pending":
      return { text: "모집중", colorType: "red" };
    case "end":
      return { text: "open", colorType: "mint" };
  }
};

const Layout = styled.div`
  padding: 16px;
`;
