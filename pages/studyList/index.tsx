import dayjs from "dayjs";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";
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
      <Header title={dayjsToFormat(dayjs(date), "M월 D일 스터디")} />
      <div className="px-4">
        {sortedStudyCardList?.map((card, idx) => (
          <div className="mt-3" key={idx}>
            <PostThumbnailCard postThumbnailCardProps={card} />
          </div>
        ))}
      </div>
    </>
  );
}
