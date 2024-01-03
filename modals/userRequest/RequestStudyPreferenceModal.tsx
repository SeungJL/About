import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { MainLoading } from "../../components/common/loaders/MainLoading";
import PlaceSelector from "../../components/features/picker/PlaceSelector";
import {
  ModalBody,
  ModalFooterTwo,
  ModalHeader,
  ModalLayout,
} from "../../components/modals/Modals";
import {
  STUDY_PREFERENCE,
  STUDY_PREFERENCE_LOCAL,
} from "../../constants/keys/queryKeys";
import { useResetQueryData } from "../../hooks/custom/CustomHooks";
import { useCompleteToast, useFailToast } from "../../hooks/custom/CustomToast";
import { useStudyPreferenceMutation } from "../../hooks/study/mutations";
import {
  useStudyPlacesQuery,
  useStudyPreferenceQuery,
} from "../../hooks/study/queries";
import { usePointSystemMutation } from "../../hooks/user/mutations";
import { userInfoState } from "../../recoil/userAtoms";
import { IModal } from "../../types/reactTypes";
import { IStudyPlaces } from "../../types/study/study";
import { IConfirmContent } from "../common/ConfirmModal";
import ConfirmModal2 from "../common/ConfirmModal2";

function RequestStudyPreferenceModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();

  const [page, setPage] = useState(0);
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const [votePlaces, setVotePlaces] = useState<IStudyPlaces>({
    place: undefined,
    subPlace: [],
  });

  const resetQueryData = useResetQueryData();

  const { data: studyPreference } = useStudyPreferenceQuery();

  const userInfo = useRecoilValue(userInfoState);
  const location = userInfo?.location;

  //같은 지역의 스터디 장소 호출

  const { data: studyPlaces, isLoading } = useStudyPlacesQuery(location, {
    enabled: !!location,
    onSuccess(data) {
      if (data.length === 0) {
        failToast("free", "등록 가능한 스터디 장소가 없습니다.");
        setIsModal(false);
      }
    },
  });

  const size =
    studyPlaces?.length > 8 ? "xxl" : studyPlaces?.length > 4 ? "xl" : "md";

  useEffect(() => {
    if (!studyPreference) return;

    setVotePlaces({
      place: studyPreference.place,
      subPlace: studyPreference?.subPlace,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studyPreference]);

  const { mutate: setStudyPreference } = useStudyPreferenceMutation({
    onSuccess() {
      resetQueryData([STUDY_PREFERENCE]);
      completeToast("success");
    },
  });

  const { mutate: getPoint } = usePointSystemMutation("point");

  const selectFirst = () => {
    if (!votePlaces?.place) {
      failToast("free", "장소를 선택해주세요!");
      return;
    }
    setPage(1);
  };

  const onSubmit = async () => {
    await setStudyPreference(votePlaces);
    await getPoint({ value: 20, message: "스터디 장소 설정" });
    await localStorage.setItem(
      STUDY_PREFERENCE_LOCAL,
      JSON.stringify(votePlaces)
    );
    await setIsModal(false);
  };

  const content: IConfirmContent = {
    title: "선택을 완료하시겠어요?",
    text: `선택한 2지망 개수에 따라 추가 포인트를 얻을 수 있고, 스터디 확정에 유리합니다. (현재 선택한 2지망 수: ${votePlaces?.subPlace?.length}개)`,
    onClickRight: () => onSubmit(),
  };

  return (
    <>
      {!isLoading ? (
        <ModalLayout onClose={() => setIsModal(false)} size={size}>
          <ModalHeader
            text={`스터디 선호 장소 설정${page === 0 ? "(1지망)" : "(2지망)"}`}
          />
          <ModalBody>
            {page === 0 ? (
              <>
                <PlaceSelector
                  places={studyPlaces}
                  votePlaces={votePlaces}
                  setVotePlaces={setVotePlaces}
                  isMain={true}
                />
              </>
            ) : (
              <>
                <PlaceSelector
                  places={studyPlaces}
                  votePlaces={votePlaces}
                  setVotePlaces={setVotePlaces}
                  isMain={false}
                />
              </>
            )}
          </ModalBody>
          {page === 0 ? (
            <ModalFooterTwo
              leftText="닫기"
              rightText="다음"
              onClickLeft={() => setIsModal(false)}
              onClickRight={selectFirst}
            />
          ) : (
            <ModalFooterTwo
              leftText="이전"
              rightText="완료"
              onClickLeft={() => setPage(0)}
              onClickRight={() => setIsConfirmModal(true)}
            />
          )}
        </ModalLayout>
      ) : (
        <MainLoading />
      )}
      {isConfirmModal && (
        <ConfirmModal2 setIsModal={setIsConfirmModal} content={content} />
      )}
    </>
  );
}

export default RequestStudyPreferenceModal;
