import { InfoOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import { Box, Button, Text, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, List, ListItem, useDisclosure, Link } from "@chakra-ui/react";
import NextLink from "next/link"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useRef } from "react";
import { getInterestingDate } from "../../libs/dateUtils";
import Logo from "../logo";
import ProfileImage from "../profileImage";

const Header: FC = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const btnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!session) 
    return (
      <div>
      </div>
    )


  return (
    <Box marginBottom='15px'>
      <HStack justifyContent='space-between' margin='5px' alignItems='center' >
        <Box width='40px' />
        <NextLink href={`/${getInterestingDate().format('YYYY-MM-DD')}`}>
          <Box>
            <Logo width='50' height='50' />
          </Box>
        </NextLink>

        <button
          ref={btnRef}
          onClick={onOpen}
          style={{ marginRight: '10px' }}
        >
          <ProfileImage
            src={session.user.image}
            alt={session.user.name}
          />
        </button>
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='xs'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton fontSize='2xl' marginTop='10px' marginRight='10px' />
          <DrawerHeader fontSize='3xl'>
            메뉴
          </DrawerHeader>
          <DrawerBody>
            <List spacing={3}>
              <ListItem>
                <NextLink href='/user/info'>
                  <Link onClick={onClose}>
                    <Box display='flex' padding='10px 0' alignItems='center' width='100%'>
                      <InfoOutlineIcon margin='auto 10px auto 0' fontSize='3xl' />
                      <Text as='span' fontSize='xl' fontWeight='500'>내정보</Text>
                    </Box>
                  </Link>
                </NextLink>
                <NextLink href='/settings'>
                  <Link onClick={onClose}>
                    <Box display='flex' padding='10px 0' alignItems='center' width='100%'>
                      <SettingsIcon margin='auto 10px auto 0' fontSize='3xl' />
                      <Text as='span' fontSize='xl' fontWeight='500'>환경설정</Text>
                    </Box>
                  </Link>
                </NextLink>
              </ListItem>
            </List>
          </DrawerBody>

          <DrawerFooter>
            <Button onClick={() => signOut()}>로그아웃</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Header