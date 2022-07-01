import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Box, HStack, useToast, VStack, Badge, Divider, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { FC, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";
import { isStranger, role, isMember, isPreviliged } from "../libs/authUtils";
import { groupBy } from "../libs/utils";
import { IUser } from "../models/user";
import { UserAttendenceInfo } from "../models/userAttendenceInfo";
import ProfileImage from "./profileImage";
import SummaryAttendenceInfo from "./summaryAttendenceInfo";

const UserInfoModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  userId: string,
  setActiveUserId?: (activeUser: string) => void,
}> = ({ isOpen, onClose, userId, setActiveUserId }) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const {isFetching, data: userAttendenceInfo} = useQuery<UserAttendenceInfo, AxiosError, UserAttendenceInfo, [string, string]>(
    ['fetchUserInfo', userId],
    async ({ queryKey }) => {
      const [_key, userId] = queryKey
      const res = await axios.get(`/api/user/${userId}/info`)
      return res.data
    },
    {
      onError: (error) => {
        console.error(error)
        toast({
          title: '실패',
          description: '사용자 정보를 불러오는데 실패했어요',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        })
      }
    },
  )

  useEffect(() => {
    queryClient.invalidateQueries('fetchUserInfo')
  }, [userId])

  const cooperator = useMemo(() => {
    if (!userAttendenceInfo) return []

    const users = userAttendenceInfo.attendences
      .filter((a) => !!a.meetingTime)
      .flatMap((a) => a.participants)
      .map((p) => p.user as IUser)
      .filter((u) => u.uid !== userId)

    const usersById = groupBy(users, (user) => (user._id.toString()))
  
    const uniqueUsers = Array.from<string>(new Set(users.map(user => user._id.toString())))

    return uniqueUsers
      .map(userId => {
        const userDups = usersById.get(userId)
        const cnt = userDups?.length || 0
        if (!cnt) return null
        return { user: userDups[0], cnt }
      })
      .filter((u) => !!u)
      .sort((a, b) => (b.cnt - a.cnt))
      .slice(0, 4)
      .map((userWithCnt => (userWithCnt.user)))
  }, [userAttendenceInfo])

  return (
      <Modal size='xs' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
            <ModalContent>
              <ModalHeader>사용자 정보</ModalHeader>
              <ModalBody>
                <HStack spacing={3} marginBottom='20px'>
                  <SkeletonCircle width='fit-content' height='fit-content' isLoaded={!isFetching}>
                    <ProfileImage
                      src={userAttendenceInfo?.user?.profileImage}
                      alt={userAttendenceInfo?.user?.name}
                      width='90px'
                    />
                  </SkeletonCircle>
                  <VStack alignItems='flex-start'>
                    <Skeleton isLoaded={!isFetching}>
                      <Text as='span' fontSize='2xl' fontWeight='400'>{userAttendenceInfo?.user?.name}</Text>
                    </Skeleton>
                    <Skeleton isLoaded={!isFetching}>
                      <HStack spacing={1}>
                        {
                          userAttendenceInfo && isStranger(userAttendenceInfo?.user?.role) && (
                            <Badge key='stranger' colorScheme='yellow'>{role.stranger.display}</Badge>
                          )
                        }
                        {
                          isMember(userAttendenceInfo?.user?.role) && (
                            <Badge key='member' colorScheme='green'>{role.member.display}</Badge>
                          )
                        }
                        {
                          isPreviliged(userAttendenceInfo?.user?.role) && (
                            <Badge key='previlied' colorScheme='red'>{role.previliged.display}</Badge>
                          )
                        }
                      </HStack>
                    </Skeleton>
                  </VStack>
                </HStack>
                <Divider />
                <Skeleton isLoaded={!isFetching}>
                  <SummaryAttendenceInfo attendences={userAttendenceInfo?.attendences} />
                </Skeleton>
                <Divider />
                <Skeleton isLoaded={!isFetching}>
                  <Box marginTop='5px'>
                    {
                      cooperator.length > 0 && (
                        <>
                          <Text as='span' fontSize='lg'>함께 참여한 친구: </Text>
                          <HStack spacing={1}>
                          {
                            cooperator.map((c, i) => (
                              <ProfileImage
                                key={c.uid + i}
                                src={c.thumbnailImage}
                                alt={c.name}
                                width='50px'
                                onClick={() => {
                                  if (setActiveUserId)
                                    setActiveUserId(c.uid)
                                }}
                              />
                            ))
                          }
                          </HStack>
                        </>
                      )
                    }
                  </Box>
                </Skeleton>
              </ModalBody>
              <ModalFooter>
                <Button width='100%' onClick={onClose}>닫기</Button>
              </ModalFooter>
            </ModalContent>
      </Modal>
  )
}

export default UserInfoModal
