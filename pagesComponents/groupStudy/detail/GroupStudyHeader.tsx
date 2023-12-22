import {
  faGear,
  faPenCircle,
  faShareNodes,
} from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Header from "../../../components/layout/Header";
import { GROUP_STUDY_ALL } from "../../../constants/keys/queryKeys";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import { useGroupStudyParticipationMutation } from "../../../hooks/groupStudy/mutations";
import { isGroupStudyEditState } from "../../../recoil/checkAtoms";

import { prevPageUrlState } from "../../../recoil/previousAtoms";

import { userInfoState } from "../../../recoil/userAtoms";
import { IGroupStudy } from "../../../types/page/groupStudy";
import BottomDrawer from "../../profile/BottomDrawer";

interface IGroupStudyHeader {
  groupStudy: IGroupStudy;
}

function GroupStudyHeader({ groupStudy }: IGroupStudyHeader) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const router = useRouter();

  const title = groupStudy?.title;
  // const date = groupStudy?.date;
  // const locationMain = groupStudy?.location.main;
  const organizer = groupStudy?.organizer;

  const userInfo = useRecoilValue(userInfoState);
  // const setGroupStudyWriting = useSetRecoilState(sharedGroupStudyWritingState);
  const setIsGroupStudyEdit = useSetRecoilState(isGroupStudyEditState);
  const [prevPageUrl, setPrevPageUrl] = useRecoilState(prevPageUrlState);

  const [isModal, setIsModal] = useState(false);

  const [isSettigModal, setIsSettingModal] = useState(false);

  const resetQueryData = useResetQueryData();

  const onClick = () => {
    // setGroupStudyWriting({
    //   ...groupStudy,
    //   // date: dayjs(groupStudy.date),
    // });
    setIsGroupStudyEdit(true);
    setPrevPageUrl(`/groupStudy/${router.query.id}`);

    router.push("/groupStudy/writing/category");
  };

  const { mutate } = useGroupStudyParticipationMutation(
    "delete",
    groupStudy.id,
    {
      onSuccess() {
        completeToast("free", "탈퇴되었습니다.");
        resetQueryData[GROUP_STUDY_ALL];
        setTimeout(() => {
          router.push("/groupStudy");
        }, 200);
      },
    }
  );

  const handleQuit = () => {
    mutate();
  };

  return (
    <>
      <Header
        title="소모임"
        url={prevPageUrl || "/groupStudy"}
        isPrev={!!prevPageUrl}
      >
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
        <IconWrapper onClick={() => setIsSettingModal(true)}>
          <FontAwesomeIcon
            icon={faGear}
            size="lg"
            onClick={() => setIsModal(true)}
          />
        </IconWrapper>
      </Header>

      <BottomDrawer
        type="groupStudy"
        isModal={isSettigModal}
        setIsModal={setIsSettingModal}
        onSubmit={handleQuit}
      />

      {/* {isModal && (
        <GroupStudyKakaoShareModal
          setIsModal={setIsModal}
          title={title}
          date={date}
          locationMain={locationMain}
        />
      )} */}
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

export default GroupStudyHeader;
