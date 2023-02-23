import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import UserBadge from "../../components/icon/UserBadge";
import { birthToAge } from "../../libs/utils/membersUtil";
import {
  isShowUserInfoSmState,
  modalContextState,
} from "../../recoil/modalAtoms";

import { BaseModal, FullScreen } from "../../styles/LayoutStyles";

const UserInfoSmLayout = styled(BaseModal)`
  height: 200px;
  overflow: visible;
  display: flex;
  flex-direction: column;
`;

const UpPart = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const UserImage = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  border-radius: 20px;
  overflow: hidden;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
`;
const UserRelNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  > button {
    width: 70px;
    height: 22px;
    border: 1px solid rgb(0, 0, 0, 0.7);
    border-radius: 10px;
    margin-top: 11px;
  }
`;

const UserName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.9em;
  height: 100%;
  text-align: center;
  > div {
    display: flex;
    justify-content: space-between;
    height: 50%;
  }
`;
const DownPart = styled.div`
  height: 55%;
`;

const FontSm = styled.span`
  font-size: 0.95em;
  color: rgb(0, 0, 0, 0.7);
`;

const UserCommentBox = styled.div`
  border: 1px solid rgb(0, 0, 0, 0.7);
  padding: 2px;
  height: 60%;
`;

const UserComment = styled.div`
  > :first-child {
    font-size: 0.8em;
  }
  border: 1px solid rgb(0, 0, 0, 0.7);
  height: 100%;
  padding: 0 3px;
  font-size: 0.9em;
`;

export default function UserInfoSm() {
  const modalContext = useRecoilValue(modalContextState);
  const setIsShowUserInfoSm = useSetRecoilState(isShowUserInfoSmState);
  const user = modalContext.ProfileImg.user;

  return (
    <>
      <UserInfoSmLayout>
        <UpPart>
          <UserImage>
            <img src={user.thumbnailImage} alt={user.name} />
          </UserImage>
          <UserInfo>
            <UserName>
              <span>{user.name}</span>
              <UserBadge role="일반회원" />
            </UserName>
            <UserProfile>
              <div>
                <div>
                  <FontSm>나이: </FontSm>
                  <span>.</span>
                </div>
                <div>
                  <FontSm>성별: </FontSm>
                  <span>.</span>
                </div>
              </div>
              <div>
                <div>
                  <FontSm>MBTI: </FontSm>
                  <span>.</span>
                </div>
              </div>
            </UserProfile>
          </UserInfo>
        </UpPart>
        <DownPart>
          <UserCommentBox>
            <UserComment>
              <span>Comment</span>
              <br />
              <span>안녕하세요~ 잘 부탁드립니다 !</span>
            </UserComment>
          </UserCommentBox>
          <UserRelNav>
            <button>친구 추가</button>
            <button>메세지</button>
          </UserRelNav>
        </DownPart>
      </UserInfoSmLayout>
      <FullScreen onClick={() => setIsShowUserInfoSm(false)} />
    </>
  );
}
