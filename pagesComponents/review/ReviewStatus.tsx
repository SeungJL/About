import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../components/common/ModalPortal";
import ProfileIconXsOverwrap from "../../components/common/Profile/ProfileIconXsOverwrap";

import { useUserInfoQuery } from "../../hooks/user/queries";
import NotCompletedModal from "../../modals/system/NotCompletedModal";
const VOTER_SHOW_MAX = 7;
function ReviewStatus({ temp }: { temp?: any }) {
  const data = useUserInfoQuery();
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Layout onClick={() => setIsModal(true)}>
        <Item>
          <FontAwesomeIcon icon={faHeart} size="xl" />
          <span>100</span>
        </Item>
        <Item>
          <FontAwesomeIcon icon={faMessage} size="xl" />
          <span>10</span>
        </Item>
        <Profile>
          <ProfileContainer zIndex={0}>
            <ProfileIconXsOverwrap user={temp} isOverlap={false} />
          </ProfileContainer>
        </Profile>
      </Layout>
      {isModal && (
        <ModalPortal setIsModal={setIsModal}>
          <NotCompletedModal setIsModal={setIsModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  margin: 0 var(--margin-main);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-right: var(--margin-sub);
  > span {
    margin-left: var(--margin-min);
    font-weight: 600;
    font-size: 15px;
  }
`;
const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.div<{ zIndex: number }>`
  width: 23px;
  display: flex;
  align-items: center;
  z-index: ${(props) => props.zIndex};
  position: relative;
  padding-top: 28px;
`;

export default ReviewStatus;
