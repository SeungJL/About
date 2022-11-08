import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Container, Divider, Heading, HStack, Radio, RadioGroup, Text, useColorMode, useDisclosure, useRadio, useRadioGroup } from "@chakra-ui/react"
import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import { getSession, signOut } from "next-auth/react"
import { useRef } from "react"
import Logo from "../components/icon/logo"

const Settings: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const { colorMode, setColorMode } = useColorMode()
  const unlink = async () => {
    await axios.delete('/api/user/withdrawal')

    onClose()
    await signOut()
  }

  return (
    <Container>
      <Heading as='h1' fontSize='3xl' marginBottom='10px'>설정</Heading>
      <Divider marginTop='5px' marginBottom='10px'/>
      <Box marginBottom='20px'>
        <Heading as='h2' fontSize='xl'>테마</Heading>
        <Divider marginTop='5px' marginBottom='10px' />
        <RadioGroup value={colorMode} onChange={(value) => {setColorMode(value)}}>
          <HStack direction='row' justifyContent='space-around'>
            <Box>
              <Box
                width='120px'
                height='120px'
                backgroundColor='white'
                borderRadius='10px'
                borderColor={ colorMode === 'light' && 'blue.300' }
                borderWidth='3px'
                display='flex'
                justifyContent='center'
                alignItems='center'
                padding='0'
                onClick={() => setColorMode('light')}
              >
                <Logo imgSize='xl' boxSize='80px' />
              </Box>
              <Radio value='light'>
                라이트모드
              </Radio>
            </Box>

            <Box>
              <Box
                width='120px'
                height='120px'
                backgroundColor='#1A202C'
                borderRadius='10px'
                borderColor={ colorMode === 'dark' && 'blue.300' }
                borderWidth='3px'
                display='flex'
                justifyContent='center'
                alignItems='center'
                padding='0'
                onClick={() => setColorMode('dark')}
              >
                <Logo imgSize='xl' boxSize='80px' />
              </Box>
              <Radio value='dark'>
                다크모드
              </Radio>
            </Box>
          </HStack>
        </RadioGroup>
      </Box>
      <Box>
        <Heading as='h2' fontSize='xl'>회원탈퇴</Heading>
        <Divider marginTop='5px' marginBottom='10px'/>
        <Button colorScheme='red' width='100%' height='50px' fontSize='xl' onClick={onOpen}>회원탈퇴</Button>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size='sm'
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' color='red'>
              경고
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontSize='lg'>모든 회원정보 및 모든 활동정보가 사라집니다</Text>
              <Text fontSize='lg'>정말 회원탈퇴하시겠습니까?</Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} width='50%' onClick={onClose}>
                취소
              </Button>
              <Button colorScheme='red' width='50%' onClick={unlink} ml={3}>
                회원탈퇴
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }

  return {
    props: { },
  }
}

export default Settings
