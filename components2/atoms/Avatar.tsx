import Image from "next/image";
import styled, { css } from "styled-components";
import { COLOR_SUB_TABLE } from "../../constants2/colorConstants";
import { AVATAR_IMAGE_ARR } from "../../storage/avatarStorage";
import { IAvatar as IAvatarProp } from "../../types2/userTypes/userInfoTypes";
type Size = "sm" | "md" | "lg";

interface IAvatar {
  image: string;
  size: Size;
  avatar?: IAvatarProp;
}
export default function Avatar({ image, size, avatar }: IAvatar) {
  const avatarProps: { image: string; bg: string | null } = !avatar
    ? { image, bg: null }
    : { image: AVATAR_IMAGE_ARR[avatar.type], bg: COLOR_SUB_TABLE[avatar.bg] };

  return (
    <AvatarContainer size={size} bg={avatarProps.bg} hasType={!!avatar?.type}>
      <ImageContainer>
        <Image
          src={avatarProps.image || AVATAR_IMAGE_ARR[0]}
          fill={true}
          sizes={size === "sm" ? "28px" : size === "md" ? "44px" : "80px"}
          alt="avatar"
        />
      </ImageContainer>
    </AvatarContainer>
  );
}
const AvatarContainer = styled.div<{
  size: Size;
  bg: string | null;
  hasType: boolean;
}>`
  overflow: hidden;
  position: relative;
  border-radius: 9999px; // rounded-full
  ${(props) => {
    switch (props.size) {
      case "sm":
        return css`
          width: 28px; // w-7
          height: 28px; // h-7
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
  ${(props) =>
    props.size === "sm" &&
    css`
      padding: ${props.hasType
        ? "3px"
        : "2px"}; // p-1 for sm, p-2 (approx) for others
    `}
  background-color: ${(props) =>
    props.bg ? props.bg : "var(--font-h7)"}; // bg-gray-200 as fallback
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  overflow: hidden;
`;
