import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { useRecoilState, useRecoilValue } from "recoil";
import { createGlobalStyle } from "styled-components";
import { STEPS_CONTENTS } from "../../constants/contents/GuideContents";
import { FAQ_POP_UP, USE_GUIDE } from "../../constants/keys/localStorage";
import { COLOR_SCHEME_BG } from "../../constants/styles";
import { checkAndSetLocalStorage } from "../../helpers/storageHelpers";
import { useUserInfoQuery } from "../../hooks/user/queries";
import FAQPopUp from "../../modals/pop-up/FAQPopUp";
import { isMainLoadingState } from "../../recoil/loadingAtoms";
import { isGuestState, userInfoState } from "../../recoil/userAtoms";
import UserSettingPopUp from "./userSetting/userSettingPopUp";

export default function UserSetting() {
  const isGuest = useRecoilValue(isGuestState);
  const isMainLoading = useRecoilValue(isMainLoadingState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [isGuestPopUp, setIsGuestPopUp] = useState(false);
  const [isGuide, setIsGuide] = useState(false);

  const isPopUpCondition = !isMainLoading && !isGuest;

  const { data: userInfoData } = useUserInfoQuery({
    enabled: isGuest === false,
  });

  useEffect(() => {
    if (isGuest) {
      if (!checkAndSetLocalStorage(USE_GUIDE, 3)) {
        setIsGuide(true);
      }
    }
    if (!userInfoData) return;
    console.log(-dayjs(userInfoData?.registerDate).diff(dayjs(), "day"));
    if (dayjs().diff(dayjs(userInfoData?.registerDate)) <= 7) {
      if (!checkAndSetLocalStorage(USE_GUIDE, 3)) {
        setIsGuide(true);
      }
    } else {
      if (!checkAndSetLocalStorage(USE_GUIDE, 14)) {
        setIsGuide(true);
      }
    }

    if (isGuest === false && !userInfo) {
      setUserInfo(userInfoData);
    }
    if (isGuest && !checkAndSetLocalStorage(FAQ_POP_UP, 2)) {
      setIsGuestPopUp(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGuest, userInfo, userInfoData]);

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

  return (
    <>
      <GlobalStyle />
      <Joyride
        hideCloseButton={true}
        callback={handleJoyrideCallback}
        continuous
        steps={steps}
        run={isGuide}
        showSkipButton
      />
      {isPopUpCondition && <UserSettingPopUp />}
      {isGuestPopUp && <FAQPopUp setIsModal={setIsGuestPopUp} />}
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
        margin-left:var(--margin-md) !important;
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
 background-color:${COLOR_SCHEME_BG["var(--color-mint)"]} !important;
      
    }
    // 기타 스타일 변경사항...
  }
`;
