import { useState } from "react";
import styled from "styled-components";
import PlaceSelector from "../../components/features/picker/PlaceSelector";
import { ModalHeaderX } from "../../components/modal/ModalComponents";
import { ModalLayout } from "../../components/modal/Modals";
import { LOCATION_PLACE_SMALL } from "../../constants/location";
import { useCompleteToast } from "../../hooks/CustomToast";
import { useStudyPreferenceMutation } from "../../hooks/study/mutations";
import { useStudyPlacesLocationQuery } from "../../hooks/study/queries";
import { useUserLocationQuery } from "../../hooks/user/queries";
import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";
import { IPlace } from "../../types/study/study";
import { IStudyPlaces } from "../../types/study/studyUserAction";

function RequestStudyPreferenceModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();

  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
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
      setErrorMessage("장소를 선택해주세요!");
      return;
    }
    setPage(1);
  };

  const onSubmit = () => {
    setStudyPreference(votePlaces);
  };

  return (
    <>
      <ModalLayout size={isBig ? "xl" : "md"}>
        <ModalHeaderX title="스터디 선호 장소 설정" setIsModal={setIsModal} />
        {page === 0 ? (
          <>
            <ModalMain>
              <Subtitle>1지망 선택</Subtitle>
              <PlaceSelector
                places={places}
                votePlaces={votePlaces}
                setVotePlaces={setVotePlaces}
                isMain={true}
              />
            </ModalMain>
            <ModalFooterNav>
              <Error>{errorMessage}</Error>
              <button onClick={selectFirst}>다음</button>
            </ModalFooterNav>
          </>
        ) : (
          <>
            <ModalMain>
              <Subtitle>2지망 선택</Subtitle>
              <PlaceSelector
                places={places}
                votePlaces={votePlaces}
                setVotePlaces={setVotePlaces}
                isMain={false}
              />
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setPage(0)}>이전</button>
              <button onClick={onSubmit}>완료</button>
            </ModalFooterNav>
          </>
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

const Error = styled.span`
  font-size: 13px;
  margin-right: var(--margin-right);
  color: var(--color-red);
`;

export default RequestStudyPreferenceModal;
