import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { AlphabetIcon } from "../../../components/common/Icon/AlphabetIcon";
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
      <Container>
        <span>수집 현황</span>
        <Collection>
          <AlphabetIcon alphabet="A" isDuotone={!alphabetArr?.includes("A")} />
          <AlphabetIcon alphabet="B" isDuotone={!alphabetArr?.includes("B")} />
          <AlphabetIcon alphabet="O" isDuotone={!alphabetArr?.includes("O")} />
          <AlphabetIcon alphabet="U" isDuotone={!alphabetArr?.includes("U")} />
          <AlphabetIcon alphabet="T" isDuotone={!alphabetArr?.includes("T")} />
        </Collection>
      </Container>
      <button onClick={() => onClick("deposit")}>
        <span>보유 보증금</span>
        <span>{myDeposit || 0} 원</span>
      </button>
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
