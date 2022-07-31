import { AspectRatio, Container, HStack, Select, VStack, Image, Text, useToast } from "@chakra-ui/react";
import { FC, MouseEvent } from "react";
import { MAX_USER_PER_PLACE } from "../../constants/system";
import { IPlace } from "../../models/place";
import Map from '../map'

const PlaceSelector: FC<{
  placeVoteInfo: { place: IPlace, vote: number }[],
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
    if (placeInfo.vote >= MAX_USER_PER_PLACE) {
      return 'red.400'
    }
    return 'gray.200'
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
        <Select value={selectedPlace?._id} margin='5px 0' placeholder='장소' width='100%'>
          {
            places.map((p) => (
              <option key={p._id} value={p._id}>
                {p.fullname}
              </option>
            ))
          }
        </Select>
        <HStack justifyContent='center' width='100%'>
          {
            places.map((place, idx) => (
              <VStack key={idx} flex={1}>
                <AspectRatio
                  title={(place as IPlace)._id}
                  ratio={1 / 1}
                  width='60px'
                  margin='5px 0'
                  onClick={() => handlePlaceIconClick(place)}
                >
                  <Image
                    borderRadius='25%'
                    src={place.image}
                    alt={place.fullname}
                    borderColor={placeIconBorderColor(place)}
                    borderWidth='4px'
                    borderStyle='solid'
                  />
                </AspectRatio>
                <Text
                  position='relative'
                  top='-12px'
                  fontSize='xs'
                  letterSpacing={0}
                >{place.branch}</Text>
              </VStack>
            ))
          }
        </HStack>
      </Container>
    </>
  )
}

export default PlaceSelector