import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Container, Text, useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import { getSession, signOut } from "next-auth/react"
import { useRef } from "react"

const Settings: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const unlink = async () => {
    await axios.delete('/api/user/withdrawal')

    onClose()
    await signOut()
  }

  return (
    <Container>
      <Button colorScheme='red' onClick={onOpen}>회원탈퇴</Button>

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
