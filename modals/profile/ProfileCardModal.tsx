import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ModalHeaderX } from "../../components/common/modal/ModalComponents";
import { ModalLayout } from "../../components/common/modal/Modals";
import { birthToAge } from "../../helpers/converterHelpers";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { isProfileEditState } from "../../recoil/previousAtoms";
import { ModalMain } from "../../styles/layout/modal";
import { IModal } from "../../types/reactTypes";

function ProfileCardModal({ setIsModal }: IModal) {
  const router = useRouter();
  const { data: user } = useUserInfoQuery();
  const setIsProfileEdit = useSetRecoilState(isProfileEditState);

  const onClickModify = () => {
    setIsProfileEdit(true);
    router.push(`/register/location`);
  };

  return (
    <>
      <ModalLayout size="xl">
        <ModalHeaderX title={user?.name} setIsModal={setIsModal} />
        <ModalMain>
          <Profile>
            <ProfileUpPart>
              <div>
                <span>나이</span>
                <span> {birthToAge(user?.birth)}</span>
              </div>
              <div>
                <span>성별</span>
                <span> {user?.gender}</span>
              </div>
              <div>
                <span>MBTI</span>
                <span> {user?.mbti}</span>
              </div>
              <div>
                <span>지역</span>
                <span> {user?.location}</span>
              </div>
            </ProfileUpPart>
            <ProfileItem>
              <span>전공</span>
              <span>{user?.majors[0].detail}</span>
            </ProfileItem>
            <ProfileItem>
              <span>관심사</span>
              <div>
                <span>1. {user?.interests.first}</span>
                <span>2. {user?.interests.second}</span>
              </div>
            </ProfileItem>
          </Profile>
          <FriendTitle>친구</FriendTitle>
          <FriendList>{/* <ProfileIconMd user={user} /> */}</FriendList>
        </ModalMain>
        <Footer>
          <Button width="50%" onClick={() => onClickModify()}>
            프로필 변경
          </Button>
          <Button
            onClick={() => setIsModal(false)}
            width="50%"
            color="white"
            backgroundColor="var(--color-mint)"
          >
            확인
          </Button>
        </Footer>
      </ModalLayout>
    </>
  );
}

const FriendTitle = styled.span`
  color: var(--font-h3);
`;

const ProfileUpPart = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  > div {
    display: flex;
    > span:first-child {
      color: var(--font-h3);
      width: 64px;
    }
    > span:last-child {
      font-weight: 600;
    }
  }
`;
const Footer = styled.footer``;

const Profile = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  line-height: 2.4;
`;

const ProfileItem = styled.div`
  display: flex;
  > span:first-child {
    display: inline-block;
    width: 64px;
    color: var(--font-h3);
  }
  > span:last-child {
    color: var(--font-h1);
    font-weight: 600;
  }
  > div {
    color: var(--font-h1);
    font-weight: 600;
    > span {
      display: inline-block;
      margin-right: var(--margin-sub);
    }
  }
`;

const FriendList = styled.div`
  margin-top: 6px;
  height: 116px;
  border: 1px solid var(--font-h5);
  border-radius: var(--border-radius-sub);
  padding: 6px 8px;
`;

export default ProfileCardModal;
