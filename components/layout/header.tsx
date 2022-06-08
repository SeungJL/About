import { Box, Button, HStack, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { getInterestingDate } from "../../libs/dateUtils";
import Logo from "../logo";
import ProfileImage from "../profileImage";

const Header: FC = () => {
  const { data: session } = useSession()
  const router = useRouter()

  if (!session) 
    return (
      <div>
      </div>
    )

  return (
    <Box marginBottom='15px'>
      <HStack justifyContent='space-between' margin='5px' alignItems='center' >
        <Box width='40px' />
        <Box onClick={() => router.push(`${getInterestingDate().format('YYYY-MM-DD')}`)}>
          <Logo width='50' height='50' />
        </Box>
        <div style={{ zIndex: 100 }}>
          <Popover styleConfig={{ outerWidth: 'auto'}}>
            <PopoverTrigger>
              <button style={{ marginRight: '10px' }}>
                <ProfileImage
                  src={session.user.image}
                  alt={session.user.name}
                />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>
                <Button onClick={() => signOut()}>로그아웃</Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
      </HStack>
    </Box>
  )
}

export default Header