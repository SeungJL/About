import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import styled from "styled-components";

import UserInfoModal from "../../../modals/user/UserInfoModal";
import { AVATAR_COLOR, AVATAR_ICON } from "../../../storage/Avatar";
import { IUser } from "../../../types/user";

import ModalPortal from "../../ModalPortal";

function ProfileIconMd({
  user,
  isCircle,
}: {
  user: IUser;
  isCircle?: boolean;
}) {
  const toast = useToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const [isUserModal, setIsUserModal] = useState(false);
  const avatarType = user?.avatar?.type;
  const avatarBg = user?.avatar?.bg;
  const onClickImg = () => {
    if (isGuest) {
      toast({
        title: "버튼 동작 실패",
        description: "개인 정보 보호를 위해 게스트에게는 허용되지 않습니다.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    setIsUserModal(true);
  };

  const onError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      "https://user-images.githubusercontent.com/84257439/235454314-22c679dc-e8ff-4ef9-b403-456d752b8589.png";
  };
  const isAvatar =
    avatarType !== null &&
    avatarType !== undefined &&
    avatarBg !== null &&
    avatarBg !== undefined;
  return (
    <>
      <Layout
        onClick={onClickImg}
        style={{
          background: avatarBg !== null && AVATAR_COLOR[avatarBg],
          borderRadius: isCircle ? "50%" : "28%",
        }}
      >
        <Image
          src={
            isAvatar ? `${AVATAR_ICON[avatarType]}` : `${user?.profileImage}`
          }
          width={isAvatar ? 40 : 50}
          height={isAvatar ? 40 : 50}
          alt="userProfile"
          unoptimized={true}
          onError={onError}
        />
      </Layout>
      {isUserModal && (
        <ModalPortal setIsModal={setIsUserModal}>
          <UserInfoModal user={user} setIsModal={setIsUserModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;

  overflow: hidden;
  width: 50px;
  height: 50px;
`;

export default ProfileIconMd;
