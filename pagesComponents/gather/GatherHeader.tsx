import { useState } from "react";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import ModalPortal from "../../components/common/ModalPortal";
import Header from "../../components/layout/Header";
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
