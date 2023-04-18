import { useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import UserInfoModal from "../../modals/user/UserInfoModal";
import { IUser } from "../../types/user";

import ModalPortal from "./ModalPortal";

function UserImageIcon({ user }: { user: IUser }) {
  const toast = useToast();
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const [isUserModal, setIsUserModal] = useState(false);

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
  return (
    <>
      <Layout onClick={onClickImg}>
        <Image
          src={`${user.profileImage}`}
          width={50}
          height={50}
          alt="userProfile"
          unoptimized={true}
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
  border-radius: 17px;
  overflow: hidden;
`;

export default UserImageIcon;
