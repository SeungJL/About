import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import { ICollectionAlphabet } from "../../../types/user/collections";

interface IuserOverviewPointNav {
  alphabets: ICollectionAlphabet;
  myDeposit: number;
}

function UserOverviewPointNav({ alphabets, myDeposit }: IuserOverviewPointNav) {
  const router = useRouter();

  const setPrevPageUrl = useSetRecoilState(prevPageUrlState);

  const alphabetArr = alphabets?.collects;

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
      <Container onClick={() => router.push("/user/collection")}>
        내 컬렉션
      </Container>
      <button onClick={() => onClick("deposit")}>내 프로필 정보</button>
    </Layout>
  );
}

const Collection = styled.div`
  display: flex;
  font-size: 8px;
  align-items: center;
  > * {
    margin-right: 3px;
  }
`;

const Container = styled.div`
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
`;

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

export default UserOverviewPointNav;
