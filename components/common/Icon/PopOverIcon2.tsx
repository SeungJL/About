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
import styled from "styled-components";

interface IPopoverIcon {
  title: string;
  text: string;
}

export const PopOverIcon = ({ title, text }: IPopoverIcon) => (
  <Popover>
    <PopoverTrigger>
      <IconWrapper>
        <FontAwesomeIcon icon={faQuestionCircle} color="var(--font-h3)" />
      </IconWrapper>
    </PopoverTrigger>
    <PopoverContent
      ml="var(--margin-md)"
      fontSize="12px"
      _focus={{ outline: "none" }}
    >
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader fontWeight="600">{title}</PopoverHeader>
      <PopoverBody>{text}</PopoverBody>
    </PopoverContent>
  </Popover>
);

const IconWrapper = styled.div`
  margin-left: var(--margin-md);
`;
