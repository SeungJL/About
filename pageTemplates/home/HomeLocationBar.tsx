import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Selector from "../../components2/atoms/Selector";
import SectionBar from "../../components2/molecules/bars/SectionBar";
import { ACTIVE_LOCATIONS } from "../../constants2/locationConstants";
import { ActiveLocation } from "../../types/serviceTypes/locationTypes";
import { convertLocationLangTo } from "../../utils/convertUtils/convertDatas";

export default function HomeLocationBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  const locationKr = convertLocationLangTo(
    searchParams.get("location") as ActiveLocation,
    "kr"
  );
  const [location, setLocation] = useState<ActiveLocation>(locationKr);

  useEffect(() => {
    if (locationKr !== location) {
      newSearchParams.set("location", convertLocationLangTo(location, "en"));
      router.replace(`/home?${newSearchParams.toString()}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <SectionBar
      title="카공 스터디"
      rightComponent={
        <Selector
          defaultValue={location}
          options={ACTIVE_LOCATIONS}
          setValue={setLocation}
        />
      }
    />
  );
}
