import { useEffect, useState } from "react";
import styled from "styled-components";

import { useUserLocationQuery } from "../../../hooks/user/queries";
import RequestBirthModal from "../../../modals/userRequest/RequestBirthModal";
import RequestChargeDepositModal from "../../../modals/userRequest/RequestChargeDepositModal";
import RequestLogoutModal from "../../../modals/userRequest/RequestLogoutModal";
import RequestRestModal from "../../../modals/userRequest/RequestRestModal/RequestRestModal";
import RequestSecedeModal from "../../../modals/userRequest/RequestSecedeModal";
import SettingStudySpace from "../../../modals/userRequest/RequestStudyPreferenceModal";
import RequestSuggestModal from "../../../modals/userRequest/RequestSuggestModal";
import { UserOverviewModal } from "./UserNavigation";

interface IUserNavigationModals {
  modalOpen: UserOverviewModal;
  setModalOpen: React.Dispatch<UserOverviewModal>;
}

function UserNavigationModals({
  modalOpen,
  setModalOpen,
}: IUserNavigationModals) {
  const [isModal, setIsModal] = useState<boolean>();

  const { data: location } = useUserLocationQuery();

  useEffect(() => {
    if (modalOpen) setIsModal(true);
    if (isModal === false) setModalOpen(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen, isModal]);

  return (
    <Layout>
      {modalOpen === "suggest" && (
        <RequestSuggestModal type="suggest" setIsModal={setIsModal} />
      )}
      {modalOpen === "rest" && <RequestRestModal setIsModal={setIsModal} />}
      {modalOpen === "declaration" && (
        <RequestSuggestModal type="declare" setIsModal={setIsModal} />
      )}
      {modalOpen === "deposit" && (
        <RequestChargeDepositModal setIsModal={setIsModal} />
      )}

      {modalOpen === "secede" && <RequestSecedeModal setIsModal={setIsModal} />}
      {modalOpen === "spaceSetting" && (
        <SettingStudySpace setIsModal={setIsModal} />
      )}
      {modalOpen === "birthday" && (
        <RequestBirthModal setIsModal={setIsModal} />
      )}
      <RequestLogoutModal
        isModal={modalOpen === "logout"}
        setIsModal={setIsModal}
      />
    </Layout>
  );
}

const Layout = styled.div``;

export default UserNavigationModals;
