import dayjs from "dayjs";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IPostThumbnailCard } from "../../../components2/molecules/cards/PostThumbnailCard";
import {
  CardColumnLayout,
  CardColumnLayoutSkeleton,
} from "../../../components2/organisms/CardColumnLayout";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { getMyStudy } from "../../../libs/study/getMyStudy";
import { getStudyConfimCondition } from "../../../libs/study/getStudyConfimCondition";
import { sortStudyVoteData } from "../../../libs/study/sortStudyVoteData";
import {
  myStudyState,
  sortedStudyCardListState,
  studyDateStatusState,
} from "../../../recoils/studyRecoils";
import { ITextAndColorType } from "../../../types2/propTypes";
import { LocationEn } from "../../../types2/serviceTypes/locationTypes";
import {
  IParticipation,
  StudyStatus,
} from "../../../types2/studyTypes/studyVoteTypes";
import { convertLocationLangTo } from "../../../utils/convertUtils/convertDatas";
import { dayjsToStr } from "../../../utils/dateTimeUtils";

export default function HomeStudySection() {
  const { data } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const date = searchParams.get("date");
  const location = convertLocationLangTo(
    searchParams.get("location") as LocationEn,
    "kr"
  );

  const setSortedStudyCardList = useSetRecoilState(sortedStudyCardListState);
  const setMyStudy = useSetRecoilState(myStudyState);
  const studyDateStatus = useRecoilValue(studyDateStatusState);
  const [studyCardColData, setStudyCardColData] =
    useState<IPostThumbnailCard[]>();

  const { data: studyVoteData } = useStudyVoteQuery(date as string, location, {
    enabled: !!date && !!location,
  });

  useEffect(() => {
    if (!studyVoteData || !studyVoteData.length || !data?.user) return;
    const sortedData = sortStudyVoteData(
      studyVoteData,
      studyDateStatus !== "not passed"
    );

    const cardList = setStudyDataToCardCol(sortedData, date as string);
    setStudyCardColData(cardList.slice(0, 3));
    setSortedStudyCardList(cardList);
    setMyStudy(getMyStudy(studyVoteData, data.user.uid));

    if (getStudyConfimCondition(studyDateStatus, studyVoteData[0].status)) {
      //patch
    }
  }, [studyDateStatus, studyVoteData]);

  const onDragEnd = (panInfo: PanInfo) => {
    const newDate = getNewDateBySwipe(panInfo, date as string);
    newSearchParams.set("date", newDate);
    router.replace(`/?${newSearchParams.toString()}`);
    return;
  };

  return (
    <AnimatePresence initial={false}>
      <MotionDiv
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(_, panInfo) => onDragEnd(panInfo)}
      >
        {studyCardColData ? (
          <CardColumnLayout
            cardDataArr={studyCardColData}
            url={`/studyList/?${newSearchParams.toString()}`}
          />
        ) : (
          <CardColumnLayoutSkeleton />
        )}
      </MotionDiv>
    </AnimatePresence>
  );
}

export const setStudyDataToCardCol = (
  studyData: IParticipation[],
  urlDateParam: string
): IPostThumbnailCard[] => {
  const privateStudy = studyData.find((par) => par.place.brand === "자유 신청");
  const filteredData = studyData.filter(
    (par) => par.place.brand !== "자유 신청"
  );

  if (privateStudy) filteredData.splice(2, 0, privateStudy);

  const cardColData: IPostThumbnailCard[] = filteredData.map((data) => ({
    title: data.place.branch,
    subtitle: data.place.brand,
    participants: data.attendences.map((att) => att.user),
    url: `/study/${data.place._id}/${urlDateParam}`,
    image: {
      url: data.place.image,
      priority: true,
    },
    badge: getBadgeText(data.status),
  }));
  return cardColData;
};

const getBadgeText = (status: StudyStatus): ITextAndColorType => {
  switch (status) {
    case "open":
      return { text: "open", colorType: "green" };
    case "dismissed":
      return { text: "closed", colorType: "gray" };
    case "free":
      return { text: "free", colorType: "purple" };
    case "pending":
      return { text: "+2 POINT", colorType: "mint" };
  }
};

export const getNewDateBySwipe = (panInfo: PanInfo, date: string) => {
  const { offset, velocity } = panInfo;
  const swipe = swipePower(offset.x, velocity.x);
  let dateDayjs = dayjs(date);
  if (swipe < -swipeConfidenceThreshold) {
    dateDayjs = dateDayjs.add(1, "day");
  } else if (swipe > swipeConfidenceThreshold) {
    dateDayjs = dateDayjs.subtract(1, "day");
  }
  return dayjsToStr(dateDayjs);
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const MotionDiv = styled(motion.div)`
  padding: 16px;
`;
