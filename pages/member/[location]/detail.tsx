import { Badge } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../components/common/Profile/ProfileIcon";
import Header from "../../../components/layout/Header";
import PageLayout from "../../../components/layout/PageLayout";
import { USER_BADGES } from "../../../constants/convert";
import { getUserBadgeScore } from "../../../helpers/userHelpers";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import {
  transferMemberDataState,
  transferUserDataState,
} from "../../../recoil/transferDataAtoms";
import { IUser } from "../../../types/user/user";

function Detail() {
  const router = useRouter();
  const memberData = useRecoilValue(transferMemberDataState);
  const setUserData = useSetRecoilState(transferUserDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);

  const category = memberData?.category;

  const onClickUser = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };
  return (
    <PageLayout>
      <Header title={category} url={`/member/${router.query?.location}`} />
      <Container>
        {memberData?.memberData.map((who) => {
          const userBadge = getUserBadgeScore(who.score);
          const rest = category === "휴식 멤버" && who?.rest;
          return (
            <Item key={who.uid} onClick={() => onClickUser(who)}>
              <ProfileWrapper>
                <ProfileIcon user={who} size="sm" />
              </ProfileWrapper>
              <Info>
                <Name>
                  <span>{who.name}</span>
                  <Badge
                    fontSize={10}
                    colorScheme={USER_BADGES[userBadge?.badge]}
                    ml="var(--margin-md)"
                  >
                    {userBadge?.badge}
                  </Badge>
                </Name>
                <div>
                  {category === "활동 멤버" ? (
                    who.comment
                  ) : category === "수습 멤버" ? (
                    `가입일: ${dayjs(who.registerDate).format(
                      "YYYY년 M월 D일"
                    )}`
                  ) : (
                    <>
                      <RestInfo>
                        <span>{rest.type}휴식</span>/
                        {rest.type === "일반" ? (
                          <>
                            <span>
                              {dayjs(rest.startDate).format("YY-MM-DD")} ~{" "}
                              {dayjs(rest.endDate).format("YY-MM-DD")}
                            </span>
                            <DDay>
                              D-
                              {dayjs(rest.endDate).diff(dayjs(), "day")}{" "}
                            </DDay>
                          </>
                        ) : (
                          <span>자율참여 멤버</span>
                        )}
                      </RestInfo>
                      <span>{rest?.content}</span>
                    </>
                  )}
                </div>
              </Info>
            </Item>
          );
        })}
      </Container>
    </PageLayout>
  );
}

const Container = styled.div`
  margin: 0 var(--margin-main);
`;

const Item = styled.div`
  display: flex;
  padding: var(--padding-sub) 0;
  border-top: var(--border-sub);
  border-bottom: var(--border-sub);
`;

const ProfileWrapper = styled.div``;

const Info = styled.div`
  margin-left: var(--margin-sub);
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  > div:last-child {
    font-size: 11px;
    color: var(--font-h3);
    display: flex;
    flex-direction: column;
  }
`;

const RestInfo = styled.div`
  > span:first-child {
    margin-right: var(--margin-min);
  }
  > span:nth-child(2) {
    margin-left: var(--margin-min);
  }
`;

const DDay = styled.span`
  color: var(--color-red);
  margin-left: var(--margin-md);
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
`;

export default Detail;
