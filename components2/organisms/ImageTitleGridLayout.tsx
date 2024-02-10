import Image from "next/image";
import Link from "next/link";
import "../../styles/customClass.css";
export interface IImageTileData {
  imageUrl: string;
  text: string;
  url: string;
}

interface IImageTileGridLayout {
  imageDataArr: IImageTileData[];
}
export default function ImageTileGridLayout({
  imageDataArr,
}: IImageTileGridLayout) {
  return (
    <div className="p-4  grid grid-cols-2 gap-4">
      {imageDataArr.map((imageData, idx) => (
        <Link className="pb" key={idx} href={imageData.url}>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={imageData.imageUrl}
              sizes="180px"
              fill={true}
              alt="reviewThumbnailImage"
            />
          </div>
          <div className="webkit-clamp-1 mt-2">{imageData.text} </div>
        </Link>
      ))}
    </div>
  );
}
