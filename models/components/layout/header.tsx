import { AspectRatio, Box, Button, Heading, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";
import Logo from "../logo";

const Header: FC = () => {
  const { data: session } = useSession()

  if (!session) 
    return (
      <div>
      </div>
    )

  return (
    <Box marginBottom='15px'>
      <HStack justifyContent='space-between' margin='5px' alignItems='center' >
        <Box width='40px' />
        <Logo width='50' height='50' />
        <Popover styleConfig={{ outerWidth: 'auto' }}>
          <PopoverTrigger>
            <button>
              <AspectRatio ratio={1 / 1} width='40px' marginRight='10px'>
                <Image 
                  borderRadius='35%'
                  src={session.user.image}
                  alt={session.user.name}
                />
              </AspectRatio>
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody>
              <Button onClick={() => signOut()}>로그아웃</Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Box>
  )
}

export default Header