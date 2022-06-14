import { Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react"
import { FC } from "react"
import InfoIcon from "./icon/infoIcon"

const InfoPopOver: FC<{
  content: string,
}> = ({ content, ...props }) => (
    <Popover size='xs' { ...props }>
      <PopoverTrigger>
        <button style={{ margin: 0 }}>
          <InfoIcon width='1rem' height='1rem' />
        </button>
      </PopoverTrigger>
      <PopoverContent width='fit-content' bg='gray.200'>
        <PopoverArrow />
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
)

export default InfoPopOver
