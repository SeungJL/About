import { faPenCircle, faShareNodes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../../components/layout/Header";
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
        <IconWrapper onClick={onClick}>
          <FontAwesomeIcon icon={faPenCircle} size="xl" />
        </IconWrapper>
        <IconWrapper>
          <FontAwesomeIcon
            icon={faShareNodes}
            size="lg"
            onClick={() => setIsModal(true)}
          />
        </IconWrapper>
      </Header>
      {isModal && (
        <GatherKakaoShareModal
          setIsModal={setIsModal}
          title={title}
          date={date}
          locationMain={locationMain}
        />
      )}
    </>
  );
}

const IconWrapper = styled.button`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: var(--margin-sub);
`;

export default GatherHeader;
