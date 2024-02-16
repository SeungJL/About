import { Flex } from "@chakra-ui/react";
import Link from "next/link";
import IconButton from "../../atoms/buttons/IconButton";

export type IconButtonNavBtn =
  | {
      icon: React.ReactNode;
      func: () => void;
      link?: never;
    }
  | {
      icon: React.ReactNode;
      func?: never;
      link: string;
    };

interface IIconButtonNav {
  iconList: IconButtonNavBtn[];
}

export default function IconButtonNav({ iconList }: IIconButtonNav) {
  return (
    <Flex h="100%" alignItems="center" as="nav">
      {iconList.map((icon, idx) => (
        <Flex
          w="28px"
          h="28px"
          justify="center"
          align="center"
          ml="8px"
          color="var(--gray-2)"
          key={idx}
        >
          {icon?.link ? (
            <Link
              style={{ position: "relative", padding: "16px" }}
              href={icon.link}
            >
              {icon.icon}
            </Link>
          ) : (
            <IconButton onClick={icon.func}>{icon.icon}</IconButton>
          )}
        </Flex>
      ))}
    </Flex>
  );
}
