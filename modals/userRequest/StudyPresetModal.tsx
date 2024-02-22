import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IFooterOptions, ModalLayout } from "../../components/modals/Modals";
import ImageTileGridLayout, {
  IImageTileData,
} from "../../components2/molecules/layouts/ImageTitleGridLayout";
import { STUDY_PREFERENCE_LOCAL } from "../../constants/keys/queryKeys";
import { useToast, useTypeToast } from "../../hooks/custom/CustomToast";
import { useStudyPreferenceMutation } from "../../hooks/study/mutations";
import {
  useStudyPlacesQuery,
  useStudyPreferenceQuery,
} from "../../hooks/study/queries";
import { usePointSystemMutation } from "../../hooks/user/mutations";
import { IStudyPlaces } from "../../types2/studyTypes/studyVoteTypes";
import { IConfirmContent } from "../common/ConfirmModal";
import ConfirmModal2 from "../common/ConfirmModal2";

function StudyPresetModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const { data: session } = useSession();
  const toast = useToast();
  const typeToast = useTypeToast();
  const [page, setPage] = useState(0);
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const [presetPlaces, setPresetPlaces] = useState<IStudyPlaces>({
    place: undefined,
    subPlace: [],
  });

  const location = session?.user.location;

  const { data: studyPreference } = useStudyPreferenceQuery();

  const { data: studyPlaces } = useStudyPlacesQuery(location, {
    enabled: !!location,
    onSuccess(data) {
      if (data.length === 0) {
        toast("error", "등록 가능한 스터디 장소가 없습니다.");
        onClose();
      }
    },
  });

  const size =
    studyPlaces?.length > 8 ? "xxl" : studyPlaces?.length > 4 ? "xl" : "md";

  useEffect(() => {
    if (!studyPreference) return;
    setPresetPlaces({
      place: studyPreference.place,
      subPlace: studyPreference?.subPlace,
    });
  }, [studyPreference]);

  const { mutate: setStudyPreference } = useStudyPreferenceMutation({
    onSuccess() {
      typeToast("change");
    },
  });

  const { mutate: getPoint } = usePointSystemMutation("point");

  const selectFirst = () => {
    if (!presetPlaces?.place) {
      toast("error", "장소를 선택해 주세요!");
      return;
    }
    setPage(1);
  };

  const onClose = () => {
    newSearchParams.delete("preset");
    const params = newSearchParams.toString();
  
    router.replace(pathname + (params ? `?${newSearchParams.toString()}` : ""));
  };

  const onSubmit = async () => {
    await setStudyPreference(presetPlaces);
    await getPoint({ value: 20, message: "스터디 장소 설정" });
    await localStorage.setItem(
      STUDY_PREFERENCE_LOCAL,
      JSON.stringify(presetPlaces)
    );
    onClose();
  };

  const content: IConfirmContent = {
    title: "선택을 완료하시겠어요?",
    text: `선택한 2지망 개수에 따라 추가 포인트를 얻을 수 있고, 스터디 확정에 유리합니다. (현재 선택한 2지망 수: ${presetPlaces?.subPlace?.length}개)`,
    onClickRight: () => onSubmit(),
  };

  const imageDataArr: IImageTileData[] = studyPlaces?.map((place) => ({
    imageUrl: place.image,
    text: place.brand,
    func: () => {
      if (!presetPlaces?.place) setPresetPlaces({ place: place._id });
      else {
        if (place._id === presetPlaces.place) {
          setPresetPlaces({ place: null, subPlace: [] });
        } else if (presetPlaces?.subPlace?.includes(place._id)) {
          setPresetPlaces((old) => ({
            ...old,
            subPlace: old.subPlace.filter((sub) => sub !== place._id),
          }));
        } else {
          setPresetPlaces((old) => ({
            ...old,
            subPlace: [...(old?.subPlace || []), place._id],
          }));
        }
      }
    },
    id: place._id,
  }));

  const footerOptions: IFooterOptions = {
    main: { text: "변경", func: () => setIsConfirmModal(true) },
    sub: {},
  };

  return (
    <>
      <ModalLayout
        title="스터디 프리셋 설정"
        footerOptions={footerOptions}
        setIsModal={() => onClose()}
      >
        <Box
          h="360px"
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
        >
          {imageDataArr && (
            <ImageTileGridLayout
              imageDataArr={imageDataArr}
              grid={{ row: null, col: 4 }}
              selectedId={[presetPlaces?.place]}
              selectedSubId={presetPlaces?.subPlace}
            />
          )}
        </Box>

        {/* {page === 0 ? (
              <>
                <PlaceSelectorSub
                  places={studyPlaces}
                  votePlaces={presetPlaces}
                  setPresetPlaces={setPresetPlaces}
                  isMain={true}
                />
              </>
            ) : (
              <>
                {/* <PlaceSelector
                  places={studyPlaces}
                  presetPlaces={presetPlaces}
                  setPresetPlaces={setPresetPlaces}
                  isMain={false}
                /> */}

        {/* {page === 0 ? (
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
        )} */}
      </ModalLayout>

      {isConfirmModal && (
        <ConfirmModal2 setIsModal={setIsConfirmModal} content={content} />
      )}
    </>
  );
}

export default StudyPresetModal;
