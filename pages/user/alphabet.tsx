import { Badge, Button } from "@chakra-ui/react";
import { faX } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

import { AlphabetIcon } from "../../components/common/Icon/AlphabetIcon";
import { MainLoading } from "../../components/common/loaders/MainLoading";
import Slide from "../../components/layout/PageSlide";
import Avatar from "../../components2/atoms/Avatar";
import Header from "../../components2/Header";
import { BADGE_COLOR } from "../../constants/settingValue/badge";
import { getUserBadge } from "../../helpers/userHelpers";
import { useCompleteToast, useFailToast } from "../../hooks/custom/CustomToast";
import { useUserInfoQuery } from "../../hooks/user/queries";
import { useAlphabetCompletedMutation } from "../../hooks/user/sub/collection/mutations";
import {
  useCollectionAlphabetAllQuery,
  useCollectionAlphabetQuery,
} from "../../hooks/user/sub/collection/queries";
import AlphabetChangeModal from "../../modals/user/collection/AlphabetChangeModal";
import { prevPageUrlState } from "../../recoil/previousAtoms";
import { transferUserSummaryState } from "../../recoils/transferRecoils";

import { Alphabet, ICollectionAlphabet } from "../../types/user/collections";
import { IUserSummary } from "../../types2/userTypes/userInfoTypes";

const ALPHABET_COLLECTION: Alphabet[] = ["A", "B", "O", "U", "T"];

function CollectionAlphabet() {
  const failToast = useFailToast();
  const completeToast = useCompleteToast();
  const router = useRouter();
  const { data: session } = useSession();

  const setTransferUser = useSetRecoilState(transferUserSummaryState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);

  const { data: userInfo } = useUserInfoQuery();

  const { data: alphabets } = useCollectionAlphabetQuery();

  const { mutate: mutate2, isLoading: completeLoading } =
    useAlphabetCompletedMutation({
      onSuccess() {
        completeToast(
          "free",
          "교환이 완료되었어요! 상품은 확인하는대로 보내드려요!"
        );
      },
      onError(err: AxiosError<{ message: string }, any>) {
        const res = err.response.data;
        if (res.message === "not completed") {
          //다 모으지 못했음
        }
      },
    });

  const { data: userAlphabetAll, isLoading } = useCollectionAlphabetAllQuery();

  const [members, setMembers] = useState<ICollectionAlphabet[]>();
  const [isChangeModal, setIsChangeModal] = useState(false);
  const [hasAlphabetAll, setHasAlphabetAll] = useState(false);
  const [opponentAlphabets, setOpponentAlphabets] = useState<{
    user: string;
    alphabets: Alphabet[];
  }>();

  useEffect(() => {
    if (isLoading) return;
    const findItem = userAlphabetAll.find(
      (who) => who?.user?.uid === session?.user.uid
    );

    if (
      ALPHABET_COLLECTION.every((item) => findItem?.collects.includes(item))
    ) {
      setHasAlphabetAll(true);
    }

    if (findItem) {
      userAlphabetAll.sort((a, b) => {
        if (a?.user?.uid === session?.user?.uid) return -1;
        if (b?.user?.uid === session?.user?.uid) return 1;
        return 0;
      });
    }
    setMembers(userAlphabetAll);
  }, [isLoading, session?.user?.uid, userAlphabetAll]);

  const onClickProfile = (user: IUserSummary) => {
    setTransferUser(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  const onClickChangeBtn = (user: IUserSummary, alphabets: Alphabet[]) => {
    const myFriends = userInfo?.friend;
    if (!myFriends?.includes(user.uid)) {
      failToast("free", "친구끼리만 교환 신청이 가능합니다.");
      return;
    }
    setOpponentAlphabets({ user: user.uid, alphabets });
    setIsChangeModal(true);
  };

  const handleChangePromotion = () => {
    mutate2();
  };

  return (
    <>
      <Slide isFixed={true}>
        <Header title="전체 수집 현황" />
      </Slide>
      <Slide>
        {!isLoading ? (
          <>
            <Members>
              {members?.map((who) => {
                if (!who?.user) return null;
                const user = who.user;
                const { badge } = getUserBadge(user.score, user.uid);
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
                    <ProfileWrapper onClick={() => onClickProfile(user)}>
                      <Avatar
                        size="md"
                        image={user.profileImage}
                        avatar={user.avatar}
                        uid={user.uid}
                      />
                    </ProfileWrapper>
                    <Info>
                      <Name>
                        <span>{user.name}</span>
                        <Badge
                          fontSize={10}
                          colorScheme={BADGE_COLOR[badge]}
                          ml="var(--gap-2)"
                        >
                          {badge}
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
                    {who.user.uid === session?.user?.uid ? (
                      <Button
                        colorScheme="telegram"
                        size="xs"
                        disabled={!hasAlphabetAll}
                        isLoading={completeLoading}
                        onClick={() => handleChangePromotion()}
                      >
                        상품 교환
                      </Button>
                    ) : (
                      <Button
                        size="xs"
                        colorScheme="mintTheme"
                        onClick={() => onClickChangeBtn(user, alphabets)}
                      >
                        교환 신청
                      </Button>
                    )}
                  </Item>
                );
              })}
            </Members>
          </>
        ) : (
          <MainLoading />
        )}
      </Slide>
      {isChangeModal && (
        <AlphabetChangeModal
          myAlphabets={alphabets?.collects || []}
          opponentAlpabets={opponentAlphabets.alphabets}
          setIsModal={setIsChangeModal}
          toUid={opponentAlphabets.user}
        />
      )}
    </>
  );
}

const Members = styled.div`
  margin: 0 var(--gap-4);
`;

const Item = styled.div`
  padding: var(--gap-3) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: var(--border);
  border-bottom: var(--border);
`;
const ProfileWrapper = styled.div``;

const Info = styled.div`
  height: 100%;
  margin-left: var(--gap-3);
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
  margin-bottom: var(--gap-1);
`;

const UserAlphabets = styled.div`
  display: flex;
  justify-content: center;
  font-size: 8px;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
    margin-right: var(--gap-2);

    > *:nth-child(2) {
      margin: 0 var(--gap-1);
    }
  }
`;

const AlphabetCnt = styled.span<{ hasAlphabet: boolean }>`
  font-size: 12px;
  color: ${(props) => (props.hasAlphabet ? "var(--gray-2)" : "var(--gray-3)")};
`;

export default CollectionAlphabet;
