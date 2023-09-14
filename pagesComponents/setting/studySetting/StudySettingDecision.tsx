import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { STUDY_VOTE_END_HOUR } from "../../../constants/study";
import { useStudyResultDecideMutation } from "../../../hooks/study/mutations";
import { useStudyStartTimeQuery } from "../../../hooks/study/queries";
import { studyStartTimeState } from "../../../recoil/studyAtoms";
import { IStudy } from "../../../types/study/study";

interface IStudySettingDecision {
  voteDate: Dayjs;
  participations: IStudy[];
}

function StudySettingDecision({
  voteDate,
  participations,
}: IStudySettingDecision) {
  console.log(participations);
  const setStudyStartTime = useSetRecoilState(studyStartTimeState);
  const { mutateAsync: decideSpace } = useStudyResultDecideMutation(
    dayjs().add(1, "day")
  );
  useStudyStartTimeQuery(voteDate, {
    onSuccess(data) {
      console.log(data);
      setStudyStartTime(data);
    },
  });
  useEffect(() => {
    if (participations.length === 0 || participations[0].status !== "pending")
      return;
    if (dayjs().hour() >= STUDY_VOTE_END_HOUR) decideSpace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participations]);
  return <Layout></Layout>;
}

const Layout = styled.div``;

export default StudySettingDecision;
