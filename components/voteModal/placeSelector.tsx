import { AspectRatio, Container, HStack, Select, VStack, Image, Text, useToast, Button } from "@chakra-ui/react";
import { FC, MouseEvent } from "react";
import { MAX_USER_PER_PLACE } from "../../constants/system";
import { IPlace } from "../../models/place";
import Map from '../map'

const PlaceSelector: FC<{
  placeVoteInfo: { place: IPlace, vote: number, status: string }[],
  selectedPlace?: IPlace,
  setSelectedPlace: (place: IPlace) => void,
}> = ({ placeVoteInfo, selectedPlace, setSelectedPlace }) => {
  const toast = useToast()

  const places = placeVoteInfo.map((pv) => pv.place)

  const placeIconBorderColor = (place: IPlace) => {
    if (selectedPlace?._id == place._id) {
      return 'blue.200'
    }
    const placeInfo = placeVoteInfo.find((pv) => pv.place._id == place._id)
    if (placeInfo.vote >= MAX_USER_PER_PLACE || placeInfo.status !== 'pending') {
      return 'red.400'
    }
    return ''
  }

  const showForbiddenMessage = () => {
    toast({
      title: '신청 불가',
      description: `해당 장소는 투표 기간이 지났어요.`,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'bottom',
    })
  }

  const handlePlaceIconClick = (place: IPlace) => {
    const vote = placeVoteInfo.find((pv) => pv.place._id == place._id)
    if (vote.vote < MAX_USER_PER_PLACE) {
      setSelectedPlace(vote.place)
    } else {
      toast({
        title: '정원초과',
        description: `장소당 최대 ${MAX_USER_PER_PLACE}명까지 신청할 수 있어요.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      })
    }
  }

  return (
    <>
      <Map
        selectedPlace={selectedPlace}
        places={places}
        width='100%'
        height='200px'
      />
      <Container>
        <Select disabled value={selectedPlace?._id} margin='5px 0' placeholder='장소' width='100%'>
          {
            placeVoteInfo
              .filter((p) => p.status === 'pending')
              .map((p) => (
                <option key={p.place._id} value={p.place._id}>
                  {p.place.fullname}
                </option>
              ))
          }
        </Select>
        <HStack justifyContent='center' width='100%'>
          {
            placeVoteInfo.map((placeVoteInfo, idx) => (
              <VStack key={idx} flex={1}>
                <Button
                  padding='0'
                  margin='5px 0'
                  width='fit-content'
                  height='fit-content'
                  borderRadius='25%'
                  borderColor={placeIconBorderColor(placeVoteInfo.place)}
                  borderWidth='4px'
                  borderStyle='solid'
                  overflow='hidden'
                >
                  <AspectRatio
                    title={placeVoteInfo.place._id}
                    ratio={1 / 1}
                    width='60px'
                    onClick={
                      placeVoteInfo.status === 'pending'
                      ? () => handlePlaceIconClick(placeVoteInfo.place) 
                      : showForbiddenMessage
                    }
                  >
                    <Image
                      src={placeVoteInfo.place.image}
                      alt={placeVoteInfo.place.fullname}
                    />
                  </AspectRatio>
                </Button>
                <Text
                  position='relative'
                  top='-12px'
                  fontSize='xs'
                  letterSpacing={0}
                >{placeVoteInfo.place.branch}</Text>
              </VStack>
            ))
          }
        </HStack>
      </Container>
    </>
  )
}

export default PlaceSelector