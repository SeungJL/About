import { AspectRatio, Box, Button, Heading, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

const Header: FC = () => {
  const { data: session } = useSession()

  if (!session) 
    return (
      <div>
      </div>
    )

  return (
    <Box>
      <HStack justifyContent='space-between' margin='5px' alignItems='center' >
        <Box width='40px' />
        <Heading size='lg'>VOTE HELPER</Heading>
        <Popover styleConfig={{ outerWidth: 'auto' }}>
          <PopoverTrigger>
            <AspectRatio ratio={1 / 1} width='40px' marginRight='10px'>
              <Image 
                borderRadius='35%'
                src={session.user.image}
                alt={session.user.name}
              />
            </AspectRatio>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Button onClick={() => signOut()}>로그아웃</Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>
    </Box>
  )
}

export default Header