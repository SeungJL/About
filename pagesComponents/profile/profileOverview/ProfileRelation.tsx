import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import ModalPortal from "../../../components/modals/ModalPortal";
import { useFailToast } from "../../../hooks/CustomToast";
import ProfileCardModal from "../../../modals/profile/ProfileCardModal";
import NotCompletedModal from "../../../modals/system/NotCompletedModal";
import { IUser } from "../../../types/user/user";

interface IProfileRelation {
  user: IUser;
}

function ProfileRelation({ user }: IProfileRelation) {
  const failGuestToast = useFailToast();

  const { data: session } = useSession();
  const [isFriend, setIsFriend] = useState(false);
  const [isProfileCard, setIsProfileCard] = useState(false);
  const isGuest = session?.user.name === "guest";
  const onClickCard = () => {
    if (isGuest) {
      failGuestToast("guest");
      return;
    }
    setIsProfileCard(true);
  };

  return (
    <>
      <Layout>
        <div>
          <RelationItem>
            <span>친구</span>
            <span>0</span>
          </RelationItem>
          <RelationItem>
            <span>좋아요</span>
            <span>0</span>
          </RelationItem>
          <RelationItem>
            <span>활동</span>
            <span>0</span>
          </RelationItem>
        </div>
        {user && user?.uid !== session?.uid ? (
          <Button
            backgroundColor="var(--color-mint)"
            color="white"
            size="sm"
            onClick={() => setIsFriend(true)}
          >
            친구신청
          </Button>
        ) : (
          <Button onClick={onClickCard} size="sm">
            내 프로필 카드
          </Button>
        )}
      </Layout>
      {isProfileCard && (
        <ModalPortal setIsModal={setIsProfileCard}>
          <ProfileCardModal setIsModal={setIsProfileCard} />
        </ModalPortal>
      )}
      {isFriend && (
        <ModalPortal setIsModal={setIsFriend}>
          <NotCompletedModal setIsModal={setIsFriend} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  margin-top: var(--margin-max);
  align-items: center;
  justify-content: space-between;
  > div:first-child {
    display: flex;
  }
`;

const RelationItem = styled.div`
  width: max-content;
  padding: 0 var(--padding-md);
  text-align: center;
  display: flex;
  flex-direction: column;
  line-height: 2;
  > span:first-child {
    font-size: 11px;
  }
  > span:last-child {
    font-size: 11px;
    font-weight: 600;
  }
`;
export default ProfileRelation;
