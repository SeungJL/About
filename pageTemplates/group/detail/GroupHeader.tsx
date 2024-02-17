import { faGear, faPenCircle } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import KakaoShareBtn from "../../../components/common/Icon/KakaoShareBtn";
import Header from "../../../components/layout/Header";
import { GROUP_STUDY_ALL } from "../../../constants/keys/queryKeys";
import { WEB_URL } from "../../../constants/system";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import {
  useCompleteToast,
  useFailToast,
} from "../../../hooks/custom/CustomToast";
import { useGroupParticipationMutation } from "../../../hooks/Group/mutations";
import { isGroupEditState } from "../../../recoil/checkAtoms";

import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { sharedGroupWritingState } from "../../../recoil/sharedDataAtoms";

import { userInfoState } from "../../../recoil/userAtoms";
import { IGroup } from "../../../types/page/Group";
import BottomDrawer from "../../profile/BottomDrawer";

interface IGroupHeader {
  Group: IGroup;
}

function GroupHeader({ Group }: IGroupHeader) {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const router = useRouter();

  const title = Group?.title;
  // const date = Group?.date;
  // const locationMain = Group?.location.main;
  const organizer = Group?.organizer;

  const userInfo = useRecoilValue(userInfoState);
  // const setGroupWriting = useSetRecoilState(sharedGroupWritingState);
  const setIsGroupEdit = useSetRecoilState(isGroupEditState);
  const [prevPageUrl, setPrevPageUrl] = useRecoilState(prevPageUrlState);

  const [isModal, setIsModal] = useState(false);

  const [isSettigModal, setIsSettingModal] = useState(false);

  const setGroupWriting = useSetRecoilState(sharedGroupWritingState);

  const resetQueryData = useResetQueryData();

  const onClick = () => {
    setGroupWriting(Group);
    setPrevPageUrl(`${router.asPath}`);

    router.push("/Group/writing/category/main");
  };

  const movePage = async () => {
    completeToast("free", "탈퇴되었습니다.");
    await resetQueryData([GROUP_STUDY_ALL], () => {
      router.push("/Group");
    });
  };

  const { mutate } = useGroupParticipationMutation("delete", Group.id, {
    onSuccess: movePage,
  });

  const handleQuit = () => {
    mutate();
  };

  return (
    <>
      <Header
        title="소모임"
        url={prevPageUrl || "/Group"}
        isPrev={!!prevPageUrl}
      >
        {userInfo?.uid === organizer?.uid && (
          <IconWrapper onClick={onClick}>
            <FontAwesomeIcon icon={faPenCircle} size="xl" />
          </IconWrapper>
        )}
        <Wrapper>
          <KakaoShareBtn
            title={Group.title}
            subtitle={Group.guide}
            url={WEB_URL + `/Group/${Group.id}`}
            img={Group?.image}
            type="gather"
          />
        </Wrapper>
        <IconWrapper onClick={() => setIsSettingModal(true)}>
          <FontAwesomeIcon
            icon={faGear}
            size="lg"
            onClick={() => setIsModal(true)}
          />
        </IconWrapper>
      </Header>

      <BottomDrawer
        type="Group"
        isModal={isSettigModal}
        setIsModal={setIsSettingModal}
        onSubmit={handleQuit}
      />

      {/* {isModal && (
        <GroupKakaoShareModal
          setIsModal={setIsModal}
          title={title}
          date={date}
          locationMain={locationMain}
        />
      )} */}
    </>
  );
}

const Wrapper = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: var(--gap-3);
`;

const IconWrapper = styled.button`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: var(--gap-3);
`;

export default GroupHeader;
