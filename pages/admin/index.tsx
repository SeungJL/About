import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/layout/Header";
import { useFailToast } from "../../hooks/CustomToast";
import { userInfoState } from "../../recoil/userAtoms";

function Admin() {
  const router = useRouter();
  const failToast = useFailToast();
  const userInfo = useRecoilValue(userInfoState);
  const role = userInfo?.role;

  const onClick = (url: string, isAccess?: boolean) => {
    if (isAccess !== false) {
      router.push(`/admin/response/${url}`);
      return;
    }
    if (role === "manager") {
      failToast("free", "관리자만 접근 가능합니다.");
      return;
    }
    router.push(`/admin/system/${url}`);
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
                <button onClick={() => onClick(`register`)}>
                  가입신청 확인
                </button>
                <button onClick={() => onClick(`attend`)}>
                  출석 당첨자 확인
                </button>
                <button onClick={() => onClick(`groupGather`)}>
                  조모임 신청 확인
                </button>
                <button onClick={() => onClick(`suggest`)}>
                  건의사항 확인
                </button>
                <button onClick={() => onClick(`rest`)}>휴식신청 확인</button>
                <button onClick={() => onClick(`badge`)}>배지신청 확인</button>
                <button onClick={() => onClick(`promotion`)}>
                  홍보인원 확인
                </button>
                <button onClick={() => onClick(`secede`)}>탈퇴신청 확인</button>
                <button onClick={() => onClick(`absent`)}>당일불참 확인</button>
              </NavBlock>
            </div>
            <div>
              <BlockName>유저 정보</BlockName>
              <NavBlock>
                <button onClick={() => onClick(`userInfo`, false)}>
                  유저 정보 관리
                </button>
                <button>유저 상태 확인</button>
                <button onClick={() => onClick(`pointLog`, false)}>
                  포인트시스템 로그
                </button>
              </NavBlock>
            </div>
            <div>
              <BlockName>스터디 관리</BlockName>
              <NavBlock>
                <button onClick={() => onClick(`studySpace`, false)}>
                  스터디 장소 정보
                </button>
                <button onClick={() => onClick(`studyStatus`, false)}>
                  스터디 상태 변경
                </button>
                <button onClick={() => onClick(`resetStudySpace`, false)}>
                  스터디 초기화 및 업데이트
                </button>
              </NavBlock>
            </div>

            <div>
              <BlockName />
            </div>
          </Navigation>
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

export default Admin;
