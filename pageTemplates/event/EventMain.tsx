import { Box } from "@chakra-ui/react";
import { faLock } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IconButtonColBlock, {
  IIconButtonColBlockProps,
} from "../../components2/atoms/blocks/IconButtonColBlock";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import BlockSlider from "../../components2/organisms/sliders/BlockSlider";
import { BADGE_COLOR } from "../../constants/settingValue/badge";
import { useUserInfoQuery } from "../../hooks/user/queries";

interface IEventMain {}
export default function EventMain({}: IEventMain) {
  const { data: userInfo } = useUserInfoQuery();

  const blockArr = Object.keys(BADGE_COLOR).map((badge) => ({}));

