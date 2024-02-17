import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styled, { css } from "styled-components";
import { COLOR_TABLE_LIGHT } from "../../constants2/colorConstants";
import { AVATAR_IMAGE_ARR } from "../../storage/avatarStorage";
import { IAvatar as IAvatarProp } from "../../types2/userTypes/userInfoTypes";
type Size = "sm" | "md" | "lg";

interface IAvatar {
  image: string;
  size: Size;
  avatar?: IAvatarProp;
  uid?: string;
}

export default function Avatar({ image, size, avatar, uid }: IAvatar) {
  const router = useRouter();

  const avatarProps: { image: string; bg: string | null } = !avatar
    ? { image, bg: null }
    : {
        image: AVATAR_IMAGE_ARR[avatar.type],
        bg: COLOR_TABLE_LIGHT[avatar.bg],
      };

  const onClickAvatar = () => {
    if (size === "sm") return;
    router.push(`/profile/${uid}`);
  };

  return (
    <AvatarContainer onClick={onClickAvatar} size={size}>
      <ImageContainer bg={avatarProps.bg} hasType={!!avatar?.type}>
        <Box w="100%" h="100%" pos="relative">
          <Image
            src={avatarProps.image || AVATAR_IMAGE_ARR[0]}
            fill={true}
            sizes={size === "sm" ? "28px" : size === "md" ? "44px" : "80px"}
            alt="avatar"
          />
        </Box>
      </ImageContainer>
    </AvatarContainer>
  );
}
const AvatarContainer = styled.div<{
  size: Size;
}>`
  overflow: hidden;
  position: relative;
  border-radius: 50%; // rounded-full
  background-color: var(--gray-8);
  ${(props) => {
    switch (props.size) {
      case "sm":
        return css`
          width: 28px; // w-7
          height: 28px; // h-7
          padding: 2px;
        `;
      case "md":
        return css`
          width: 44px; // w-11
          height: 44px; // h-11
        `;
      case "lg":
        return css`
          width: 80px; // w-20
          height: 80px; // h-20
        `;
  
    }
  }}
`;

const ImageContainer = styled.div<{
  bg: string | null;
  hasType: boolean;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;

  ${(props) =>
    props.hasType
      ? css`
          padding: 2px;
        `
      : null}
  background-color: ${(props) =>
    props.bg ? props.bg : "var(--gray-7)"}; // bg-gray-200 as fallback
`;
