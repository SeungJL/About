import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  useDepositQuery,
  usePointQuery,
} from "../../hooks/user/pointSystem/queries";
import { prevPageUrlState } from "../../recoil/previousAtoms";

function UserScoreBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const isGuest = session?.user?.name === "guest";

  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);

  const { data: myPoint } = usePointQuery({ enabled: !isGuest });
  const { data: myDeposit } = useDepositQuery({ enabled: !isGuest });

  const onClick = (type: "point" | "deposit") => {
    if (type === "point") {
      setPrevPageUrl("/user");
      router.push("/point/pointLog");
      return;
    }
    router.push(`/user/depositLog`);
  };

  return (
    <Layout>
      <button onClick={() => onClick("point")}>
        <span>보유 포인트</span>
        <span>{myPoint ? myPoint?.point : 0} point</span>
      </button>
      <button onClick={() => onClick("deposit")}>
        <span>보유 보증금</span>
        <span>{myDeposit ? myDeposit?.deposit : 0} 원</span>
      </button>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  height: 30px;

  > button {
    color: var(--font-h3);
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

export default UserScoreBar;
