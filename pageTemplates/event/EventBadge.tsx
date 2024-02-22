import { Box } from "@chakra-ui/react";
import { faLock } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButtonColBlock, {
  IIconButtonColBlockProps,
} from "../../components2/atoms/blocks/IconButtonColBlock";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import BlockSlider from "../../components2/organisms/sliders/BlockSlider";
import { BADGE_COLOR } from "../../constants/settingValue/badge";

interface IEventBadge {}
export default function EventBadge({}: IEventBadge) {
  const blockArr = Object.keys(BADGE_COLOR).map((badge) => ({}));

  const block: IIconButtonColBlockProps = {
    icon: <FontAwesomeIcon icon={faLock} />,
    title: "아메리카노",
    buttonProp: {
      text: "10 point",
      func: () => {},
    },
    disabled: true,
  };

  const A = <IconButtonColBlock props={block} />;
  return (
    <>
      <SectionBar title="배지를 해금하고 포인트를 받아봐요!" size="md" />
      <Box py="16px" pl="16px">
        <BlockSlider blocks={[A, A, A, A]} slidesPerView={2.4} />
      </Box>
    </>
  );
}
