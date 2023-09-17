import { SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PlaceSelector from "../../../components/features/selector/PlaceSelector";
import { studyDateStatusState } from "../../../recoil/studyAtoms";
import { ModalFooterNav, ModalMain } from "../../../styles/layout/modal";
import { DispatchNumber } from "../../../types/reactTypes";
import { IPlace, IStudy } from "../../../types/study/study";
import {
  IStudyParticipate,
  IStudyPlaces,
} from "../../../types/study/studyUserAction";

interface IStudyVoteMainModalPlace {
  page: number;
  setPage: DispatchNumber;
  setVoteInfo: React.Dispatch<SetStateAction<IStudyParticipate>>;
  isBig: boolean;
  participations?: IStudy[];
}

export interface IStudyVotePlaces {
  place: IPlace;
  voteCnt: number;
}

function StudyVoteMainModalPlace({
  page,
  setPage,
  setVoteInfo,
  isBig,
  participations,
}: IStudyVoteMainModalPlace) {
  const studyDateStatus = useRecoilValue(studyDateStatusState);

  const [places, setPlaces] = useState<IStudyVotePlaces[]>();
  const [votePlaces, setVotePlaces] = useState<IStudyPlaces>({
    place: undefined,
    subPlace: [],
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const temp: IStudyVotePlaces[] = participations?.map((participation) => ({
      place: participation.place,
      voteCnt: participation.attendences.length,
    }));
    setPlaces(temp);
  }, [participations]);

  useEffect(() => {
    setVoteInfo((old) => ({ ...old, ...votePlaces }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votePlaces]);

  const firstSubmit = () => {
    if (!votePlaces?.place) {
      setErrorMessage("장소를 선택해주세요!");
      return;
    }
    if (studyDateStatus === "today") setPage(2);
    else setPage(1);
  };

  return (
    <>
      <ModalMain>
        <Subtitle>{page === 0 ? "1지망" : "2지망"} 선택</Subtitle>
        {page === 0 ? (
          <PlaceSelector
            places={places}
            votePlaces={votePlaces}
            setVotePlaces={setVotePlaces}
            isMain={true}
            isBig={isBig}
          />
        ) : (
          <PlaceSelector
            places={places}
            votePlaces={votePlaces}
            setVotePlaces={setVotePlaces}
            isMain={false}
            isBig={isBig}
          />
        )}
      </ModalMain>
      <ModalFooterNav>
        {page === 0 ? (
          <>
            <Error>{errorMessage}</Error>
            <button onClick={firstSubmit}>다음</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage(0)}>뒤로가기</button>
            <button onClick={() => setPage(2)}>다음</button>
          </>
        )}
      </ModalFooterNav>
    </>
  );
}

const Error = styled.span`
  font-size: 13px;
  margin-right: 16px;
  color: var(--color-red);
`;
const Subtitle = styled.div`
  color: var(--font-h3);
  font-size: 14px;
  font-weight: 600;
  margin-bottom: var(--margin-md);
`;

export default StudyVoteMainModalPlace;
