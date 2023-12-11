import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import NotCompletedModal from "../../../modals/system/NotCompletedModal";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { ICollectionAlphabet } from "../../../types/user/collections";

interface IuserOverviewPointNav {
  alphabets: ICollectionAlphabet;
  myDeposit: number;
}

function UserOverviewPointNav({ alphabets, myDeposit }: IuserOverviewPointNav) {
  const router = useRouter();

  const [isModal, setIsModal] = useState(false);


  return (
    <>
      <Layout>
        <button onClick={() => router.push("/user/collection")}>
          내 컬렉션
        </button>
        <button onClick={() => router.push("/user/profile")}>
          내 프로필 정보
        </button>
      </Layout>
      {isModal && <NotCompletedModal setIsModal={setIsModal} />}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;

  > button {
    color: var(--font-h1);
    width: 49%;
    border: var(--border-main);
    border-radius: var(--border-radius-sub);
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

export default UserOverviewPointNav;
