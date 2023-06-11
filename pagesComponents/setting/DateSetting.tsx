import { useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { VOTER_DATE_END, VOTE_START_HOUR } from "../../constants/study";
import { useVoteQuery } from "../../hooks/vote/queries";
import { getInterestingDate } from "../../libs/utils/dateUtils";
import { arrangeSpace } from "../../libs/utils/studyUtils";

import { voteDateState } from "../../recoil/studyAtoms";
import { isMainLoadingState, locationState } from "../../recoil/systemAtoms";
import { updateStudyState } from "../../recoil/updateAtoms";
import { IParticipation } from "../../types/studyDetails";
import { IUser } from "../../types/user";

function DateSetting({
  setParticipations,
}: {
  setParticipations: React.Dispatch<SetStateAction<IParticipation[]>>;
}) {
  const toast = useToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  console.log(5);
  const [voteDate, setVoteDate] = useRecoilState(voteDateState);
  const setIsMainLoading = useSetRecoilState(isMainLoadingState);

  const location = useRecoilValue(locationState);
  const [isDefaultPrev, setIsDefaultPrev] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [updateStudy, setUpdateStudy] = useRecoilState(updateStudyState);

  const current = dayjs().hour();

  const { refetch } = useVoteQuery(voteDate, location, {
    enabled: voteDate !== null,
    onSuccess(data) {
      console.log(1);
      const temp: IParticipation[] = arrangeSpace(data.participations);
      setParticipations(temp);
      setIsLoading(false);
    },
    onError() {
      toast({
        title: "불러오기 실패",
        description: "투표 정보를 불러오지 못 했어요.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    },
  });

  useEffect(() => {
    if (updateStudy) {
      console.log(2);
      setTimeout(() => {
        refetch();
      }, 1000);
      // setUpdateStudy(false);
    }
  }, [refetch, setUpdateStudy, updateStudy]);


  useEffect(() => {
    if (isGuest) {
      if (dayjs().hour() >= 18) {
        setVoteDate(getInterestingDate());
      } else setVoteDate(dayjs());
      return;
    }
    if (voteDate === null) {
      if (current >= VOTE_START_HOUR && current < VOTER_DATE_END) {
        setIsDefaultPrev(true);
      } else setVoteDate(getInterestingDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest]);

  useVoteQuery(getInterestingDate().subtract(1, "day"), location, {
    enabled: isDefaultPrev && voteDate === null,
    onSuccess(data) {
      if (
        isDefaultPrev &&
        voteDate === null &&
        data?.participations.length !== 0
      ) {
        if (
          data?.participations.some(
            (space) =>
              space?.status === "open" &&
              space?.attendences?.some(
                (who) =>
                  who.firstChoice && (who.user as IUser).uid === session?.uid
              )
          )
        )
          setVoteDate(dayjs());
        else setVoteDate(getInterestingDate());
      }
    },
  });
  return <Layout></Layout>;
}

const Layout = styled.div``;

export default DateSetting;
