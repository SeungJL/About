import { faStars } from "@fortawesome/pro-duotone-svg-icons";
import { faChevronRight } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { AlphabetIcon } from "../../components/common/Icon/AlphabetIcon";

import { useCollectionAlphabetQuery } from "../../hooks/user/sub/collection/queries";
import UserCollectionAlphabetModal from "../../modals/user/collection/UserCollectionAlphabetModal";

export default function UserCollection() {
  const { data: session } = useSession();
  const router = useRouter();
  const isGuest = session?.user.name === "guest";

  const [isAlphabetModal, setIsAlphabetModal] = useState(false);

  const { data: alphabets } = useCollectionAlphabetQuery({
    enabled: !isGuest,
  });
  const alphabetArr = alphabets?.collects;
  const collectCnt = alphabets?.collectCnt;

  return (
    <>
      <Link href="/user/alphabet">
        <BlockItem>
          <span>알파벳 컬렉션</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </BlockItem>
      </Link>
      <AlphabetContainer>
        <AlphabetIcon alphabet="A" isDuotone={!alphabetArr?.includes("A")} />
        <AlphabetIcon alphabet="B" isDuotone={!alphabetArr?.includes("B")} />
        <AlphabetIcon alphabet="O" isDuotone={!alphabetArr?.includes("O")} />
        <AlphabetIcon alphabet="U" isDuotone={!alphabetArr?.includes("U")} />
        <AlphabetIcon alphabet="T" isDuotone={!alphabetArr?.includes("T")} />
      </AlphabetContainer>
      <AlphabetQNABtn onClick={() => setIsAlphabetModal(true)}>
        <IconWrapper>
          <FontAwesomeIcon icon={faStars} size="2x" color="var(--color-mint)" />
        </IconWrapper>
        <AlphabetQNABtnContents>
          <span>여러번 수집하면 보상이 더 올라가요!</span>
          <span>컬렉션 수집 보상</span>
        </AlphabetQNABtnContents>
      </AlphabetQNABtn>
      {isAlphabetModal && (
        <UserCollectionAlphabetModal setIsModal={setIsAlphabetModal} />
      )}
    </>
  );
}

const BlockItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--gap-4);

  font-weight: 600;
  > span:first-child {
    > b {
      color: var(--color-mint);
    }
  }
`;

const HrDiv = styled.div`
  height: 8px;
  background-color: var(--gray-7);
`;

const Container = styled.div`
  margin: 0 var(--gap-4);
  padding: var(--gap-4) 0;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  > div:first-child {
    display: flex;
    font-weight: 600;
  }
  > div:last-child {
    font-size: 12px;
    display: flex;
    align-items: center;
    font-weight: 600;
    > button:first-child {
      margin-right: var(--gap-1);
    }
  }
`;

const AlphabetContainer = styled.div`
  padding-top: 16px;
  padding-bottom: 32px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  align-items: center;
  > * {
    margin-right: 8px;
  }
`;

const AlphabetQNABtn = styled.button`
  margin: 0 16px;

  display: flex;
  align-items: center;
  background-color: var(--gray-7);

  padding: var(--gap-3) var(--gap-4);
  border-radius: var(--rounded-lg);
  color: var(--color-font-h2);
`;

const IconWrapper = styled.div`
  margin-right: var(--gap-3);
`;

const AlphabetQNABtnContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > span:first-child {
    font-size: 12px;
    color: var(--gray-3);
  }
  > span:last-child {
    font-weight: 600;
    color: var(--gray-2);
    font-size: 14px;
  }
`;
