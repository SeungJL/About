import Image from "next/image";
import { SUWAN_카탈로그, SUWAN_투썸 } from "../../constants/study";
import { IPlace } from "../../types/studyDetails";

export const LogoAdjustmentImage = ({ place }: { place: IPlace }) => {
  let W = 70;
  let H = 70;
  if (place._id === SUWAN_카탈로그) {
    W = 85;
    H = 85;
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
