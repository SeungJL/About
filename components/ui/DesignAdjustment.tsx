import Image from "next/image";
import { SUWAN_이디야, SUWAN_카탈로그 } from "../../storage/study";

import { IPlace } from "../../types/study/study";

export const LogoAdjustmentImage = ({ place }: { place: IPlace }) => {
  let W = 70;
  let H = 70;

  if (place._id === SUWAN_카탈로그) {
    W = 85;
    H = 85;
  }
  if (place._id === SUWAN_이디야) {
    W = 100;
    H = 100;
  }
  if (place.location === "안양") {
    W = 100;
    H = 100;
  }

  return (
    <>
      <Image
        src={`${place?.image}`}
        alt="about"
        width={W}
        height={H}
        unoptimized={true}
      />
    </>
  );
};

interface IStudySpaceLogo {
  place: IPlace;
  isBig: boolean;
}
export const StudySpaceLogo = ({ place, isBig }: IStudySpaceLogo) => {
  let W = 40;
  let H = 40;
  if (place._id === SUWAN_이디야) {
    W = 50;
    H = 50;
  }
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
export const LogoSmAdjustmentImage = ({ place }: { place: IPlace }) => {
  let W = 40;
  let H = 40;
  if (place?._id === SUWAN_이디야) {
    W = 50;
    H = 50;
  }
  return (
    <>
      <Image
        src={`${place?.image}`}
        alt="studyLogoSm"
        width={W}
        height={H}
        unoptimized={true}
      />
    </>
  );
};
