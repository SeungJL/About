import { faArrowUpFromBracket } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../../components/layout/Header";
import ModalPortal from "../../../components/modals/ModalPortal";
import GatherKakaoShareModal from "../../../modals/gather/GatherKakaoShareModal";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { IGather } from "../../../types/page/gather";

interface IGatherHeader {
  gatherData: IGather;
}

function GatherHeader({ gatherData }: IGatherHeader) {
  const router = useRouter();

  const title = gatherData?.title;
  const date = gatherData?.date;
  const locationMain = gatherData?.location.main;

  const [prevPageUrl, setPrevPageUrl] = useRecoilState(prevPageUrlState);

  const [isModal, setIsModal] = useState(false);

  const onClick = () => {
    setPrevPageUrl(`/gather/${router.query.id}`);
    router.push("/gather/writing/category");
  };

  return (
    <>
      <Header title="" url={prevPageUrl || "/gather"} isPrev={!!prevPageUrl}>
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          size="lg"
          onClick={() => setIsModal(true)}
        />
        {/* <SettingWrapper onClick={onClick}>
          <FontAwesomeIcon icon={faPenCircle} size="xl" />
        </SettingWrapper> */}
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

const SettingWrapper = styled.div``;

export default GatherHeader;
