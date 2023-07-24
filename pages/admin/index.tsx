import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import { getToday } from "../../helpers/dateHelpers";
import { getInterestingDate } from "../../helpers/studyHelpers";
import { useFailToast } from "../../hooks/CustomToast";
import { useUserRoleQuery } from "../../hooks/user/queries";
import dbConnect from "../../libs/backend/dbConnect";
import { Attendence } from "../../models/attendence";
import { User } from "../../models/user";

function Admin() {
  const router = useRouter();
  const failToast = useFailToast();
  const { data: role } = useUserRoleQuery();

  const onClick = (url: string, isAccess?: boolean) => {
    if (role !== "manager" && isAccess) {
      failToast("free", "이건 안돼 ^ㅡ^");
      return;
    }
    router.push(`/admin/${url}`);
  };

  return (
    <>
      <Layout>
        <Header title="관리자 페이지" />
        <UserLayout>
          <Navigation>
            <div>
              <BlockName>유저 응답</BlockName>
              <NavBlock>
                <button onClick={() => onClick(`checkRegister`)}>
                  가입신청 확인
                </button>
                <button onClick={() => onClick(`checkSuggest`)}>
                  건의사항 확인
                </button>
                <button onClick={() => onClick(`checkRest`)}>
                  휴식신청 확인
                </button>
                <button onClick={() => onClick(`checkPromotion`)}>
                  홍보인원 확인
                </button>
                <button onClick={() => onClick(`checkSecede`)}>
                  탈퇴신청 확인
                </button>
                <button onClick={() => onClick(`checkAbsent`)}>
                  당일불참 확인
                </button>
              </NavBlock>
            </div>
            <div>
              <BlockName>유저 정보</BlockName>
              <NavBlock>
                <button onClick={() => onClick(`userControl`, true)}>
                  유저 정보 관리
                </button>
                <button>유저 상태 확인</button>
                <button onClick={() => onClick(`pointSystemLog`, true)}>
                  포인트시스템 로그
                </button>
              </NavBlock>
            </div>
            <div>
              <BlockName>스터디 관리</BlockName>
              <NavBlock>
                <button onClick={() => onClick(`studySpaceControl`, true)}>
                  스터디 장소 정보
                </button>
                <button onClick={() => onClick(`studyControl`, true)}>
                  스터디 상태 변경
                </button>
              </NavBlock>
            </div>
            {/* <div>
              <BlockName>게시글 작성</BlockName>
              <NavBlock>
                <button>공지사항</button>
                <button>Plaza</button>
              </NavBlock>
            </div> */}
            <div>
              <BlockName />
            </div>
          </Navigation>
          {/* <UserNavigation /> */}
        </UserLayout>
      </Layout>
    </>
  );
}

const Layout = styled.div``;

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
  padding: 0px 0;
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
export default Admin;
