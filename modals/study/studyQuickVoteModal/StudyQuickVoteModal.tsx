import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../../components/common/modal/Modals";
import TimeSelector from "../../../components/utils/TimeSelector";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../../hooks/CustomToast";
import { useStudyQuickVoteMutation } from "../../../hooks/study/mutations";
import { isRefetchStudyState } from "../../../recoil/refetchingAtoms";
import { voteDateState } from "../../../recoil/studyAtoms";
import { ModalMain } from "../../../styles/layout/modal";
import { IModal } from "../../../types/reactTypes";
import { IStudyPlaces } from "../../../types/study/studyUserAction";
import { ITimeStartToEnd } from "../../../types/timeAndDate";
import StudyQuickVoteModalRegister from "./StudyQuickVoteModalRegister";

interface IStudyQuickVoteModal extends IModal {
  data: IStudyPreferencesQuery;
}

export interface IStudyPreferencesQuery {
  _id: string;
  studyPreference: IStudyPlaces;
}

function StudyQuickVoteModal({ setIsModal, data }: IStudyQuickVoteModal) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const voteDate = useRecoilValue(voteDateState);

  const setIsRefetchStudy = useSetRecoilState(isRefetchStudyState);

  const [time, setTime] = useState<ITimeStartToEnd>({
    start: { hours: 14, minutes: 0 },
    end: { hours: 18, minutes: 0 },
  });

  const { mutate } = useStudyQuickVoteMutation(voteDate, {
    onSuccess() {
      setIsRefetchStudy(true);
      completeToast("studyVote");
    },
    onError: errorToast,
  });

  const onSubmit = () => {
    const start = voteDate.hour(time.start.hours).minute(time.start.minutes);
    const end = voteDate.hour(time.end.hours).minute(time.end.minutes);
    if (start > end) {
      failToast("time");
      return;
    }
    mutate({ start, end });
    setIsModal(false);
  };

  return (
    <>
      {data && data.studyPreference ? (
        <ModalLayout size="lg">
          <ModalHeaderX
            title={`${voteDate?.format("M월 D일")} 스터디 투표`}
            setIsModal={setIsModal}
          />
          <ModalMain>
            <Container>
              <PlaceInfo>
                <div>
                  <b>1 지망:</b> {data.studyPreference.place.branch}
                </div>
                <div>
                  <b>2 지망:</b>
                  <Subplaces>
                    {data?.studyPreference.subPlace?.map((item) => (
                      <span key={item._id}>{item.branch}</span>
                    ))}
                  </Subplaces>
                </div>
              </PlaceInfo>
            </Container>
            <TimeSelector
              setTimes={({ start, end }: ITimeStartToEnd) => {
                if (start) setTime({ end: time.end, start });
                if (end) setTime({ start: time.start, end });
              }}
              times={time}
            />
          </ModalMain>
          <Button colorScheme="mintTheme" onClick={onSubmit}>
            제출
          </Button>
        </ModalLayout>
      ) : (
        data && <StudyQuickVoteModalRegister setIsModal={setIsModal} />
      )}
    </>
  );
}

const Subplaces = styled.div`
  flex: 1;
  > span {
    margin-right: var(--margin-min);
  }
`;

const Container = styled.div`
  line-height: 2;
  font-size: 14px;
  > div {
    > div {
      > b {
        display: inline-block;
        width: 44px;
        margin-right: var(--margin-md);
      }
    }
  }
`;

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
  }
`;

export default StudyQuickVoteModal;
