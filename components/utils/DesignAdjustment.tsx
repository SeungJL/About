import Image from "next/image";
import {
  GANGNAM_교대,
  GANGNAM_논현,
  GANGNAM_양재,
  SUWAN_이디야,
  YANG_이디야,
} from "../../storage/study";
import { IPlace } from "../../types/study/study";

interface IStudySpaceLogo {
  place: IPlace;
  isBig: boolean;
}
export const StudySpaceLogo = ({ place, isBig }: IStudySpaceLogo) => {
  let W = 40;
  let H = 40;
  if (place._id === SUWAN_이디야 || place._id === YANG_이디야) {
    W = 50;
    H = 50;
  }
  if (place._id === GANGNAM_논현) W = 50;
  if (place._id === GANGNAM_양재) W = 35;
  if (place._id === GANGNAM_교대) W = 50;
  return (
    <>
      <Image
        src={`${place.image}`}
        alt="studyLogoSm"
        width={isBig ? W * 1.6 : W}
        height={isBig ? W * 1.6 : W}
        unoptimized={true}
      />
    </>
  );
};
interface IStoreGift {
  imageSrc: string;
  giftId: number;
}

export const StoreGiftImage = ({ imageSrc, giftId }: IStoreGift) => {
  let W = 120;
  let H = 120;

  if (giftId === 8 || giftId === 10) {
    W = 110;
    H = 110;
  }
  if (giftId === 11) {
    W = 100;
    H = 100;
  }
  return (
    <>
      <Image
        src={imageSrc}
        alt="storeGiftImage"
        width={W}
        height={H}
        unoptimized={true}
      />
    </>
  );
};
