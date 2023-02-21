import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import UserBadge from "../../components/icon/UserBadge";
import { getServerSideProps } from "../../pages";

import { isShowMemberInfoState } from "../../recoil/membersAtoms";
import { modalContextState } from "../../recoil/modalAtoms";
import { BaseModal, FullScreen } from "../../styles/LayoutStyles";

const MemberInfoBgModalLayout = styled.div`
  background-color: white;
  border: 2px solid rgb(0, 0, 0, 0.4);
  position: absolute;
  width: 300px;
  height: 380px;
  top: 50%;
  padding: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 10px;
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
  width: 25%;
  border-radius: 20px;
  overflow: hidden;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
  padding-left: 5px;
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
  margin-bottom: 5px;
  > span {
    margin-right: 7px;
  }
`;
const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-bottom: 5px;
  font-size: 0.9em;
  height: 100%;
  > div {
    > span:nth-child(even) {
      margin-right: 10px;
    }
  }
`;

const DownPart = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const FontSm = styled.span`
  font-size: 0.95em;
  color: rgb(0, 0, 0, 0.7);
`;

const UserCommentBox = styled.div`
  border: 1px solid rgb(0, 0, 0, 0.7);
  padding: 2px;
  height: 22%;
`;

const UserComment = styled.div`
  > :first-child {
    font-size: 0.8em;
  }
  border: 1px solid rgb(0, 0, 0, 0.7);
  height: 100%;
  padding: 5px;
  font-size: 0.9em;
`;
const UserAttendSection = styled.div`
  height: 50px;

  display: flex;
  text-align: center;
  border: 1px solid rgb(0, 0, 0, 0.7);
  margin-bottom: 5px;
  > div:nth-child(2) {
    border-left: 1px solid rgb(0, 0, 0, 0.7);
    border-right: 1px solid rgb(0, 0, 0, 0.7);
  }
  > div {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 5px 0;

    > span {
      flex: 1;
      font-size: 0.9em;
      margin-bottom: 4px;
    }
    > span:last-child {
      font-size: 0.85em;
    }
  }
`;
const Detail = styled.div`
  flex: 1;

  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.1);
`;

export default function MemberInfoBgModal() {
  const modalContext = useRecoilValue(modalContextState);
  const userInfo = modalContext.MembersInfoBg.userInfo;
  const setIsShowMemberInfo = useSetRecoilState(isShowMemberInfoState);

  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <MemberInfoBgModalLayout>
        <UpPart>
          <UserImage>
            <img src={session.user.image} />
          </UserImage>
          <UserInfo>
            <UserName>
              <span>이승주</span>
              <UserBadge role="일반회원" />
            </UserName>
            <UserProfile>
              <div>
                <FontSm>나이: </FontSm>
                <span>27</span>
                <FontSm>성별: </FontSm>
                <span>남</span>
                <FontSm>MBTI: </FontSm>
                <span>ENTP</span>
              </div>
              <div>
                <FontSm>가입일: </FontSm>
                <span>2022-02-04</span>
              </div>
            </UserProfile>
          </UserInfo>
        </UpPart>
        <DownPart>
          <UserAttendSection>
            <div>
              <span>참여횟수(1주)</span>
              <span>1</span>
            </div>
            <div>
              <span>참여횟수(한달)</span>
              <span>4</span>
            </div>
            <div>
              <span>점수</span>
              <span>+2</span>
            </div>
          </UserAttendSection>
          <UserCommentBox>
            <UserComment>
              <span>Comment</span>
              <br />
              <span>안녕하세요~ 잘 부탁드립니다 !</span>
            </UserComment>
          </UserCommentBox>
          <UserRelNav>
            <button>Chart</button>
            <button>기록</button>
            <button>친구</button>
          </UserRelNav>
          <Detail>Coming Soon</Detail>
        </DownPart>
      </MemberInfoBgModalLayout>
      <FullScreen onClick={() => setIsShowMemberInfo(false)} />
    </>
  );
}
