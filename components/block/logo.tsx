import { FC } from "react";
import { Image } from "@chakra-ui/react";

const Logo: FC<{
  imgSize: "xs" | "xl";
  boxSize: string;
}> = ({ imgSize: size, boxSize }) => {
  let imageSrc = "xs";
  switch (size) {
    case "xs":
      imageSrc =
        "https://user-images.githubusercontent.com/48513798/200158102-c79e6575-aeca-4809-bc14-c665468c38a8.png";
    case "xl":
      imageSrc =
        "https://user-images.githubusercontent.com/48513798/200158031-24c3958e-fc68-4994-8666-6e43f69ba396.png";
  }

  return <Image boxSize="250" src={imageSrc} />;
};

export default Logo;
