import { Portal } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import UserInfoModal from "../../modals/user/UserInfoModal";
import { IUser } from "../../types/user";

import ModalPortal from "../ModalPortal";

function UserImageIcon({ user }: { user: IUser }) {
  const [isUserModal, setIsUserModal] = useState(false);

  return (
    <>
      <Layout onClick={() => setIsUserModal(true)}>
        <Image
          src={`${user.profileImage}`}
          width={50}
          height={50}
          alt="userProfile"
          unoptimized={true}
        />
      </Layout>
      {isUserModal && (
        <ModalPortal closePortal={setIsUserModal}>
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
