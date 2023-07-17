import { SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SpaceSelector2 from "../../../components/utils/PlaceSelector";
import { studyDateState } from "../../../recoil/studyAtoms";
import { ModalFooterNav, ModalMain } from "../../../styles/layout/modal";
import { DispatchNumber } from "../../../types/reactTypes";
import {
  IParticipation,
  IPlace,
  IVoteInfo,
  IVotePlaces,
} from "../../../types/studyDetails";

interface IStudyVoteMainModalPlace {
  page: number;
  setPage: DispatchNumber;
  setVoteInfo: React.Dispatch<SetStateAction<IVoteInfo>>;
  isBig: boolean;
  participations?: IParticipation[];
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
  const studyDate = useRecoilValue(studyDateState);

  const [places, setPlaces] = useState<IStudyVotePlaces[]>();
  const [votePlaces, setVotePlaces] = useState<IVotePlaces>({
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
    if (studyDate === "today") setPage(2);
    else setPage(1);
  };

  return (
    <>
      <ModalMain>
        <Subtitle>{page === 0 ? "1지망" : "2지망"} 선택</Subtitle>
        {page === 0 ? (
          <SpaceSelector2
            places={places}
            votePlaces={votePlaces}
            setVotePlaces={setVotePlaces}
            isMain={true}
            isBig={isBig}
          />
        ) : (
          <SpaceSelector2
            places={places}
            votePlaces={votePlaces}
            setVotePlaces={setVotePlaces}
            isMain={false}
            isBig={isBig}
          />
        )}
      </ModalMain>

      {page === 0 ? (
        <ModalFooterNav>
          <Error>{errorMessage}</Error>
          <button onClick={firstSubmit}>다음</button>
        </ModalFooterNav>
      ) : (
        <ModalFooterNav>
          <button onClick={() => setPage(0)}>뒤로가기</button>
          <button onClick={() => setPage(2)}>다음</button>
        </ModalFooterNav>
      )}
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
