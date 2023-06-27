import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Header from "../../components/layouts/Header";
import ModalPortal from "../../components/ModalPortal";
import FriendRuleModal from "../../modals/friend2/FriendRuleModal";

function FriendHeader() {
  const [isRuleModal, setIsRuleModal] = useState(false);
  return (
    <>
      <Header title="친구">
        <FontAwesomeIcon
          icon={faBalanceScale}
          size="lg"
          onClick={() => setIsRuleModal(true)}
        />
      </Header>
      {isRuleModal && (
        <ModalPortal setIsModal={setIsRuleModal}>
          <FriendRuleModal setIsModal={setIsRuleModal} />
        </ModalPortal>
      )}
    </>
  );
}

export default FriendHeader;
