import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import PlaceSelectorSub from "../../../components/features/selector/PlaceSelectorSub";
import { useTypeErrorToast } from "../../../hooks/CustomToast";
import { useStudyVoteQuery } from "../../../hooks/study/queries";
import { voteDateState } from "../../../recoil/studyAtoms";
import { SPACE_LOCATION } from "../../../storage/study";
import { IPlace } from "../../../types/study/study";
import { IStudyParticipate } from "../../../types/study/studyUserAction";

interface IStudyVoteSubModalPlace {
  setVoteInfo: React.Dispatch<SetStateAction<IStudyParticipate>>;
}

function StudyVoteSubModalPlace({ setVoteInfo }: IStudyVoteSubModalPlace) {
  const errorToast = useTypeErrorToast();
  const router = useRouter();
  const placeId = router.query.placeId;
  const voteDate = useRecoilValue(voteDateState);
  const location = SPACE_LOCATION[placeId as string];
  const [otherPlaces, setOtherPlaces] = useState<IPlace[]>();
  const [subPlace, setSubPlace] = useState([]);

  useEffect(() => {
    setVoteInfo((old) => ({ ...old, subPlace }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subPlace]);

  useStudyVoteQuery(voteDate, location, {
    onSuccess(data) {
      setOtherPlaces(
        data.participations
          .filter((par) => par.place._id != placeId)
          .map((par) => par.place)
      );
    },
    onError: (e) => errorToast(e, "study"),
  });

  return (
    <Layout>
      <PlaceSelectorSub
        places={otherPlaces}
        selectPlaces={subPlace}
        setSelectPlaces={setSubPlace}
      />
      {location === "안양" && <Comment>Study with us</Comment>}
    </Layout>
  );
}

const Layout = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  flex: 0.4;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 20px;
  font-weight: 600;
  color: var(--font-h2);
`;

export default StudyVoteSubModalPlace;
