import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import LocationSearch from "../../../components/features/lib/LocationSearch";
import BottomNav from "../../../components/layout/BottomNav";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import ProgressStatus from "../../../components/templates/ProgressStatus";
import { useFailToast } from "../../../hooks/CustomToast";
import RegisterLayout from "../../../pagesComponents/register/RegisterLayout";
import RegisterOverview from "../../../pagesComponents/register/RegisterOverview";
import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";
import { GatherLocation } from "../../../types/page/gather";

function WritingGahterLocation() {
  const router = useRouter();
  const failToast = useFailToast();

  const [gatherWriting, setGatherWriting] = useRecoilState(
    sharedGatherWritingState
  );
  const [location, setLocation] = useState<GatherLocation>(
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
    <PageLayout>
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
    </PageLayout>
  );
}

const LocationDetailInput = styled.input`
  width: 100%;
  background-color: inherit;
  border-bottom: var(--border-main);
  padding-top: 0;
  padding-bottom: var(--padding-md);
  padding-left: var(--padding-min);
  outline: none;
  font-size: 13px;
  color: var(--font-h2);
`;

const Location = styled.div`
  margin-top: var(--margin-sub);
  background-color: inherit;
`;

export default WritingGahterLocation;
