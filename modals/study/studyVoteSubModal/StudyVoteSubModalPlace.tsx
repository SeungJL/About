import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PlaceSelectorSub from "../../../components/features/picker/PlaceSelectorSub";
import { useTypeErrorToast } from "../../../hooks/custom/CustomToast";
import { useStudyPlacesQuery } from "../../../hooks/study/queries";
import { PLACE_TO_LOCATION } from "../../../storage/study";
import { DispatchType } from "../../../types/reactTypes";
import { IStudyParticipate } from "../../../types/study/study";
import { IPlace } from "../../../types/study/studyDetail";

interface IStudyVoteSubModalPlace {
  setVoteInfo: DispatchType<IStudyParticipate>;
}

function StudyVoteSubModalPlace({ setVoteInfo }: IStudyVoteSubModalPlace) {
  const errorToast = useTypeErrorToast();
  const router = useRouter();

  const placeId = router.query.placeId;
  const location = PLACE_TO_LOCATION[placeId as string];

  const [otherPlaces, setOtherPlaces] = useState<IPlace[]>();
  const [subPlace, setSubPlace] = useState([]);

  useEffect(() => {
    setVoteInfo((old) => ({ ...old, subPlace }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subPlace]);

  const { data: studyPlaces } = useStudyPlacesQuery(location, {
    onError(err) {
      errorToast(err, "study");
    },
  });

  useEffect(() => {
    if (!studyPlaces) return;
    setOtherPlaces(studyPlaces.filter((place) => place._id != placeId));
  }, [location, placeId, studyPlaces]);

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
