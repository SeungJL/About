import {
  Box,
  Button,
  Circle,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import {
  faBooks,
  faCampfire,
  faCloudBolt,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function WriteDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const { isOpen, onOpen, onClose: closeDrawer } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const onClose = () => {
    closeDrawer();
    newSearchParams.delete("write");
    router.replace(
      pathname + newSearchParams.toString()
        ? `?${newSearchParams.toString()}`
        : ""
    );
  };

  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent bg="transparent">
        <DrawerBody display="flex" justifyContent="center" alignItems="center">
          <Flex
            direction="column"
            h="100dvh"
            justify="center"
            align="center"
            onClick={onClose}
          >
            <SocialButton
              title="모임"
              subTitle="재밌는 모임으로 친해져요"
              icon={<FontAwesomeIcon icon={faCloudBolt} color="white" />}
              color="red.400"
            />
            <SocialButton
              title="소그룹"
              subTitle="비슷한 관심사의 인원들을 모아봐요"
              icon={<FontAwesomeIcon icon={faCampfire} color="white" />}
              color="blue.400"
            />
            <SocialButton
              title="스터디"
              subTitle="직접 스터디를 만들어봐요"
              icon={<FontAwesomeIcon icon={faBooks} color="white" />}
              color="green.400"
            />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

interface ISocialButton {
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  color: string;
}

const SocialButton = ({ title, subTitle, icon, color }: ISocialButton) => {
  return (
    <Link href="">
      <Button
        bgColor="white"
        w="90vw"
        border="2px solid var(--gray-3)"
        mb="8px"
        p="16px"
        h="min-content"
        rounded="lg"
      >
        <Flex w="full" align="center" lineHeight={1.5}>
          <Box mr="16px">
            <Circle bg={color} p="6px" aspectRatio={1}>
              {icon}
            </Circle>
          </Box>
          <Flex direction="column" align="flex-start">
            <Box as="span">{title}</Box>
            <Box as="span" fontWeight={400}>
              {subTitle}
            </Box>
          </Flex>
        </Flex>
      </Button>
    </Link>
  );
};
