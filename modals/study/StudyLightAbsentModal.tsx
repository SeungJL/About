import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { POINT_SYSTEM_Deposit } from "../../constants/settingValue/pointSystem";
import {
  useCompleteToast,
  useErrorToast,
} from "../../hooks/custom/CustomToast";
import { useStudyAbsentMutation } from "../../hooks/study/mutations";
import { usePointSystemMutation } from "../../hooks/user/mutations";
import { isRefetchstudyState } from "../../recoil/refetchingAtoms";
import { PLACE_TO_NAME } from "../../storage/study";
import { IModal } from "../../types/reactTypes";
import { IFooterOptions, ModalLayout } from "../Modals";

function StudyLightAbsentModal({ setIsModal }: IModal) {
  const completeToast = useCompleteToast();
  const errorToast = useErrorToast();
  const router = useRouter();
  const voteDate = dayjs(router.query.date as string);

  const placeId = router.query.placeId;
  const isPrivate = PLACE_TO_NAME[placeId as string] === "자유신청";

  const setIsRefetchstudy = useSetRecoilState(isRefetchstudyState);

  const { mutate: getDeposit } = usePointSystemMutation("deposit");
  const { mutate: absentStudy } = useStudyAbsentMutation(voteDate, {
    onSuccess: () => {
      setIsRefetchstudy(true);
      let fee = POINT_SYSTEM_Deposit.STUDY_PRIVATE_ABSENT;
      if (isPrivate) getDeposit(fee);
      completeToast("success");
    },
    onError: errorToast,
  });

  const footerOptions: IFooterOptions = {
    main: {
      text: "불참",
      func: () => absentStudy(null),
      isRedTheme: true,
    },
  };

  return (
    <ModalLayout
      footerOptions={footerOptions}
      title="개인 스터디 불참"
      setIsModal={setIsModal}
    >
      불참하시겠어요? <br />
      {isPrivate && "-100원의 벌금이 발생합니다."}
    </ModalLayout>
  );
}

export default StudyLightAbsentModal;
