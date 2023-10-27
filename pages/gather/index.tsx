import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
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
import { isGuestState } from "../../recoil/userAtoms";
import { LocationFilterType } from "../../types/system";

function Gather() {
  const isGuest = useRecoilValue(isGuestState);
  const [category, setCategory] = useState<LocationFilterType>("전체");
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (!checkAndSetLocalStorage(GATHER_INTRO_MODAL, 7)) {
      setIsModal(true);
    }
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

const Layout = styled.div``;

const ReviewWrapper = styled.div`
  border-top: 4px solid var(--font-h56);
  border-bottom: 4px solid var(--font-h56);
`;

const NavWrapper = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-sub) 0;
`;

export default Gather;
