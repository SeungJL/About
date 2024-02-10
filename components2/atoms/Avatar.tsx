import { COLOR_SUB_TABLE } from "@/constants/colorConstants";
import { AVATAR_IMAGE_ARR } from "@/storage/avatarStorage";
import { IAvatar as IAvatarProp } from "@/types/userTypes/userInfoTypes";
import Image from "next/image";

type Size = "sm" | "md" | "lg";

interface IAvatar {
  image: string;
  size: Size;
  avatar?: IAvatarProp;
}

export default function Avatar({ image, size, avatar }: IAvatar) {
  const iconSizeObj: { [key in Size]: string } = {
    sm: "w-7 h-7",
    md: "w-11 h-11",
    lg: "w-20 h-20",
  };
  const iconSizeText = iconSizeObj[size];

  const avatarProps: { image: string; bg: string | null } = !avatar
    ? { image, bg: null }
    : { image: AVATAR_IMAGE_ARR[avatar.type], bg: COLOR_SUB_TABLE[avatar.bg] };

  return (
    <div
      className={`overflow-hidden relative rounded-full ${iconSizeText} ${
        avatar?.type ? "p-1" : "p-0.5"
      }
      } ${
        avatar?.bg !== null && avatar?.bg !== undefined
          ? COLOR_SUB_TABLE[avatar.bg]
          : "bg-gray-200"
      } `}
    >
      <div className="relative w-full h-full rounded-full overflow-hidden">
        <Image
          src={avatarProps.image || AVATAR_IMAGE_ARR[0]}
          fill={true}
          sizes={size === "sm" ? "28px" : size === "md" ? "44px" : "80px"}
          alt="avatar"
        />
      </div>
    </div>
  );
}
