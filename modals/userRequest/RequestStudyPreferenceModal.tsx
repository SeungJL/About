import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
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
import {
  useStudyPlacesQuery,
  useStudyPreferenceQuery,
} from "../../hooks/study/queries";
import { userInfoState } from "../../recoil/userAtoms";
import { IModal } from "../../types/reactTypes";
import { IStudyPlaces } from "../../types/study/study";

function RequestStudyPreferenceModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const [page, setPage] = useState(0);

  const [votePlaces, setVotePlaces] = useState<IStudyPlaces>({
    place: undefined,
    subPlace: [],
  });

  const { data: studyPreference } = useStudyPreferenceQuery();

  const userInfo = useRecoilValue(userInfoState);
  const location = userInfo?.location;

  const isBig = !LOCATION_PLACE_SMALL.includes(location);

  //같은 지역의 스터디 장소 호출

  const { data: studyPlaces } = useStudyPlacesQuery(location, {
    enabled: !!location,
  });

  useEffect(() => {
    if (!studyPreference) return;
    setVotePlaces({
      place: studyPreference.place,
      subPlace: studyPreference?.subPlace,
    });
  }, [studyPreference]);

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
                places={studyPlaces}
                votePlaces={votePlaces}
                setVotePlaces={setVotePlaces}
                isMain={true}
              />
            </>
          ) : (
            <>
              <Subtitle>2지망 선택</Subtitle>
              <PlaceSelector
                places={studyPlaces}
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
