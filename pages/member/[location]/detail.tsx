import { Badge } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { SECTION_NAME } from ".";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import Header from "../../../components/layout/Header";
import PageSlide from "../../../components/layout/PageSlide";
import { BADGE_COLOR } from "../../../constants/settingValue/badge";
import { dayjsToFormat } from "../../../helpers/dateHelpers";
import { getUserBadge } from "../../../helpers/userHelpers";
import { prevPageUrlState } from "../../../recoil/previousAtoms";
import {
  transferMemberDataState,
  transferUserDataState,
} from "../../../recoil/transferDataAtoms";
import { IUser } from "../../../types/user/user";

function MemberDetail() {
  const router = useRouter();

  const memberData = useRecoilValue(transferMemberDataState);
  const setUserData = useSetRecoilState(transferUserDataState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);

  const section = memberData?.section;

  const onClickUser = (user: IUser) => {
    setUserData(user);
    setBeforePage(router?.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <PageSlide>
      <Header
        title={SECTION_NAME[section]}
        url={`/member/${router.query?.location}`}
      />
      <Container>
        {memberData?.members.map((who) => {
          const { badge } = getUserBadge(who.score, who.uid);
          const rest = section === "resting" && who?.rest;
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
                    colorScheme={BADGE_COLOR[badge]}
                    ml="var(--margin-md)"
                  >
                    {badge}
                  </Badge>
                </Name>
                <div>
                  {section === "member" || section?.includes("group") ? (
                    who.comment
                  ) : section === "human" ? (
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
                              {dayjsToFormat(dayjs(rest.startDate), "YY-MM-DD")}{" "}
                              ~ {dayjsToFormat(dayjs(rest.endDate), "YY-MM-DD")}
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
    </PageSlide>
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

export default MemberDetail;
