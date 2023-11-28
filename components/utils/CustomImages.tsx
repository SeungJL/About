import Image from "next/image";
import {
  GANGNAM_선릉,
  GANGNAM_신논현,
  PLACE_TO_NAME,
} from "../../storage/study";
import { IPlace } from "../../types/study/studyDetail";

interface IStudySpaceLogo {
  place: IPlace;
  isBig: boolean;
  isImagePriority?: boolean;
  image?: string;
}
export const StudySpaceLogo = ({
  place,
  isBig,
  isImagePriority,
  image,
}: IStudySpaceLogo) => {
  let W = 35;

  const id = place._id;
  const name = PLACE_TO_NAME[id];
  if (id === GANGNAM_선릉) {
    W = 35;
  } else if (id === GANGNAM_신논현) W = 35;
  else {
    if (name === "이디야") W = 50;
    if (name === "카탈로그") W = 42;
    if (name === "칸나") W = 39;
    if (name === "이디야") W = 50;
    if (name === "투썸플레이스") W = 30;
    if (name === "커피빈") W = 38;
    if (name === "미오커피") W = 31;
    if (name === "아펜즈커피") W = 50;
    if (name === "위카페") W = 40;
    if (name === "숨맑은집") W = 40;
    if (name === "카페베네") W = 40;
    if (name === "할리스") W = 40;
    if (name === "스타벅스") W = 50;
    if (name === "파스쿠찌") W = 50;
    if (name === "인뎃커피") W = 45;
    if (name === "커피인더스트리") W = 43;
    if (name === "아펜즈커피") W = 40;
    if (name === "자유신청") W = 38;
    if (name === "시나본") W = 42;
    if (name === "코나빈스") W = 39;
    if (name === "레어 그루브") W = 37;
    if (name === "아티제") W = 50;
    if (name === "에이티씨") W = 50;
    if (name === "행궁동") W = 50;

    if (place.branch === "신풍역") {
      W = 38;
    }
  }

  if (image) {
    W *= 1.2;
  }
  return (
    <Image
      src={`${image || place.image}`}
      alt="studyLogoSm"
      width={isBig ? W * 1.8 : W}
      height={isBig ? W * 1.8 : W}
      priority={isImagePriority}
    />
  );
};
interface IStoreGift {
  imageSrc: string;
  giftId: number;
  isImagePriority?: boolean;
}

export const StoreGiftImage = ({
  imageSrc,
  giftId,
  isImagePriority,
}: IStoreGift) => {
  let W = 120;
  let H = 120;

  if (giftId === 8) {
    W = 90;
    H = 90;
  }
  if (giftId === 11) {
    W = 100;
    H = 100;
  }
  return (
    <Image
      src={imageSrc}
      alt="storeGiftImage"
      width={W}
      height={H}
      priority={isImagePriority}
    />
  );
};
