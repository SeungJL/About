import { faArrowUpFromBracket } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import ModalPortal from "../../../components/common/ModalPortal";
import Header from "../../../components/layout/Header";
import GatherKakaoShareModal from "../../../modals/gather/GatherKakaoShareModal";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { IGatherHeader } from "../../../types/page/gather";

function GatherHeader({ title, date, locationMain }: IGatherHeader) {

  const prevPageUrl = useRecoilValue(prevPageUrlState);

  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Header title="" url={prevPageUrl || "/gather"} isPrev={!!prevPageUrl}>
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          size="lg"
          onClick={() => setIsModal(true)}
        />
      </Header>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <GatherKakaoShareModal
            setIsModal={setIsModal}
            title={title}
            date={date}
            locationMain={locationMain}
          />
        </ModalPortal>
      )}
    </>
  );
}

export default GatherHeader;
