import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { getStudyDateStatus } from "../../libs/study/date/getStudyDateStatus";
import { studyDateStatusState } from "../../recoils/studyRecoils";

function HomeInitialSetting() {
  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");

  const setStudyDateStatus = useSetRecoilState(studyDateStatusState);

  useEffect(() => {
    setStudyDateStatus(getStudyDateStatus(dateParam));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateParam]);

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

  return null;
}

export default HomeInitialSetting;
