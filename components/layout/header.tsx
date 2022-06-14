import { Box, HStack } from "@chakra-ui/react"
import NextLink from "next/link"
import { useSession } from "next-auth/react"
import { FC } from "react"
import { getInterestingDate } from "../../libs/dateUtils"
import Logo from "../logo"
import ProfileImage from "../profileImage"
import { BellIcon } from "@chakra-ui/icons"

const Header: FC = () => {
  const { data: session } = useSession()

  if (!session) 
    return (
      <div />
    )


  return (
    <Box marginBottom='15px' padding='0 5px'>
      <HStack justifyContent='space-between' margin='5px' alignItems='center' >
        <BellIcon fontSize='4xl' />
        <NextLink href={`/${getInterestingDate().format('YYYY-MM-DD')}`}>
          <Box cursor='pointer'>
            <Logo width='50' height='50' />
          </Box>
        </NextLink>
        <NextLink href={'/user/info'}>
          <ProfileImage
            src={session.user.image}
            alt={session.user.name}
            cursor='pointer'
          />
        </NextLink>
      </HStack>
    </Box>
  )
}

export default Header