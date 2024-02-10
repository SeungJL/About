import { UserIcon } from "@/assets/icons/UserIcon";
import OutlineBadge from "@/components/atoms/badges/OutlineBadge";
import { IImageProps } from "@/types/assetTypes";
import { ITextAndColorType } from "@/types/propTypes";
import { IUserSummary } from "@/types/userTypes/userInfoTypes";
import Image from "next/image";
import Link from "next/link";
import AvatarGroupsOverwrap from "../groups/AvatarGroupsOverwrap";

export interface IPostThumbnailCard {
  participants: IUserSummary[];
  title: string;
  subtitle: string;
  image: IImageProps;
  url: string;
  badge: ITextAndColorType;
  statusText?: string;
}

interface IPostThumbnailCardObj {
  postThumbnailCardProps: IPostThumbnailCard;
}

export function PostThumbnailCard({
  postThumbnailCardProps: {
    participants,
    title,
    subtitle,
    image,
    url,
    badge,
    statusText = undefined,
  },
}: IPostThumbnailCardObj) {
  const userAvatarArr = participants.map((par) => ({
    image: par.profileImage,
    ...(par?.avatar?.type !== null ? { avatar: par.avatar } : {}),
  }));

  return (
    <Link
      href={url}
      className="h-28 flex p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <Image
        src={image.url}
        priority={image.priority}
        width={86.5}
        height={86.5}
        alt="thumbnailImage"
        className="rounded-lg"
      />
      <div className="flex flex-col ml-3 flex-1">
        <div className="">
          <div className="flex justify-between">
            <div className="mr-1 flex-1 webkit-clamp-1 font-bold text-base">
              {title}
            </div>
            <OutlineBadge text={badge.text} colorType={badge.colorType} />
          </div>
          <div className="text-gray-4 text-sm"> {subtitle} </div>
        </div>
        <div className="flex mt-auto">
          <div className="flex-1">
            <AvatarGroupsOverwrap userAvatarArr={userAvatarArr} size="sm" />
          </div>
          <div className="flex ml-auto mt-auto items-center  text-gray-4">
            <div>{statusText}</div>
            <div className="flex items-center tracking-widest">
              <div className="mb-1">
                <UserIcon />
              </div>
              <span className="ml-1 ">{participants.length}/8</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PostThumbnailCardSkeleton() {
  return (
    <div className="animate-pulse h-28 flex p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="bg-gray-200 rounded-lg w-[86.5px] h-[86.5px]"></div>
      <div className="flex flex-col ml-3 flex-1">
        <div className="">
          <div className="flex justify-between">
            <div className="bg-gray-200 rounded-lg w-16 h-5 mr-1 webkit-clamp-1 font-bold text-base"></div>
          </div>
          <div className="bg-gray-200 rounded-lg w-14 h-4 mt-2 text-gray-4 text-sm"></div>
        </div>
        <div className="flex mt-auto"></div>
      </div>
    </div>
  );
}
