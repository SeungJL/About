import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { faQuestionCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IPopoverIcon {
  title: string;
  text: string;
}

export const PopOverIcon2 = ({ title, text }: IPopoverIcon) => (
  <Popover>
    <PopoverTrigger>
      <FontAwesomeIcon
        icon={faQuestionCircle}
        color="var(--font-h1)"
        size="sm"
      />
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader fontWeight="600">{title}</PopoverHeader>
      <PopoverBody>{text}</PopoverBody>
    </PopoverContent>
  </Popover>
);
