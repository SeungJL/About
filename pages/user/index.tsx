import styled from "styled-components";

import {
  Text,
  Container,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Image,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import { getToday, getInterestingDate } from "../../libs/utils/dateUtils";
import dbConnect from "../../libs/dbConnect";

import AttendChart from "../../components/utils/AttendChart";
import Header from "../../components/common/Header";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalPortal from "../../components/ModalPortal";
import SuggestModal from "../../modals/user/SuggestModal";

import { User } from "../../models/user";

import UserOverView from "../../pagesComponents/User/UserOverView";
import { Attendence } from "../../models/attendence";
import ApplyRestModal from "../../modals/user/ApplyRestModal";
import { useScoreQuery } from "../../hooks/user/queries";
import { useRecoilValue } from "recoil";
import { userBadgeState } from "../../recoil/userAtoms";
import ProfileModifyModal from "../../modals/user/ModifyProfileModal";

function UserInfo() {
  const router = useRouter();
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState("");

  const handleOutput = (isOpen) => {
    if (!isOpen) {
      setModalOpen("");
    }
  };
  const { data } = useScoreQuery();

  return (
    <>
      <Layout
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3 }}
      >
        <Header title="마이페이지" />
        <UserLayout>
          <UserOverView />
          <UserScoresNav>
            <button onClick={() => router.push(`/user/${session.uid}/scores`)}>
              <span>내 점수</span>
              <span>{data ? data?.point : 0} 점</span>
            </button>
            <button>
              <span>수집한 배지</span>
              <span>0 개</span>
            </button>
          </UserScoresNav>
          <AttendChart type="main" />
          <Navigation>
            <div>
              <BlockName>신청</BlockName>
              <NavBlock>
                <button onClick={() => setModalOpen("suggest")}>
                  건의하기
                </button>
                <button onClick={() => setModalOpen("rest")}>휴식 신청</button>
              </NavBlock>
            </div>
            <div>
              <BlockName>정보 변경</BlockName>
              <NavBlock>
                <button onClick={() => setModalOpen("modify")}>
                  프로필 수정
                </button>
                <button>친구 초대 설정</button>
                <button>카카오 알림 설정</button>
                <button onClick={() => signOut()}>로그아웃</button>
              </NavBlock>
            </div>
            <div>
              <BlockName>기타</BlockName>
              <NavBlock>
                <button>서비스 이용 약관</button>
                <button>개인정보 처리방침</button>
                <button>회원 탈퇴</button>
              </NavBlock>
            </div>
          </Navigation>
          {/* <UserNavigation /> */}
        </UserLayout>
      </Layout>
      {modalOpen === "suggest" && (
        <ModalPortal setIsModal={handleOutput}>
          <SuggestModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "modify" && (
        <ModalPortal setIsModal={handleOutput}>
          <ProfileModifyModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "rest" && (
        <ModalPortal setIsModal={handleOutput}>
          <ApplyRestModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
    </>
  );
}

const Layout = styled(motion.div)``;

const UserLayout = styled.div`
  margin-top: 8px;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

const UserScoresNav = styled.nav`
  margin-top: 2px;
  display: flex;
  justify-content: space-between;
  height: 30px;
  margin-bottom: 12px;
  > button {
    color: var(--font-h3);
    width: 49%;
    border: 1px solid var(--font-h4);
    border-radius: 3px;
    display: flex;

    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    > span:last-child {
      font-weight: 600;
      color: var(--font-h1);
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--font-h5);
  border-radius: 6px;
  overflow: hidden;
  padding: 6px 0;
`;

const BlockName = styled.div`
  padding-bottom: 3px;
  background-color: var(--font-h6);
  font-weight: 600;
  font-size: 12px;
  height: 24px;
  display: flex;
  align-items: end;
  color: var(--font-h2);
  padding-left: 6px;
`;

const NavBlock = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--font-h8);
  padding-left: 6px;
  > button {
    text-align: start;
    height: 42px;
    font-size: 13px;
    border-bottom: 1.5px solid var(--font-h6);
  }
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  await dbConnect();

  const user = await User.findOne({ uid: session.uid });
  const attendences = await Attendence.find({
    date: {
      $gte: getToday().add(-4, "week").toDate(),
      $lte: getInterestingDate().add(-1, "day").toDate(),
    },
    "participants.user": user._id,
  }).populate("participants.user");

  return {
    props: {
      user: JSON.stringify(user),
      attendences: JSON.stringify(attendences),
    },
  };
};
export default UserInfo;
