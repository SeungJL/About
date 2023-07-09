import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  useDepositQuery,
  usePointQuery,
} from "../../hooks/user/pointSystem/queries";

function UserScoreBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user?.name === "guest";
  const { data: myPoint } = usePointQuery({ enabled: !isGuest });
  const { data: myDeposit } = useDepositQuery({ enabled: !isGuest });

  return (
    <Layout>
      <button onClick={() => router.push(`/user/${session.uid}/scores`)}>
        <span>보유 포인트</span>
        <span>{myPoint ? myPoint?.point : 0} point</span>
      </button>
      <button onClick={() => router.push(`/user/${session.uid}/depositLog`)}>
        <span>보유 보증금</span>
        <span>{myDeposit ? myDeposit?.deposit : 0} 원</span>
      </button>
    </Layout>
  );
}

const Layout = styled.div`
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

export default UserScoreBar;
