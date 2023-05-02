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
import Header from "../../components/layouts/Header";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useState } from "react";
import ModalPortal from "../../components/ModalPortal";
import SuggestModal from "../../modals/user/SuggestModal";

import { User } from "../../models/user";

import { Attendence } from "../../models/attendence";
import ApplyRestModal from "../../modals/user/ApplyRestModal";
import { useScoreQuery, useWarningScoreQuery } from "../../hooks/user/queries";
import { useRecoilValue } from "recoil";
import { userBadgeState } from "../../recoil/userAtoms";
import ProfileModifyModal from "../../modals/user/ModifyProfileModal";
import UserOverview from "../../pagesComponents/User/UserOverView";
import { useMutation } from "react-query";
import { IUser, kakaoProfileInfo } from "../../types/user";
import axios, { AxiosError } from "axios";
import DeclarationFormModal from "../../modals/user/DeclarationFormModal";
import ChargeDepositModal from "../../modals/user/ChargeDepositModal";
import ApplyPromotionRewardModal from "../../modals/user/ApplyPromotionRewardModal";

function UserInfo() {
  const router = useRouter();
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState("");

  const isAdmin = session?.role === "previliged";

  const handleOutput = (isOpen) => {
    if (!isOpen) {
      setModalOpen("");
    }
  };
  const { data } = useScoreQuery();
  const { data: warningArr } = useWarningScoreQuery();
  const myWarning = warningArr?.find(
    (who) => who.name === session?.user.name
  )?.score;

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
          <UserOverview />
          <UserScoresNav>
            <button onClick={() => router.push(`/user/${session.uid}/scores`)}>
              <span>보유 포인트</span>
              <span>{data ? data?.point : 0} point</span>
            </button>
            <button onClick={() => router.push(`/user/${session.uid}/warning`)}>
              <span>보유 보증금</span>
              <span>2000 원</span>
            </button>
          </UserScoresNav>
          {/* <AttendChart type="main" /> */}
          <Navigation>
            {isAdmin && (
              <div>
                <BlockName>관리자</BlockName>
                <NavBlock>
                  <button onClick={() => router.push(`/admin`)}>
                    관리자 페이지
                  </button>
                </NavBlock>
              </div>
            )}
            <div>
              <BlockName>신청</BlockName>
              <NavBlock>
                <button onClick={() => setModalOpen("suggest")}>
                  건의하기
                </button>
                <button onClick={() => setModalOpen("declaration")}>
                  불편사항 신고
                </button>
                <button onClick={() => setModalOpen("promotion")}>
                  홍보 리워드 신청
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
                <button onClick={() => setModalOpen("deposit")}>
                  보증금 충전
                </button>
                <button onClick={() => signOut()}>로그아웃</button>
              </NavBlock>
            </div>
            <div>
              <BlockName>기타</BlockName>
              <NavBlock>
                <button onClick={() => router.push(`user/info/policy`)}>
                  서비스 이용 약관
                </button>
                <button onClick={() => router.push(`user/info/privacy`)}>
                  개인정보 처리방침
                </button>
                <button onClick={() => router.push(`user/info/avatar`)}>
                  아바타 아이콘 저작권
                </button>
                <button>회원 탈퇴</button>
              </NavBlock>
            </div>
            <div>
              <BlockName />
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
      {modalOpen === "declaration" && (
        <ModalPortal setIsModal={handleOutput}>
          <DeclarationFormModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "deposit" && (
        <ModalPortal setIsModal={handleOutput}>
          <ChargeDepositModal setIsModal={handleOutput} />
        </ModalPortal>
      )}
      {modalOpen === "promotion" && (
        <ModalPortal setIsModal={handleOutput}>
          <ApplyPromotionRewardModal setIsModal={handleOutput} />
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
  margin-top: 18px;
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
