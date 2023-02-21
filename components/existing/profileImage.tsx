import { AspectRatio, AspectRatioProps, Image } from "@chakra-ui/react";
import { FC } from "react";

const ProfileImage: FC<
  AspectRatioProps & {
    src: string;
    alt: string;
    width?: string;
  }
> = ({ src, alt, width = "40px", ...props }) => (
  <AspectRatio ratio={1 / 1} width={width} {...props}>
    <Image borderRadius="35%" src={src} alt={alt} />
  </AspectRatio>
);

export default ProfileImage;
