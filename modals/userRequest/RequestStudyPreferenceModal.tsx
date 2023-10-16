import { useState } from "react";
import styled from "styled-components";
import PlaceSelector from "../../components/features/picker/PlaceSelector";
import {
  ModalBody,
  ModalFooterOne,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import { LOCATION_PLACE_SMALL } from "../../constants/location";
import { useCompleteToast, useFailToast } from "../../hooks/CustomToast";
import { useStudyPreferenceMutation } from "../../hooks/study/mutations";
import { useStudyPlacesLocationQuery } from "../../hooks/study/queries";
import { useUserLocationQuery } from "../../hooks/user/queries";
import { IModal } from "../../types/reactTypes";
import { IStudyPlaces } from "../../types/study/study";
import { IPlace } from "../../types/study/studyDetail";

function RequestStudyPreferenceModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const [page, setPage] = useState(0);

  const [places, setPlaces] = useState<IPlace[]>();
  const [votePlaces, setVotePlaces] = useState<IStudyPlaces>({
    place: undefined,
    subPlace: [],
  });

  //사이즈 설정
  const { data: location } = useUserLocationQuery();
  const isBig = !LOCATION_PLACE_SMALL.includes(location);

  //같은 지역의 스터디 장소 호출
  useStudyPlacesLocationQuery(location, {
    enabled: !!location,
    onSuccess(data) {
      setPlaces(data);
    },
  });

  const { mutate: setStudyPreference } = useStudyPreferenceMutation({
    onSuccess() {
      completeToast("success");
      setIsModal(false);
    },
  });

  const selectFirst = () => {
    if (!votePlaces?.place) {
      failToast("free", "장소를 선택해주세요!");
      return;
    }
    setPage(1);
  };

  const onSubmit = () => {
    setStudyPreference(votePlaces);
  };

  return (
    <>
      <ModalLayout onClose={() => setIsModal(false)} size={isBig ? "xl" : "md"}>
        <ModalHeader text="스터디 선호 장소 설정" />
        <ModalBody>
          {page === 0 ? (
            <>
              <Subtitle>1지망 선택</Subtitle>
              <PlaceSelector
                places={places}
                votePlaces={votePlaces}
                setVotePlaces={setVotePlaces}
                isMain={true}
              />
            </>
          ) : (
            <>
              <Subtitle>2지망 선택</Subtitle>
              <PlaceSelector
                places={places}
                votePlaces={votePlaces}
                setVotePlaces={setVotePlaces}
                isMain={false}
              />
            </>
          )}
        </ModalBody>
        {page === 0 ? (
          <ModalFooterOne text="다음" onClick={selectFirst} />
        ) : (
          <ModalFooterTwo
            rightText="완료"
            onClickLeft={() => setPage(0)}
            onClickRight={onSubmit}
          />
        )}
      </ModalLayout>
    </>
  );
}

const Subtitle = styled.div`
  color: var(--font-h3);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: var(--margin-md);
`;

export default RequestStudyPreferenceModal;
