import Image from "next/image";
import { SUWAN_이디야, YANG_이디야 } from "../../storage/study";
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
