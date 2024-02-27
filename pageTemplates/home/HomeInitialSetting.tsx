import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useSetRecoilState } from "recoil";
import { createGlobalStyle } from "styled-components";
import { STEPS_CONTENTS } from "../../constants/contents/GuideContents";
import { USER_GUIDE } from "../../constants/keys/localStorage";
import { useGroupQuery } from "../../hooks/groupStudy/queries";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { useUserAttendRateQuery } from "../../hooks/user/sub/studyRecord/queries";
import { getStudyDateStatus } from "../../libs/study/date/getStudyDateStatus";
import FAQPopUp from "../../modals/pop-up/FAQPopUp";
import UserSettingPopUp from "../../pageTemplates/setting/userSetting/userSettingPopUp";
import { studyDateStatusState } from "../../recoils/studyRecoils";
import { checkAndSetLocalStorage } from "../../utils/storageUtils";
function HomeInitialSetting() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const isGuest = session?.user.name === "guest";

  const [isGuide, setIsGuide] = useState(false);
  const [isGuestModal, setIsGuestModal] = useState(false);

  const { data: userInfo } = useUserInfoQuery({ enabled: !isGuest });

  const setStudyDateStatus = useSetRecoilState(studyDateStatusState);

  useEffect(() => {
    setStudyDateStatus(getStudyDateStatus(dateParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateParam]);

  useEffect(() => {
    if (isGuest && !checkAndSetLocalStorage(USER_GUIDE, 1)) {
      setIsGuestModal(true);
      setIsGuide(true);
    }
    if (userInfo) {
      if (dayjs().diff(dayjs(userInfo?.registerDate)) <= 7) {
        if (!checkAndSetLocalStorage(USER_GUIDE, 3)) setIsGuide(true);
      } else if (!checkAndSetLocalStorage(USER_GUIDE, 14)) setIsGuide(true);
    }
  }, []);

  useEffect(() => {
    const inappdeny_exec_vanillajs = (callback) => {
      if (document.readyState !== "loading") callback();
      else document.addEventListener("DOMContentLoaded", callback);
    };
    inappdeny_exec_vanillajs(() => {
      const useragt = navigator.userAgent.toLowerCase();
      const target_url = location.href;
      if (useragt.match(/kakaotalk/i)) {
        location.href =
          "kakaotalk://web/openExternal?url=" + encodeURIComponent(target_url);
      }
    });
  }, []);

  const [{ run, steps }, setState] = useState<{
    run: boolean;
    steps?: Step[];
  }>({
    run: false,
    steps: STEPS_CONTENTS,
  });

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }
  };

  useUserAttendRateQuery(
    dayjs().subtract(1, "month").date(0),
    dayjs(),
    false,
    true,
    null
  );
  useGroupQuery();

  return (
    <>
      {userInfo && <UserSettingPopUp cnt={isGuide ? 1 : 0} />}
      {isGuestModal && <FAQPopUp setIsModal={setIsGuestModal} />}
      <GlobalStyle />
      <Joyride
        hideCloseButton={true}
        callback={handleJoyrideCallback}
        continuous
        steps={steps}
        run={isGuide}
        showSkipButton
      />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  background-color:black !important;
  .react-joyride__tooltip{
    height:180px !important;
    padding:16px !important;
 display:flex;
 flex-direction:column;
    >div:nth-child(2){
      margin-top:auto !important;
      display:flex !important;
      align-items:flex-end !important;
    >div:first-child{
      >button{
      font-size:16px !important;
      }

    }
      >button{
        margin-left:var(--gap-2) !important;
      padding:0 !important;
        background-color:inherit !important;
        :focus{
          outline:none;
        }
        >div{
          font-size:15px;
          padding:4px 16px;
        }
      }
    }
  }
  .react-joyride__beacon {
    >span:first-child{
      background-color:var(--color-mint) !important;

    }
    >span:last-child{
    border-color:var(--color-mint) !important;
 background-color:var(--color-mint-light) !important;
      
    }
    // 기타 스타일 변경사항...
  }
`;

export default HomeInitialSetting;
