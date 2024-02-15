import { useRouter } from "next/router";
import styled from "styled-components";
import { ICollectionAlphabet } from "../../../types/user/collections";

interface IuserOverviewPointNav {
  alphabets: ICollectionAlphabet;
  myDeposit: number;
}

function UserOverviewPointNav({ alphabets, myDeposit }: IuserOverviewPointNav) {
  const router = useRouter();

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
    </>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;

  > button {
    color: var(--gray-1);
    width: 49%;
    border: var(--border);
    border-radius: var(--rounded-lg);
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    > span:last-child {
      font-weight: 600;
      color: var(--gray-1);
    }
  }
`;

export default UserOverviewPointNav;
