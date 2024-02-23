import { Box, Flex } from "@chakra-ui/react";
import { faMeteor, faStarShooting } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ArrowTextButton from "../../components2/atoms/buttons/ArrowTextButton";
import SectionBar from "../../components2/molecules/bars/SectionBar";

interface IEventPoint {}
export default function EventPoint({}: IEventPoint) {
  return (
    <>
      <SectionBar title="다양한 포인트 획득처" size="md" />
      <Box fontWeight={600}>
        <Link href="/event/point/activity">
          <Flex
            p="16px"
            justifyContent="space-between"
            borderBottom="var(--border)"
          >
            <Flex>
              <Box mr="12px">
                <FontAwesomeIcon
                  icon={faStarShooting}
                  size="lg"
                  color="var(--color-red)"
                />
              </Box>
              동아리 활동에 참여하고
            </Flex>
            <ArrowTextButton dir="right" text="500P 받기" size="md" />
          </Flex>
        </Link>
        <Link href="/event/point/mission">
          <Flex p="16px" justifyContent="space-between">
            <Flex>
              <Box mr="12px">
                <FontAwesomeIcon
                  icon={faMeteor}
                  size="lg"
                  color="var(--color-red)"
                />
              </Box>
              이벤트에 참여하고
            </Flex>
            <ArrowTextButton dir="right" text="500P 받기" size="md" />
          </Flex>
        </Link>
      </Box>
    </>
  );
}
