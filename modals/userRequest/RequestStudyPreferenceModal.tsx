import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { ModalFooterNav, ModalMain } from "../../styles/layout/modal";

import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { useStudyPlaceQuery } from "../../hooks/study/queries";
import { IVotePlaces } from "../../types/studyDetails";

import { ModalLayout } from "../../components/common/modal/Modals";
import PlaceSelector from "../../components/utils/PlaceSelector";
import { useStudyPreferenceMutation } from "../../hooks/study/mutations";
import { useCompleteToast } from "../../hooks/ui/CustomToast";
import { userLocationState } from "../../recoil/userAtoms";
import { IModal } from "../../types/common";
import { IPlace } from "../../types/studyDetails";

interface IRequestStudyPreferenceModal extends IModal {
  isBig: boolean;
}

function RequestStudyPreferenceModal({
  setIsModal,
  isBig,
}: IRequestStudyPreferenceModal) {
  const completeToast = useCompleteToast();

  const location = useRecoilValue(userLocationState);

  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [places, setPlaces] = useState<IPlace[]>();
  const [votePlaces, setVotePlaces] = useState<IVotePlaces>({
    place: undefined,
    subPlace: [],
  });

  useStudyPlaceQuery({
    onSuccess(data) {
      const filterData = data?.filter((place) => place?.location === location);
      setPlaces(filterData);
    },
  });

  const { mutate: setStudyPreference } = useStudyPreferenceMutation({
    onSuccess() {
      completeToast("success");
    },
  });

  const firstSubmit = () => {
    if (!votePlaces?.place) {
      setErrorMessage("장소를 선택해주세요!");
      return;
    }
    setPage(1);
  };

  const onSubmit = () => {
    setStudyPreference(votePlaces);
    setIsModal(false);
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
                isBig={isBig}
              />
            </ModalMain>
            <ModalFooterNav>
              <Error>{errorMessage}</Error>
              <button onClick={firstSubmit}>다음</button>
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
                isBig={isBig}
              />
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setPage(0)}>뒤로가기</button>
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
