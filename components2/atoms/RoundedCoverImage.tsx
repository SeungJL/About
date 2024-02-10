import Image from "next/image";
import "../../styles/customClass.css";
interface IRoundedCoverImage {
  imageUrl: string;
}
export default function RoundedCoverImage({ imageUrl }: IRoundedCoverImage) {
  return (
    <div className="relative w-full aspect-ratio-1-2 overflow-hidden rounded-b-xl ">
      <Image src={imageUrl} fill={true} alt="studySpace" priority={true} />
    </div>
  );
}
