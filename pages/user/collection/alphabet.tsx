import { Badge, Button } from "@chakra-ui/react";
import { faX } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AlphabetIcon } from "../../../components/common/Icon/AlphabetIcon";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import { BADGE_COLOR } from "../../../constants/contentsValue/badge";
import { getUserBadge } from "../../../helpers/userHelpers";
import {
  useAlphabetCompletedMutation,
  useCollectionAlphabetMutation,
} from "../../../hooks/collection/mutations";
import {
  useCollectionAlphabetAllQuery,
  useCollectionAlphabetQuery,
} from "../../../hooks/collection/queries";
import NotCompletedModal from "../../../modals/system/NotCompletedModal";
import { isGuestState } from "../../../recoil/userAtoms";
import { ICollectionAlphabet } from "../../../types/user/collections";

function CollectionAlphabet() {
  const { data: session } = useSession();
  const isGuest = useRecoilValue(isGuestState);

  const { data: alphabets } = useCollectionAlphabetQuery({
    enabled: !isGuest,
  });

  const { mutate } = useCollectionAlphabetMutation();

  const { mutate: mutate2 } = useAlphabetCompletedMutation({
    onError(err: AxiosError<{ message: string }, any>) {
      const res = err.response.data;
      if (res.message === "not completed") {
        //다 모으지 못했음
      }
    },
  });

  const { data: userAlphabetAll } = useCollectionAlphabetAllQuery();

  const [members, setMembers] = useState<ICollectionAlphabet[]>();
  const [isChangeModal, setIsChangeModal] = useState(false);

  useEffect(() => {
    if (!userAlphabetAll) return;
    const idx = userAlphabetAll.find((who) => who.user.uid === session?.uid);
    if (idx) {
      userAlphabetAll.sort((a, b) => {
        if (a.user.uid === session?.uid) return -1;
        if (b.user.uid === session?.uid) return 1;
        return 0;
      });
    }
    setMembers(userAlphabetAll);
  }, [session?.uid, userAlphabetAll]);

  return (
    <>
      <PageLayout>
        <Header title="전체 수집 현황" url="/user/collection" />
        <Members>
          {members?.map((who) => {
            const user = who.user;
            const userBadge = getUserBadge(user.score, user.uid);
            const alphabets = who.collects;
            const alphabetsCnt = {
              A: 0,
              B: 0,
              O: 0,
              U: 0,
              T: 0,
            };
            alphabets.forEach((alphabet) => {
              alphabetsCnt[alphabet]++;
            });
            return (
              <Item key={user.uid}>
                <ProfileWrapper>
                  <ProfileIcon user={user} size="sm" />
                </ProfileWrapper>
                <Info>
                  <Name>
                    <span>{user.name}</span>
                    <Badge
                      fontSize={10}
                      colorScheme={BADGE_COLOR[userBadge]}
                      ml="var(--margin-md)"
                    >
                      {userBadge}
                    </Badge>
                  </Name>
                  <UserAlphabets>
                    <div>
                      <AlphabetIcon
                        alphabet="A"
                        isDuotone={!alphabets?.includes("A")}
                      />
                      <FontAwesomeIcon icon={faX} />
                      <AlphabetCnt hasAlphabet={alphabetsCnt.A !== 0}>
                        {alphabetsCnt.A}
                      </AlphabetCnt>
                    </div>
                    <div>
                      <AlphabetIcon
                        alphabet="B"
                        isDuotone={!alphabets?.includes("B")}
                      />{" "}
                      <FontAwesomeIcon icon={faX} />
                      <AlphabetCnt hasAlphabet={alphabetsCnt.B !== 0}>
                        {alphabetsCnt.B}
                      </AlphabetCnt>
                    </div>
                    <div>
                      <AlphabetIcon
                        alphabet="O"
                        isDuotone={!alphabets?.includes("O")}
                      />{" "}
                      <FontAwesomeIcon icon={faX} />
                      <AlphabetCnt hasAlphabet={alphabetsCnt.O !== 0}>
                        {alphabetsCnt.O}
                      </AlphabetCnt>
                    </div>
                    <div>
                      <AlphabetIcon
                        alphabet="U"
                        isDuotone={!alphabets?.includes("U")}
                      />{" "}
                      <FontAwesomeIcon icon={faX} />
                      <AlphabetCnt hasAlphabet={alphabetsCnt.U !== 0}>
                        {alphabetsCnt.U}
                      </AlphabetCnt>
                    </div>
                    <div>
                      <AlphabetIcon
                        alphabet="T"
                        isDuotone={!alphabets?.includes("T")}
                      />{" "}
                      <FontAwesomeIcon icon={faX} />
                      <AlphabetCnt hasAlphabet={alphabetsCnt.T !== 0}>
                        {alphabetsCnt.T}
                      </AlphabetCnt>
                    </div>
                  </UserAlphabets>
                </Info>
                {who.user.uid === session?.uid ? (
                  <></>
                ) : (
                  <Button
                    size="xs"
                    colorScheme="mintTheme"
                    onClick={() => setIsChangeModal(true)}
                  >
                    교환 신청
                  </Button>
                )}
              </Item>
            );
          })}
        </Members>
      </PageLayout>
      {isChangeModal && <NotCompletedModal setIsModal={setIsChangeModal} />}
    </>
  );
}

const Members = styled.div`
  margin: 0 var(--margin-main);
`;

const Item = styled.div`
  padding: var(--padding-sub) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: var(--border-sub);
  border-bottom: var(--border-sub);
`;
const ProfileWrapper = styled.div``;

const Info = styled.div`
  height: 100%;
  margin-left: var(--margin-sub);
  margin-right: auto;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;
const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: var(--margin-min);
`;

const UserAlphabets = styled.div`
  display: flex;
  justify-content: center;
  font-size: 8px;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    margin-right: var(--margin-md);

    > *:nth-child(2) {
      margin: 0 var(--margin-min);
    }
  }
`;

const AlphabetCnt = styled.span<{ hasAlphabet: boolean }>`
  font-size: 12px;
  color: ${(props) =>
    props.hasAlphabet ? "var(--font-h2)" : "var(--font-h3)"};
`;

export default CollectionAlphabet;
