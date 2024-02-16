import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { GATHER_INTRO_MODAL } from "../../constants/keys/localStorage";
import { checkAndSetLocalStorage } from "../../helpers/storageHelpers";
import GatherIntroModal from "../../modals/gather/GatherIntroModal";
import GatherHeader from "../../pageTemplates/gather/GatherHeader";
import GatherMain from "../../pageTemplates/gather/GatherMain";
import { isGatherAlertState } from "../../recoil/alertAtoms";
import { isGuestState } from "../../recoil/userAtoms";
import { LocationFilterType } from "../../types/system";
import { LocationEn } from "../../types2/serviceTypes/locationTypes";
import { convertLocationLangTo } from "../../utils/convertUtils/convertDatas";

function Gather() {
  const searchParams = useSearchParams();
  const location = convertLocationLangTo(
    searchParams.get("location") as LocationEn,
    "kr"
  );

  const isGuest = useRecoilValue(isGuestState);
  const [category, setCategory] = useState<LocationFilterType>("전체");
  const [isModal, setIsModal] = useState(false);
  const setIsGatherAlert = useSetRecoilState(isGatherAlertState);

  useEffect(() => {
    if (!checkAndSetLocalStorage(GATHER_INTRO_MODAL, 7)) {
      setIsModal(true);
      setIsGatherAlert(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GatherHeader/>
      <GatherReviewSlider />
      <Divider />
      <GatherLocationFilter searchParam={location} />
      <GatherMain />
      {/* <Layout>
        <GatherHeader />
        <ReviewWrapper>
          <GatherReviewNav />
        </ReviewWrapper>
        <NavWrapper>
          <ButtonCheckNav
            buttonList={["전체", ...LOCATION_USE_ALL]}
            selectedButton={category}
            setSelectedButton={setCategory}
          />
        </NavWrapper>
        <GatherMain category={category} />
        {!isGuest && <WritingIcon url="/gather/writing/category" />}
      </Layout> */}
      {isModal && <GatherIntroModal setIsModal={setIsModal} />}
    </>
  );
}

const Layout = styled.div`
  background-color: var(--gray-8);
`;

const ReviewWrapper = styled.div`
  border-bottom: 6px solid var(--gray-7);
`;

const NavWrapper = styled.div`
  padding: var(--gap-3) var(--gap-4);

  background-color: white;
`;

export default Gather;
