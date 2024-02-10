import Avatar from "@/components/atoms/Avatar";
import ShadowAvatar from "@/components/atoms/ShadowAvatar";
import { IAvatar } from "@/types/userTypes/userInfoTypes";
import { AvatarGroup } from "flowbite-react";

type Size = "sm";

interface IUserAvatar {
  image: string;
  avatar?: IAvatar;
}

interface IAvatarGroupsOverwrap {
  userAvatarArr: IUserAvatar[];
  size: Size;
}

const VIEW_CNT = 5;

export default function AvatarGroupsOverwrap({
  userAvatarArr,
  size,
}: IAvatarGroupsOverwrap) {

  const length = userAvatarArr.length;
  return (
    <div className="flex flex-wrap ">
      <AvatarGroup className="-space-x-2">
        {userAvatarArr.map((userAvatar, idx) =>
          idx < VIEW_CNT ? (
            <div key={idx} className="">
              <Avatar
                image={userAvatar.image}
                avatar={userAvatar?.avatar}
                size={size}
              />
            </div>
          ) : null
        )}
        {length > VIEW_CNT && <ShadowAvatar text={`+${length - VIEW_CNT}`} />}
      </AvatarGroup>
    </div>
  );
}
