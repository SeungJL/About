import EventBanner from "../../pageTemplates/home/EventBanner";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { getUrlWithLocationAndDate } from "../../helpers/urlHelpers";
import HomeCategoryNav from "../../pageTemplates/home/HomeCategoryNav";
import HomeHeader from "../../pageTemplates/home/homeHeader/HomeHeader";
import HomeInitialSetting from "../../pageTemplates/home/HomeInitialSetting";
import HomeLocationBar from "../../pageTemplates/home/HomeLocationBar";
import HomeStudySection from "../../pageTemplates/home/homeMain/HomeStudySection";
import StudyVoteController from "../../pageTemplates/home/studyVoteController/StudyVoteController";
import HomeWinRecord from "../../pageTemplates/home/WinRecord";
import { LocationEn } from "../../types/serviceTypes/locationTypes";

function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location") as LocationEn;
  const dateParam = searchParams.get("date");

  useEffect(() => {
    if (session?.user && (!locationParam || !dateParam)) {
      const initialUrl = getUrlWithLocationAndDate(
        locationParam,
        dateParam,
        session.user.location
      );
      router.replace(initialUrl);
    }
  }, [session]);

  return (
    <>
      <HomeInitialSetting />
      <HomeHeader />
      <HomeCategoryNav />
      <HomeLocationBar />
      <StudyVoteController />
      <HomeStudySection />
      <EventBanner />
      {/* <HomeGather />
      <HomeReview /> */}
      <HomeWinRecord />
    </>
  );
}

export default Home;
