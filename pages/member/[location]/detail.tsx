import { Badge } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { SECTION_NAME } from ".";
import ProfileIcon from "../../../components/common/user/Profile/ProfileIcon";
import Header from "../../../components/layout/Header";
import Slide from "../../../components/layout/Slide";
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
    <Slide>
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
                    ml="var(--gap-2)"
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
    </Slide>
  );
}

const Container = styled.div`
  margin: 0 var(--gap-4);
`;

const Item = styled.div`
  display: flex;
  padding: var(--gap-3) 0;
  border-top: var(--border-light);
  border-bottom: var(--border-light);
`;

const ProfileWrapper = styled.div``;

const Info = styled.div`
  margin-left: var(--gap-3);
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  > div:last-child {
    font-size: 11px;
    color: var(--gray-3);
    display: flex;
    flex-direction: column;
  }
`;

const RestInfo = styled.div`
  > span:first-child {
    margin-right: var(--gap-1);
  }
  > span:nth-child(2) {
    margin-left: var(--gap-1);
  }
`;

const DDay = styled.span`
  color: var(--color-red);
  margin-left: var(--gap-2);
`;

const Name = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
`;

export default MemberDetail;
