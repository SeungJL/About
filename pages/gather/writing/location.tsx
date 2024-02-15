import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import LocationSearch from "../../../components/features/location/LocationSearch";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageSlide from "../../../components/layout/PageSlide";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import RegisterLayout from "../../../pageTemplates/register/RegisterLayout";
import RegisterOverview from "../../../pageTemplates/register/RegisterOverview";
import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";
import { IGatherLocation } from "../../../types/page/gather";

function WritingGahterLocation() {
  const router = useRouter();
  const failToast = useFailToast();

  const [gatherWriting, setGatherWriting] = useRecoilState(
    sharedGatherWritingState
  );
  const [location, setLocation] = useState<IGatherLocation>(
    gatherWriting?.location || { main: "", sub: "" }
  );

  const onClickNext = () => {
    if (!location) {
      failToast("free", "장소를 선택해 주세요!", true);
      return;
    }
    setGatherWriting((old) => ({
      ...old,
      location,
    }));
    router.push(`/gather/writing/condition`);
  };

  return (
    <PageSlide>
      <ProgressStatus value={80} />
      <Header title="" url="/gather/writing/date" />
      <RegisterLayout>
        <RegisterOverview>
          <span>날짜와 장소를 선택해 주세요.</span>
        </RegisterOverview>
        <Location>
          <LocationSearch location={location.main} setLocation={setLocation} />
          <LocationDetailInput
            placeholder="상세 주소"
            value={location.sub}
            onChange={(e) =>
              setLocation((old) => ({ ...old, sub: e.target.value }))
            }
          />
        </Location>

        <BottomNav onClick={() => onClickNext()} />
      </RegisterLayout>
    </PageSlide>
  );
}

const LocationDetailInput = styled.input`
  width: 100%;
  background-color: inherit;
  border-bottom: var(--border);
  padding-top: 0;
  padding-bottom: var(--gap-2);
  padding-left: var(--gap-1);
  outline: none;
  font-size: 13px;
  color: var(--gray-2);
`;

const Location = styled.div`
  margin-top: var(--gap-3);
  background-color: inherit;
`;

export default WritingGahterLocation;
