import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { ModalFooterNav, ModalMain, ModalMd } from "../../styles/layout/modal";

import { ModalHeaderX } from "../../components/layouts/Modals";

import {
  useStudyPlaceQuery,
  useStudyPreferenceQuery,
} from "../../hooks/study/queries";

import PlaceSelector from "../../components/utils/PlaceSelector";
import PlaceSelectorLg from "../../components/utils/PlaceSelectorLg";
import { useStudyPreferenceMutation } from "../../hooks/study/mutations";
import { useCompleteToast } from "../../hooks/ui/CustomToast";
import { userLocationState } from "../../recoil/userAtoms";
import { IplaceInfo } from "../../types/statistics";

interface IRequestStudyPreferenceModal {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  isBig?: boolean;
}

export interface IStudyPreferences {
  place: string;
  subPlace?: string[];
}

function RequestStudyPreferenceModal({
  setIsModal,
  isBig,
}: IRequestStudyPreferenceModal) {
  const completeToast = useCompleteToast();
  const location = useRecoilValue(userLocationState);
  const [page, setPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [places, setPlaces] = useState<IplaceInfo[]>();

  useStudyPlaceQuery({
    onSuccess(data) {
      const filterData = data
        ?.map((place) => place?.location === location && { placeName: place })
        .filter((item) => item);
      setPlaces(filterData);
    },
  });

  const { mutate: setStudyPreference } = useStudyPreferenceMutation();

  const [firstPlace, setFirstPlace] = useState<IplaceInfo[]>([]);
  const [secondPlaces, setSecondPlaces] = useState<IplaceInfo[]>([]);

  const { data } = useStudyPreferenceQuery();

  const firstSubmit = () => {
    if (firstPlace.length === 0) {
      setErrorMessage("장소를 선택해주세요!");
      return;
    } else setPage(1);
  };

  const onSubmit = () => {
    const place = firstPlace[0].placeName._id;
    const subPlace = secondPlaces.map((item) => item.placeName._id);

    completeToast("success");
    setStudyPreference({ place, subPlace });

    setIsModal(false);
  };

  return (
    <>
      <Layout isBig={isBig} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ModalHeaderX title="스터디 선호 장소 설정" setIsModal={setIsModal} />
        {page === 0 ? (
          <>
            <ModalMain>
              {location !== "수원" && <Subtitle>1지망 선택</Subtitle>}

              {isBig ? (
                <PlaceSelectorLg
                  placeInfoArr={places}
                  isSelectUnit={true}
                  firstPlace={firstPlace}
                  setSelectedPlace={setFirstPlace}
                />
              ) : (
                <PlaceSelector
                  placeInfoArr={places}
                  isSelectUnit={true}
                  firstPlace={firstPlace}
                  setSelectedPlace={setFirstPlace}
                />
              )}
            </ModalMain>
            <ModalFooterNav>
              <Error>{errorMessage}</Error>
              <button onClick={firstSubmit}>다음</button>
            </ModalFooterNav>
          </>
        ) : (
          <>
            <ModalMain>
              {location !== "수원" && <Subtitle>2지망 선택</Subtitle>}
              {isBig ? (
                <PlaceSelectorLg
                  placeInfoArr={places}
                  isSelectUnit={false}
                  firstPlace={firstPlace}
                  secondPlaces={secondPlaces}
                  setSelectedPlace={setSecondPlaces}
                />
              ) : (
                <PlaceSelector
                  placeInfoArr={places}
                  isSelectUnit={false}
                  firstPlace={firstPlace}
                  secondPlaces={secondPlaces}
                  setSelectedPlace={setSecondPlaces}
                />
              )}
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setPage(0)}>뒤로가기</button>
              <button onClick={onSubmit}>완료</button>
            </ModalFooterNav>
          </>
        )}
      </Layout>
    </>
  );
}
export default RequestStudyPreferenceModal;

const Layout = styled(motion(ModalMd))<{ isBig?: boolean }>`
  height: ${(props) => props.isBig && "var(--height-md)"};
`;

const Subtitle = styled.div`
  color: var(--font-h2);
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const TimeWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  > span {
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    margin-bottom: 8px;
  }
`;

const Error = styled.span`
  font-size: 13px;
  margin-right: 16px;
  color: var(--color-red);
`;
