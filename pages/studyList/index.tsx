import { Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
import Slide from "../../components/layout/PageSlide";
import Header from "../../components2/Header";
import { PostThumbnailCard } from "../../components2/molecules/cards/PostThumbnailCard";
import { dayjsToFormat } from "../../helpers/dateHelpers";
import { sortedStudyCardListState } from "../../recoils/studyRecoils";

export default function StudyList() {
  const sortedStudyCardList = useRecoilValue(sortedStudyCardListState);
  const searchParams = useSearchParams();

  const date = searchParams.get("date");

  return (
    <>
      <Slide isFixed={true}>
        <Header title={dayjsToFormat(dayjs(date), "M월 D일 스터디")} />
      </Slide>
      <Slide>
        <Box px="16px">
          {sortedStudyCardList?.map((card, idx) => (
            <Box mt="12px" key={idx}>
              <PostThumbnailCard postThumbnailCardProps={card} />
            </Box>
          ))}
        </Box>
      </Slide>
    </>
  );
}
