import { adjustCircleLogo } from "@/utils/imageUtils";
import Image from "next/image";

interface ICircleLogImage {
  logoName: string;
  imageUrl: string;
}
export default function CircleLogoImage({
  logoName,
  imageUrl,
}: ICircleLogImage) {
  const width = adjustCircleLogo(logoName);

  return (
    <div className="">
      <div className="relative w-20 h-20 bg-gray-100 rounded-full overflow-hidden">
        <Image src={imageUrl} fill={true} alt={logoName} />
      </div>
    </div>
  );
}
