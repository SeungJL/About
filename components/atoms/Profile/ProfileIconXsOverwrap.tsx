import { faEllipsis } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import {
  AVATAR_COLOR,
  AVATAR_ICON,
} from "../../../constants/settingValue/avatar";
import Avatar from "../Avatar";

import { IAvatar } from "../../../types/userTypes/userInfoTypes";

interface IProfileIconXsOVerwrap {
  user: {
    image: string;
    avatar?: IAvatar;
  };
  isOverlap?: boolean;
  isImagePriority?: boolean;
}

function ProfileIconXsOverwrap({
  user,
  isOverlap,
  isImagePriority,
}: IProfileIconXsOVerwrap) {
  const avatarType = user?.avatar?.type;
  const avatarBg = user?.avatar?.bg;

  const isAvatar = Boolean(
    avatarType !== null &&
      avatarType !== undefined &&
      avatarBg !== undefined &&
      avatarBg !== null &&
      avatarType >= 0 &&
      avatarBg >= 0
    // user === "guest"
  );

  const [isError, setIsError] = useState(false);

  const imageUrl = isAvatar
    ? `${AVATAR_ICON[avatarType]}`
    : `${user?.image || AVATAR_ICON[1]}`;

  return (
    <Layout>
      <Wrapper
        style={{
          background: isError
            ? AVATAR_COLOR[5]
            : isAvatar && AVATAR_COLOR[avatarBg],
        }}
      >
        {!isOverlap ? (
          <Avatar image={user.image} size="sm" avatar={user.avatar} />
        ) : (
          <OverlapWrapper>
            <Avatar image={user.image} size="sm" avatar={user.avatar} />
            <IconWrapper>
              <FontAwesomeIcon icon={faEllipsis} size="lg" color="white" />
            </IconWrapper>
          </OverlapWrapper>
        )}
      </Wrapper>
    </Layout>
  );
}

const Layout = styled.div`
  width: 28px;
  height: 28px;
  padding: 2px;
  background-color: white;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  bottom: -24px;
  left: 12px;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Wrapper = styled.div`
  width: 26px;
  height: 26px;
  overflow: hidden;
  border-radius: 50%;
  margin-left: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -1px;
`;

const OverlapWrapper = styled.div`
  position: relative;
  z-index: 5000;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 어두운 색상
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.7; // 투명도
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default ProfileIconXsOverwrap;
