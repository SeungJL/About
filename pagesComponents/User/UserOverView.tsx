import styled from "styled-components";

import { useUserInfoQuery } from "../../hooks/user/queries";

import { Badge, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { faCamera, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import {
  useApproveMutation,
  useRegisterMutation,
} from "../../hooks/user/mutations";

import { useRecoilValue } from "recoil";
import ModalPortal from "../../components/ModalPortal";
import ChangeProfileImageModal from "../../modals/user/ChangeProfileImageModal";
import { userBadgeState } from "../../recoil/userAtoms";

import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import { useFailToast } from "../../hooks/ui/CustomToast";

export default function UserOverview() {
  const [value, setValue] = useState("");
  const { data: session } = useSession();
  const isGuest = session?.user.name === "guest";
  const inputRef = useRef<HTMLInputElement>(null);
  const showGuestErrorToast = useFailToast();

  const { data: user } = useUserInfoQuery({
    onSuccess(data) {
      setValue(data?.comment);
    },
  });

  // const { mutate: onChangeComment } = useCommentMutation();
  // const { data: comments, isLoading } = useCommentQuery();

  const { mutate, isLoading } = useRegisterMutation({
    onSuccess() {},
    onError(error) {
      console.error(error);
    },
  });

  const { mutate: approve } = useApproveMutation({
    onSuccess() {},
    onError(err) {
      console.error(err);
    },
  });
  const userBadge = useRecoilValue(userBadgeState);
  // const userComment =
  //   !isLoading && comments?.comments.find((att) => att?._id === user?._id);

  const [isProfileModal, setIsProfileModal] = useState(false);

  // useEffect(() => {
  //   if (!isLoading) setValue(userComment?.comment);
  // }, [isLoading, userComment?.comment]);
  const toast = useToast();

  const handleWrite = () => {
    if (isGuest) {
      showGuestErrorToast();
      return;
    }
    const input = inputRef.current;
    input.disabled = false;
    input.focus();
  };

  const onWrite = () => {
    const text = inputRef.current.value;
    setValue(text);
  };

  const handleSubmit = async () => {
    await mutate({ ...user, comment: value });
    await approve({ uid: user?.uid });
  };

  return (
    <>
      <Layout>
        <UserImg>
          <ProfileIcon user={user || session?.user} size="xl" />
          <IconWrapper onClick={() => setIsProfileModal(true)}>
            <FontAwesomeIcon icon={faCamera} color="var(--font-h2)" size="lg" />
          </IconWrapper>
        </UserImg>
        <UserInfo>
          <UserProfile>
            <UserName>{isGuest ? "게스트" : user?.name}</UserName>
            <Badge fontSize={12} colorScheme={userBadge?.color}>
              {userBadge?.badge}
            </Badge>
          </UserProfile>
          <Comment>
            <span>Comment</span>
            <div>
              <Message
                value={!isGuest ? value : "안녕하세요! 잘 부탁드려요~ ㅎㅎ"}
                disabled={true}
                ref={inputRef}
                type="text"
                onBlur={handleSubmit}
                onChange={onWrite}
              />
              <div onClick={handleWrite}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </div>
            </div>
          </Comment>
        </UserInfo>
      </Layout>
      {isProfileModal && (
        <ModalPortal setIsModal={setIsProfileModal}>
          <ChangeProfileImageModal setIsModal={setIsProfileModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  height: 90px;
  padding: 4px 0px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Profile = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 24%;
  overflow: hidden;
`;

const UserImg = styled.div`
  border-radius: 30%;
  position: relative;
`;
const UserInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  justify-content: space-between;
  > div:first-child {
    display: flex;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  > div:last-child {
    margin-bottom: 2px;
  }
`;

const IconWrapper = styled.div`
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -4px;
  bottom: -4px;
  background-color: white;
  border: 1px solid var(--font-h4);
  border-radius: 50%;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-right: 8px;
`;

const Comment = styled.div`
  padding: 2px 0 2px 6px;
  font-size: 12px;
  font-weight: 600;
  flex: 1;
  border: 1px solid var(--font-h5);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;

    display: flex;
    align-items: center;
  }
`;

const Message = styled.input`
  font-weight: 400;
  color: var(--font-h2);
  width: 90%;
  background-color: inherit;
  font-size: 12px;
`;

const LogoutBlock = styled.div`
  width: 60px;
  > button {
    width: 65px;
    height: 22px;
    border-radius: 6px;
    border: 1px solid rgb(0, 0, 0, 0.5);
  }
`;
