import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layouts/Header";
import ModalPortal from "../../components/ModalPortal";
import { MainLoading } from "../../components/ui/MainLoading";
import { useUserInfoQuery } from "../../hooks/user/queries";
import FriendRuleModal from "../../modals/friend/FriendRuleModal";
import ProfileCard from "../../modals/friend/ProfileCard";
import FriendRecommend from "../../pagesComponents/friend/FriendRecommend";
import ProfileOverview from "../../pagesComponents/friend/ProfileOverview";
import { userDataState } from "../../recoil/interactionAtoms";

function Friend() {
  const [isRuleModal, setIsRuleModal] = useState(false);
  const { data, isLoading } = useUserInfoQuery();
  return (
    <>
      <Header title="친구">
        <FontAwesomeIcon
          icon={faBalanceScale}
          size="lg"
          onClick={() => setIsRuleModal(true)}
        />
      </Header>
      {isLoading ? (
        <MainLoading />
      ) : (
        <Layout>
          <ProfileOverview user={data} />
          <FriendRecommend />
        </Layout>
      )}
      {isRuleModal && (
        <ModalPortal setIsModal={setIsRuleModal}>
          <FriendRuleModal setIsModal={setIsRuleModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div``;

export default Friend;
