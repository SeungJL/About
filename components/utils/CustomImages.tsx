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
}
export const StudySpaceLogo = ({
  place,
  isBig,
  isImagePriority,
}: IStudySpaceLogo) => {
  let W = 40;

  const id = place._id;
  const name = PLACE_TO_NAME[id];
  if (id === GANGNAM_선릉) {
    W = 40;
  } else if (id === GANGNAM_신논현) W = 40;
  else {
    if (name === "이디야") W = 50;
    if (name === "칸나") W = 45;
    if (name === "이디야") W = 55;
    if (name === "투썸플레이스") W = 43;
    if (name === "커피빈") W = 50;
    if (name === "미오커피") W = 35;
    if (name === "아펜즈커피") W = 50;
    if (name === "위카페") W = 50;
    if (name === "카페베네") W = 44;
    if (name === "할리스") W = 45;
    if (name === "스타벅스") W = 45;
    if (name === "파스쿠찌") W = 45;
    if (name === "인뎃커피") W = 50;
    if (name === "커피인더스트리") W = 43;
    if (name === "아펜즈커피") W = 50;
    if (name === "자유신청") W = 44;
  }
  return (
    <Image
      src={`${place.image}`}
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
