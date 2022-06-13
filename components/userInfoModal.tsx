import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Spinner, Box, HStack } from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import { FC, useEffect, useState } from "react";
import { getToday } from "../libs/dateUtils";
import { IUser } from "../models/user";
import { UserAttendenceInfo } from "../models/userAttendenceInfo";
import ProfileImage from "./profileImage";

const UserInfoModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  userId: string,
  setActiveUserId?: (activeUser: string) => void,
}> = ({ isOpen, onClose, userId, setActiveUserId }) => {
  const [userAttendenceInfo, setUserAttendenceInfo] = useState<UserAttendenceInfo>(null)
  useEffect(() => {
    const getUserAttendenceInfo = async () => {
      const res = await axios.get(`/api/user/${userId}/info`)

      setUserAttendenceInfo(res.data)
    }
    getUserAttendenceInfo()
  }, [userId])

  const lastWeek = getToday().add(-1, 'week')

  const attendence7Days = userAttendenceInfo?.attendences?.filter((a) => dayjs(a.date) >= lastWeek)
  const cntVote7days = attendence7Days?.length
  const cntOpen7days = attendence7Days?.filter((a) => a.meetingTime !== '')?.length

  const cntVote1Mon = userAttendenceInfo?.attendences?.length
  const cntOpen1Mon = userAttendenceInfo?.attendences?.filter((a) => a.meetingTime !== '')?.length

  const cooperatorFrequency = userAttendenceInfo?.attendences
    ?.filter((a) => a.meetingTime !== '')
    ?.flatMap((a) => a.participants)
    ?.map((p) => p.user as IUser)
    ?.filter((u) => u.uid !== userId)
    ?.reduce((acc, curr) => (
      acc.get(curr) ? acc.set(curr, acc.get(curr)+1) : acc.set(curr, 1), acc
    ), new Map<IUser, number>()) || new Map()

  const cooperator = Array.from(cooperatorFrequency.keys())
    .sort((a, b) => cooperatorFrequency.get(a) - cooperatorFrequency.get(b))
    .slice(0, 3)

  return (
      <Modal size='xs' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
            <ModalContent>
              <ModalHeader>사용자 정보</ModalHeader>
              <ModalBody>
                {
                  userAttendenceInfo ? (
                    <>
                      <Box marginBottom='20px'>
                        <ProfileImage
                          src={userAttendenceInfo.user.profileImage}
                          alt={userAttendenceInfo.user.name}
                          width='150px'
                          margin='0 auto 5px auto'
                        />
                        <Box width='fit-content' margin='0 auto'>
                          <Text as='span' fontSize='2xl' fontWeight='400'>{userAttendenceInfo.user.name}</Text>
                        </Box>
                      </Box>
                      <Box>
                        <Text as='span' fontSize='lg'>최근 7일간 참여(투표): </Text>
                        <Text as='span' fontSize='lg' fontWeight='600'>{cntOpen7days}회({cntVote7days}회)</Text>
                      </Box>
                      <Box>
                        <Text as='span' fontSize='lg'>최근 4주간 참여(투표): </Text>
                        <Text as='span' fontSize='lg' fontWeight='600'>{cntOpen1Mon}회({cntVote1Mon}회)</Text>
                      </Box>
                      <Box>
                        <Text as='span' fontSize='lg'>최근 함께 스터디한 친구: </Text>
                        <HStack spacing={1}>
                        {
                          cooperator.map((c) => (
                            <ProfileImage
                              key={c.uid}
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
                      </Box>
                    </>
                  ) : (
                    <Box width='fit-content' margin='auto'>
                      <Spinner />
                    </Box>
                  )
                }
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>닫기</Button>
              </ModalFooter>
            </ModalContent>
      </Modal>
  )
}

export default UserInfoModal
