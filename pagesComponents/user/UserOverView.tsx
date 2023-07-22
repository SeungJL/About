import { Badge } from "@chakra-ui/react";
import { faCamera, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import ModalPortal from "../../components/common/ModalPortal";
import ProfileIcon from "../../components/common/Profile/ProfileIcon";
import { USER_BADGES } from "../../constants/convert";
import { getUserBadgeScore } from "../../helpers/userHelpers";
import {
  useCompleteToast,
  useErrorToast,
  useFailToast,
} from "../../hooks/CustomToast";
import {
  useUserApproveMutation,
  useUserRegisterMutation,
} from "../../hooks/user/mutations";
import { useUserInfoQuery } from "../../hooks/user/queries";
import RequestChangeProfileImageModal from "../../modals/userRequest/RequestChangeProfileImageModal/RequestChangeProfileImageModal";
import { isRefetchUserInfoState } from "../../recoil/refetchingAtoms";
import { isGuestState } from "../../recoil/userAtoms";
import { DispatchBoolean } from "../../types/reactTypes";
import { IUserBadge } from "../../types/user/user";

interface IUserOverview {
  setIsLoading: DispatchBoolean;
}

export default function UserOverview({ setIsLoading }: IUserOverview) {
  const completeToast = useCompleteToast();
  const failToast = useFailToast();
  const errorToast = useErrorToast();
  const isGuest = useRecoilValue(isGuestState);

  const [isRefetchUserInfo, setIsRefetchUserInfo] = useRecoilState(
    isRefetchUserInfoState
  );

  const [value, setValue] = useState("");
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [badge, setBadge] = useState<IUserBadge>();

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: user,
    refetch,
    isLoading,
  } = useUserInfoQuery({
    enabled: !isGuest,
    onSuccess(data) {
  
      setValue(data.comment);
      const badge = getUserBadgeScore(data.score).badge;
      setBadge({
        badge,
        color: USER_BADGES[badge],
      });
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (isRefetchUserInfo) {
      setIsRefetchUserInfo(false);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchUserInfo]);

  const { mutate } = useUserRegisterMutation({
    onError: errorToast,
  });

  const { mutate: approve } = useUserApproveMutation({
    onSuccess() {
      completeToast("change");
    },
    onError: errorToast,
  });

  const handleWrite = () => {
    if (isGuest) {
      failToast("guest");
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
    await approve(user?.uid);
  };

  return (
    <>
      {!isLoading && (
        <Layout>
          <UserImg>
            <ProfileIcon user={user || "guest"} size="xl" />
            <IconWrapper onClick={() => setIsProfileModal(true)}>
              <FontAwesomeIcon
                icon={faCamera}
                color="var(--font-h2)"
                size="lg"
              />
            </IconWrapper>
          </UserImg>
          <UserInfo>
            <UserProfile>
              <UserName>{isGuest ? "게스트" : user?.name}</UserName>
              <Badge fontSize={12} colorScheme={badge?.color}>
                {badge?.badge}
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
                <span onClick={handleWrite}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </span>
              </div>
            </Comment>
          </UserInfo>
        </Layout>
      )}
      {isProfileModal && (
        <ModalPortal setIsModal={setIsProfileModal}>
          <RequestChangeProfileImageModal setIsModal={setIsProfileModal} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled.div`
  height: 90px;
  padding: var(--padding-md) 0px;
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-sub);
`;

const UserImg = styled.div`
  position: relative;
`;

const UserInfo = styled.div`
  margin-left: var(--margin-main);
  display: flex;
  flex-direction: column;
  flex: 1;
  > div:first-child {
    display: flex;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--margin-md);
`;

const IconWrapper = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: -4px;
  bottom: -4px;
  background-color: white;
  border: var(--border-main);
  border-radius: 50%;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 18px;
  margin-right: var(--margin-md);
`;

const Comment = styled.div`
  padding: 2px var(--padding-md);
  font-size: 12px;
  font-weight: 600;
  flex: 1;
  border: var(--border-sub);
  border-radius: var(--border-radius-sub);
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    display: flex;
    align-items: center;
  }
`;

const Message = styled.input`
  width: 100%;
  color: var(--font-h2);
  background-color: inherit;
  font-size: 12px;
  margin-right: var(--margin-md);
`;
