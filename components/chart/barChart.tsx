import { Box, HStack, Image, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { IPlace } from "../../models/place";
import { IParticipation } from "../../models/vote";

const BAR_WIDTH = 50
const UNIT_HEIGHT = 40

const Bar: FC<{
  place: IPlace,
  attendenceCnt: number,
  absenceCnt: number,
  invitationCnt: number,
}> = ({ place, attendenceCnt, absenceCnt, invitationCnt }) => {
  return (
    <VStack
      backgroundColor='gray.200'
      width={`${10 + BAR_WIDTH}px`}
      height={`${10 + UNIT_HEIGHT*6}px`}
      padding='5px 0'
      spacing={0.5}
      borderRadius='5px'
      justifyContent='flex-end'
    >
      {
        Array.from(Array(invitationCnt).keys()).map((_, idx) => (
          <Box
            key={`inv-${idx}`}
            className='invitation'
            backgroundColor='yellow.300'
            width={`${BAR_WIDTH}px`}
            height={`${UNIT_HEIGHT}px`}
            borderRadius='3px'
          />
        ))
      }
      {
        Array.from(Array(absenceCnt).keys()).map((_, idx) => (
          <Box 
            key={`ab-${idx}`}
            className='absence' 
            backgroundColor='red.500'
            width={`${BAR_WIDTH}px`}
            height={`${UNIT_HEIGHT}px`}
            borderRadius='3px'
          />
        ))
      }
      {
        Array.from(Array(attendenceCnt).keys()).map((_, idx) => (
          <Box 
            key={`att-${idx}`}
            className='attendence'
            backgroundColor='green.400'
            width={`${BAR_WIDTH}px`}
            height={`${UNIT_HEIGHT}px`}
            borderRadius='3px'
          />
        ))
      }
    </VStack>
  )
}

const BarChart: FC<{
  participations: IParticipation[]
}> = ({ participations }) => (
  <HStack spacing={3}>
    {
      participations.map((participation) => {
        const { attendences, absences, invitations } = participation
        const place = participation.place as IPlace

        return (
          <VStack key={place._id}>
            <Bar
              key={place._id}
              place={place}
              attendenceCnt={attendences.length}
              absenceCnt={absences.length}
              invitationCnt={invitations.length}
            />
            <Image
              src={place.image}
              alt={place.fullname}
              width={`${BAR_WIDTH + 10}px`}
              borderRadius='10px'
              borderColor='gray.200'
              borderWidth='5px'
              borderStyle='solid'
            />
          </VStack>

        )
      })
    }
  </HStack>
)

export default BarChart
