import { faChevronRight, faStars } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AlphabetIcon } from "../../../components/common/Icon/AlphabetIcon";
import { PopOverIcon } from "../../../components/common/Icon/PopOverIcon2";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import { useCollectionAlphabetQuery } from "../../../hooks/collection/queries";
import UserCollectionAlphabetModal from "../../../modals/user/collection/UserCollectionAlphabetModal";
import { isGuestState } from "../../../recoil/userAtoms";

function Collection() {
  const router = useRouter();
  const isGuest = useRecoilValue(isGuestState);

  const [isAlphabetModal, setIsAlphabetModal] = useState(false);

  const { data: alphabets } = useCollectionAlphabetQuery({
    enabled: !isGuest,
  });
  const alphabetArr = alphabets?.collects;
  const collectCnt = alphabets?.collectCnt;

  return (
    <>
      <PageLayout>
        <Header title="컬렉션" url="/user" />
        <Container>
          <Title>
            <div>
              <span>알파벳 컬렉션</span>
              <PopOverIcon
                title="알파벳 컬렉션"
                text="일일 출석체크, 스터디 출석체크를 통해 알파벳을 획득할 수 있어요! 개인 스터디, FREE 오픈에서도 획득 가능합니다."
              />
            </div>
            <div onClick={() => router.push("/user/collection/alphabet")}>
              <span>전체 획득 현황</span>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Title>
          <AlphabetContainer>
            <AlphabetIcon
              alphabet="A"
              isDuotone={!alphabetArr?.includes("A")}
            />
            <AlphabetIcon
              alphabet="B"
              isDuotone={!alphabetArr?.includes("B")}
            />
            <AlphabetIcon
              alphabet="O"
              isDuotone={!alphabetArr?.includes("O")}
            />
            <AlphabetIcon
              alphabet="U"
              isDuotone={!alphabetArr?.includes("U")}
            />
            <AlphabetIcon
              alphabet="T"
              isDuotone={!alphabetArr?.includes("T")}
            />
          </AlphabetContainer>
          <AlphabetQNABtn onClick={() => setIsAlphabetModal(true)}>
            <IconWrapper>
              <FontAwesomeIcon
                icon={faStars}
                size="2x"
                color="var(--color-mint)"
              />
            </IconWrapper>
            <AlphabetQNABtnContents>
              <span>여러번 수집하면 보상이 더 올라가요!</span>
              <span>컬렉션 수집 보상</span>
            </AlphabetQNABtnContents>
          </AlphabetQNABtn>
        </Container>
        <HrDiv />
      </PageLayout>
      {isAlphabetModal && (
        <UserCollectionAlphabetModal setIsModal={setIsAlphabetModal} />
      )}
    </>
  );
}

const HrDiv = styled.div`
  height: 8px;
  background-color: var(--font-h56);
`;

const Container = styled.div`
  margin: 0 var(--margin-main);
  padding: var(--padding-main) 0;
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
    > span:first-child {
      margin-right: var(--margin-min);
    }
  }
`;

const AlphabetContainer = styled.div`
  margin: 32px 0;
  display: flex;
  justify-content: center;
  font-size: 24px;
  align-items: center;
  > * {
    margin-right: 8px;
  }
`;

const AlphabetQNABtn = styled.button`
  display: flex;
  align-items: center;
  background-color: var(--font-h56);
  width: 100%;
  padding: var(--padding-sub) var(--padding-main);
  border-radius: var(--border-radius-main);
  color: var(--color-font-h2);
`;

const IconWrapper = styled.div`
  margin-right: var(--margin-sub);
`;

const AlphabetQNABtnContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > span:first-child {
    font-size: 12px;
    color: var(--font-h3);
  }
  > span:last-child {
    font-weight: 600;
    color: var(--font-h2);
    font-size: 14px;
  }
`;

export default Collection;
