import { useState } from "react";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import Header from "../../components/layouts/Header";
import ModalPortal from "../../components/ModalPortal";
import GatherRuleModal from "../../modals/gather/GatherRuleModal";

function GatherHeader() {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Header title="모임">
        <RuleIcon setIsModal={setIsModal} />
      </Header>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <GatherRuleModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

export default GatherHeader;
