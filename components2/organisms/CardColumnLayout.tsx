import ShadowBlockButton from "../atoms/buttons/ShadowBlockButton";
import {
  IPostThumbnailCard,
  PostThumbnailCard,
  PostThumbnailCardSkeleton,
} from "../molecules/cards/PostThumbnailCard";

interface ICardColumnLayout {
  cardDataArr: IPostThumbnailCard[];
  url: string;
}
export function CardColumnLayout({ cardDataArr, url }: ICardColumnLayout) {
  return (
    <div className="flex flex-col p-4">
      {cardDataArr.map((cardData, idx) => (
        <div key={idx} className="mb-3">
          <PostThumbnailCard postThumbnailCardProps={cardData} />
        </div>
      ))}
      <ShadowBlockButton text="더보기" url={url} />
    </div>
  );
}

export function CardColumnLayoutSkeleton() {
  return (
    <div className="flex flex-col p-4">
      {[1, 2, 3].map((item) => (
        <div key={item} className="mb-3">
          <PostThumbnailCardSkeleton />
        </div>
      ))}
      <ShadowBlockButton text="더보기" />
    </div>
  );
}
