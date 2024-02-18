import { useState } from "react";
import RuleIcon from "../../components/common/Icon/RuleIcon";
import Header from "../../components2/Header";
import GatherRuleModal from "../../modals/gather/GatherRuleModal";

function GatherHeader() {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Header title="모임" url="/home">
        <RuleIcon setIsModal={setIsModal} />
      </Header>
      {isModal && <GatherRuleModal setIsModal={setIsModal} />}
    </>
  );
}

export default GatherHeader;
