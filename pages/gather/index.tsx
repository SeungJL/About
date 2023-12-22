import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import WritingIcon from "../../components/common/Icon/WritingIcon";
import ButtonCheckNav from "../../components/templates/ButtonCheckNav";
import { GATHER_INTRO_MODAL } from "../../constants/keys/localStorage";
import { LOCATION_USE_ALL } from "../../constants/location";
import { checkAndSetLocalStorage } from "../../helpers/storageHelpers";
import GatherIntroModal from "../../modals/gather/GatherIntroModal";
import GatherHeader from "../../pagesComponents/gather/GatherHeader";
import GatherMain from "../../pagesComponents/gather/GatherMain";
import GatherReviewNav from "../../pagesComponents/gather/GatherReviewNav";
import { isGatherAlertState } from "../../recoil/alertAtoms";
import { isGuestState } from "../../recoil/userAtoms";
import { LocationFilterType } from "../../types/system";

function Gather() {
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
      <Layout>
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
      </Layout>
      {isModal && <GatherIntroModal setIsModal={setIsModal} />}
    </>
  );
}

const Layout = styled.div`
  background-color: var(--font-h8);
`;

const ReviewWrapper = styled.div`
  border-bottom: 6px solid var(--font-h56);
`;

const NavWrapper = styled.div`
  padding: var(--padding-sub) var(--padding-main);

  background-color: white;
`;

export default Gather;
