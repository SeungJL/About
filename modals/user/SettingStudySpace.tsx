import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { ModalFooterNav, ModalMain, ModalMd } from "../../styles/layout/modal";

import { ModalHeaderX } from "../../components/layouts/Modals";

import { useStudyPlaceQuery } from "../../hooks/study/queries";

import PlaceSelector from "../../components/utils/PlaceSelector";
import PlaceSelectorLg from "../../components/utils/PlaceSelectorLg";
import { userLocationState } from "../../recoil/userAtoms";
import { IplaceInfo } from "../../types/statistics";

function SettingStudyModal({
  setIsModal,
  isBig,
}: {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  isBig?: boolean;
}) {
  const [page, setPage] = useState(0);
  const location = useRecoilValue(userLocationState);

  const [errorMessage, setErrorMessage] = useState("");

  const { data } = useStudyPlaceQuery();

  const placeInfoArr = data
    ?.map((place) => place?.location === location && { placeName: place })
    .filter((item) => item);

  const [firstPlace, setFirstPlace] = useState<IplaceInfo[]>([]);
  const [secondPlaces, setSecondPlaces] = useState<IplaceInfo[]>([]);

  const firstSubmit = () => {
    if (firstPlace.length === 0) {
      setErrorMessage("장소를 선택해주세요!");
      return;
    } else setPage(1);
  };

  const onSubmit = async () => {
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
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={true}
                  firstPlace={firstPlace}
                  setSelectedPlace={setFirstPlace}
                />
              ) : (
                <PlaceSelector
                  placeInfoArr={placeInfoArr}
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
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={false}
                  firstPlace={firstPlace}
                  secondPlaces={secondPlaces}
                  setSelectedPlace={setSecondPlaces}
                />
              ) : (
                <PlaceSelector
                  placeInfoArr={placeInfoArr}
                  isSelectUnit={false}
                  firstPlace={firstPlace}
                  secondPlaces={secondPlaces}
                  setSelectedPlace={setSecondPlaces}
                />
              )}
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setPage(0)}>뒤로가기</button>
              <button onClick={() => setPage(2)}>완료</button>
            </ModalFooterNav>
          </>
        )}
      </Layout>
    </>
  );
}
export default SettingStudyModal;

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
