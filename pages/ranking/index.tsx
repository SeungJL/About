import {
  Badge,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Header from "../../components/common/Header";
import { useScoreAllQuery, useScoreQuery } from "../../hooks/user/queries";
import {
  myScoreRank,
  SortUserScore,
  userBadgeScore,
} from "../../libs/utils/userUtils";
import { userBadgeState } from "../../recoil/userAtoms";
import { IScoreAll, USER_BADGES } from "../../types/user";

function Ranking() {
  const { data: session } = useSession();

  const isGuest = session && session?.user.name === "guest";
  const [userScoreList, setUserScoreList] = useState<IScoreAll[]>([]);
  const userBadge = useRecoilValue(userBadgeState);
  const [myRank, setMyRank] = useState<{ isRank; myRank; percent }>();
  const { data } = useScoreQuery({
    enabled: isGuest === false,
  });
  console.log(2, data);
  const myPoint = data?.point | 0;

  useScoreAllQuery({
    enabled: true,
    onSuccess(data) {
      console.log(data);
      const { scoreArr, myRank, percent, isRank } = SortUserScore(
        data,
        myPoint
      );
      setUserScoreList(scoreArr);
      setMyRank({ myRank, percent, isRank });
    },
  });

  return (
    <AnimateLayout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Header title="About 랭킹" />
      <Layout>
        <OverView>
          <Myrank>
            {myRank?.isRank ? (
              <span>
                랭킹:
                <span> {isGuest ? "--" : myRank?.myRank} 위</span>
              </span>
            ) : (
              <span>상위 {myRank?.percent}%</span>
            )}
            <span>전체: {userScoreList?.length}</span>
          </Myrank>
          <Profile isGuest={isGuest}>
            {!isGuest && (
              <ImageWrapper>
                <Image
                  width={72}
                  height={72}
                  alt="myProfile"
                  src={`${session?.user.image}`}
                  unoptimized={true}
                />
              </ImageWrapper>
            )}
            <span>{session?.user.name}</span>
          </Profile>
          <Score>
            <span>
              등급: &nbsp;
              <Badge colorScheme={userBadge.color} fontSize="13px" mb="6px">
                {userBadge.badge}
              </Badge>
            </span>
            <span>
              점수: &nbsp; <span>{myPoint}점</span>
            </span>
          </Score>
        </OverView>

        <MainWrapper>
          <RankingSection>
            <SectionHeader>
              <span>랭킹</span>
              <span>이름</span>
              <Popover>
                <PopoverTrigger>
                  <FontAwesomeIcon icon={faExclamationCircle} />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontSize="11px">랭킹 페이지</PopoverHeader>
                  <PopoverBody fontSize="11px">
                    해당 페이지는 현재 베타로 출시한 기능입니다. 디자인이나
                    기능이 아직 완성되지 않은 점 감안해주세요!
                  </PopoverBody>
                </PopoverContent>
              </Popover>
              <FilterBtn>필터</FilterBtn>
            </SectionHeader>
            {userScoreList?.map((who, idx) => {
              const point = who?.point;
              const { badge } = userBadgeScore(point);
              return (
                <Item key={idx}>
                  <span>{idx + 1}위</span>
                  <RankingMine isMine={who.uid === session?.uid}>
                    {who?.name}
                  </RankingMine>
                  <Badge marginRight="6px" colorScheme={USER_BADGES[badge]}>
                    {badge}
                  </Badge>
                  <span>{point} 점</span>
                </Item>
              );
            })}
          </RankingSection>
        </MainWrapper>
      </Layout>
      ;
    </AnimateLayout>
  );
}

const AnimateLayout = styled(motion.div)``;

const Layout = styled.div`
  height: 100vh;
`;

const OverView = styled.div`
  height: 25vh;
  display: flex;
  justify-content: space-around;
  align-items: center;

  background-color: var(--font-h6);
`;

const Myrank = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  > span:first-child {
    display: inline-block;
    margin-bottom: 6px;
    > span {
      font-size: 20px;
      font-weight: 800;
    }
  }
  > span:last-child {
    font-size: 12px;
  }
`;

const Profile = styled.div<{ isGuest: boolean }>`
  text-align: center;
  > span {
    font-size: ${(props) => (props.isGuest ? "18px" : "12px")};
    font-weight: 600;
  }
`;

const Guest = styled.span``;

const ImageWrapper = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 4px;
`;

const Score = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 120px;

  > span {
    > span {
      font-weight: 600;
    }
  }
`;

const RankingSection = styled.section`
  background-color: white;
  height: 100%;
  overflow-y: scroll;
  padding: 12px 16px;
  border-radius: 8px;
`;

const MainWrapper = styled.div`
  background-color: var(--color-mint);
  padding: 4px;
  height: calc(75vh - 46px);
`;
const SectionHeader = styled.header`
  display: flex;
  margin-bottom: 12px;
  align-items: center;
  > span {
    font-weight: 600;
    width: 60px;
    text-align: center;
  }
  > span:first-child {
    margin-right: 12px;
  }
`;

const FilterBtn = styled.button`
  margin-left: auto;
  border: 1.5px solid var(--font-h5);
  padding: 0 12px;
  font-size: 12px;
`;

const Item = styled.div`
  display: flex;
  height: 48px;
  align-items: center;
  border-bottom: 1px solid var(--font-h5);

  > span {
    text-align: center;
    width: 60px;
  }
  > span:first-child {
    margin-right: 12px;
    font-weight: 600;
  }

  > span:last-child {
    margin-left: auto;
  }
`;

const RankingMine = styled.span<{ isMine: boolean }>`
  margin-right: 3px;
  color: ${(props) => (props.isMine ? "var(--color-mint)" : null)};
  font-weight: ${(props) => (props.isMine ? "600" : null)};
`;

const RankProfile = styled.div`
  display: flex;
  align-items: center;
`;

export default Ranking;
