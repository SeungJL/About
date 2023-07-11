import { Button } from "@chakra-ui/react";
import { SetStateAction, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import ModalPortal from "../../components/ModalPortal";
import TimeSelector from "../../components/utils/TimeSelector";
import { useStudyQuickVoteMutation } from "../../hooks/study/mutations";
import { useCompleteToast, useFailToast } from "../../hooks/ui/CustomToast";
import { isRefetchStudyState } from "../../recoil/refetchingAtoms";
import { voteDateState } from "../../recoil/studyAtoms";
import { userLocationState } from "../../recoil/userAtoms";
import {
  ModalFooterNav,
  ModalLgLight,
  ModalMain,
  ModalMd,
  ModalSubtitle,
} from "../../styles/layout/modal";
import { IStudyPlaces } from "../../types/study";
import { ITimeStartToEndHM } from "../../types/utils";
import RequestStudyPreferenceModal from "../userRequest/RequestStudyPreferenceModal";

interface IStudyQuickVoteModal {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  data: IStudyPreferencesQuery;
}

export interface IStudyPreferencesQuery {
  _id: string;
  studyPreference: IStudyPlaces;
}

function StudyQuickVoteModal({ setIsModal, data }: IStudyQuickVoteModal) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const voteDate = useRecoilValue(voteDateState);
  const location = useRecoilValue(userLocationState);
  const setIsRefetchStudy = useSetRecoilState(isRefetchStudyState);

  const [isPreference, setIsPreference] = useState(false);
  const [time, setTime] = useState<ITimeStartToEndHM>({
    start: { hours: 14, minutes: 0 },
    end: { hours: 18, minutes: 0 },
  });
  const { mutate } = useStudyQuickVoteMutation(voteDate, {
    onSuccess() {
      completeToast("studyVote");
      setIsRefetchStudy(true);
    },
  });

  const onSubmit = () => {
    const start = voteDate.hour(time.start.hours).minute(time.start.minutes);
    const end = voteDate.hour(time.end.hours).minute(time.end.minutes);

    if (start > end) {
      failToast("studyVote", "beforeTime");
      return;
    }
    mutate({ start, end });
    setIsModal(false);
  };

  return (
    <>
      {data && data?.studyPreference ? (
        <Layout>
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
              setTimes={({ start, end }: ITimeStartToEndHM) => {
                if (start) {
                  setTime({ end: time.end, start });
                }
                if (end) {
                  setTime({ start: time.start, end });
                }
              }}
              times={time}
            />
          </ModalMain>
          <Button colorScheme="mintTheme" onClick={onSubmit}>
            제출
          </Button>
        </Layout>
      ) : (
        data && (
          <NoPreferenceLayout>
            <ModalHeaderX title="스터디 빠른 투표" setIsModal={setIsModal} />
            <ModalMain>
              <ModalSubtitle>
                등록된 스터디 선호 장소가 없어요. 3초만 투자하시면 다음부터는
                원터치로 원하는 장소에 투표할 수 있어요!
              </ModalSubtitle>
            </ModalMain>
            <ModalFooterNav>
              <button onClick={() => setIsModal(false)}>닫기</button>
              <button onClick={() => setIsPreference(true)}>등록하기</button>
            </ModalFooterNav>
          </NoPreferenceLayout>
        )
      )}
      {isPreference && (
        <ModalPortal setIsModal={setIsPreference}>
          <RequestStudyPreferenceModal
            setIsModal={setIsModal}
            isBig={location === "수원"}
          />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled(ModalLgLight)`
  height: 300px;
`;

const Subplaces = styled.div`
  flex: 1;
  > span {
    margin-right: 4px;
  }
`;

const NoPreferenceLayout = styled(ModalMd)``;

const Container = styled.div`
  line-height: 2;
  font-size: 14px;

  > div {
    > div {
      > b {
        display: inline-block;
        width: 44px;
        margin-right: 8px;
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
