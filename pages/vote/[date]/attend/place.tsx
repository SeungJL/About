import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Container,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Dayjs } from "dayjs";
import { NextPage } from "next";
import { ChangeEventHandler, FC, useState } from "react";
import Map from "../../../../components/map";
import { usePlaceQuery } from "../../../../hooks/vote/queries";
import { IPlace } from "../../../../models/place";

const AttendPlace: NextPage<{
  date: Dayjs;
}> = ({ date }) => {
  const toast = useToast();
  const { data: places, isLoading: isPlaceLoading } = usePlaceQuery({
    onError: (err) => {
      toast({
        title: "불러오기 실패",
        description: "투표 정보를 불러오지 못 했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });
  const [attendInfo, setAttendInfo] = useState<{
    place: IPlace;
    start: Date;
    end: Date;
  }>({
    place: null,
    start: null,
    end: null,
  });

  const onChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;

    const selected = places.find((place) => place._id === value);
    setAttendInfo({ ...attendInfo, place: selected });
  };

  const canAccessTimeTab = !!attendInfo.place;

  return (
    <>
      {isPlaceLoading && <Spinner />}
      {places && (
        <>
          <Map
            selectedPlace={attendInfo.place}
            places={places}
            width="100%"
            height="250px"
          />
          <Container>
            <Select
              id="place"
              margin="5px 0"
              placeholder="장소"
              width="100%"
              onChange={onChange}
            >
              {places.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.fullname}
                </option>
              ))}
            </Select>
            <Button
              width="100%"
              colorScheme="yellow"
              disabled={!canAccessTimeTab}
            >
              다음
            </Button>
          </Container>
        </>
      )}
    </>
  );
};

export default AttendPlace;
