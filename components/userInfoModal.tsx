import { Modal, ModalOverlay, Image, ModalContent, ModalHeader, ModalBody, Select, ModalFooter, Button, HStack, Text, FormErrorMessage, Spinner, Box } from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useState } from "react";
import { getToday } from "../libs/dateUtils";
import { IUser } from "../models/user";
import { UserAttendenceInfo } from "../models/UserAttendenceInfo";
import ProfileImage from "./profileImage";

const UserInfoModal: FC<{
  isOpen: boolean,
  onClose: () => void,
  userName: string,
  userId: string,
}> = ({ isOpen, onClose, userName, userId }) => {
  const [userAttendenceInfo, setUserAttendenceInfo] = useState<UserAttendenceInfo>(null)
  useEffect(() => {
    const getUserAttendenceInfo = async () => {
      const res = await axios.get(`/api/user/${userId}/info`)

      setUserAttendenceInfo(res.data)
    }
    getUserAttendenceInfo()
  }, [])

  const lastWeek = getToday().add(-1, 'week')
  const cnt7days = userAttendenceInfo?.attendences?.filter((a) => dayjs(a.date) >= lastWeek)?.length

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
      <Modal size='sm' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
            <ModalContent>
              <ModalHeader>사용자 정보</ModalHeader>
              <ModalBody>
                {
                  userAttendenceInfo ? (
                    <>
                      <ProfileImage
                        src={userAttendenceInfo.user.profileImage}
                        alt={userAttendenceInfo.user.name}
                        width='150px'
                        margin='0 auto 20px auto'

                      />
                      <Box>
                        <Text as='span' fontSize='lg'>최근 7일간 참여 횟수: </Text>
                        <Text as='span' fontSize='lg' fontWeight='600'>{cnt7days}회</Text>
                      </Box>
                      <Box>
                        <Text as='span' fontSize='lg'>최근 한달간 참여 횟수: </Text>
                        <Text as='span' fontSize='lg' fontWeight='600'>{userAttendenceInfo.attendences.length}회</Text>
                      </Box>
                      <Box>
                        <Text as='span' fontSize='lg'>최근 함께 스터디한 친구: </Text>
                        {
                          cooperator.map((c) => (
                            <ProfileImage
                              key={c.uid}
                              src={c.thumbnailImage}
                              alt={c.name}
                              width='50px'
                            />
                          ))
                        }
                      </Box>
                    </>
                  ) : (
                    <Spinner />
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
