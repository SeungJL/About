import { faPenCircle, faShareNodes } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../../components/layout/Header";
import { useFailToast } from "../../../hooks/custom/CustomToast";
import GatherKakaoShareModal from "../../../modals/gather/GatherKakaoShareModal";
import { isGatherEditState } from "../../../recoil/checkAtoms";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { sharedGatherWritingState } from "../../../recoil/sharedDataAtoms";
import { userInfoState } from "../../../recoil/userAtoms";
import { IGather } from "../../../types2/gatherTypes/gatherTypes";

interface IGatherHeader {
  gatherData: IGather;
}

function GatherHeader({ gatherData }: IGatherHeader) {
  const failToast = useFailToast();
  const router = useRouter();

  const title = gatherData?.title;
  const date = gatherData?.date;
  const locationMain = gatherData?.location.main;
  const organizer = gatherData?.user;

  const userInfo = useRecoilValue(userInfoState);
  const setGatherWriting = useSetRecoilState(sharedGatherWritingState);
  const setIsGatherEdit = useSetRecoilState(isGatherEditState);
  const [prevPageUrl, setPrevPageUrl] = useRecoilState(prevPageUrlState);

  const [isModal, setIsModal] = useState(false);

  const onClick = () => {
    setGatherWriting({ ...gatherData, date: dayjs(gatherData.date) });
    setIsGatherEdit(true);
    setPrevPageUrl(`/gather/${router.query.id}`);
    router.push("/gather/writing/category");
  };

  return (
    <>
      <Header title="" url={prevPageUrl || "/gather"} isPrev={!!prevPageUrl}>
        {userInfo?.uid === organizer?.uid && (
          <IconWrapper onClick={onClick}>
            <FontAwesomeIcon icon={faPenCircle} size="xl" />
          </IconWrapper>
        )}
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
  margin-left: var(--gap-3);
`;

export default GatherHeader;
