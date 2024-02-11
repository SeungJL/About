import { faBlockQuestion } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../../components/common/user/Profile/ProfileIcon";
import { prevPageUrlState } from "../../../../recoil/previousAtoms";
import { voteDateState } from "../../../../recoil/studyAtoms";
import { transferUserDataState } from "../../../../recoil/transferDataAtoms";
import { userInfoState } from "../../../../recoil/userAtoms";
import {
  IAbsence,
  IAttendance,
  StudyStatus,
} from "../../../../types/study/studyDetail";
import { IUser } from "../../../../types/user/user";
interface IstudyUserComments {
  attendances: IAttendance[];
  isPrivate: boolean;
  absences: IAbsence[];
  status: StudyStatus;
}

function studyUserComments({
  attendances,
  isPrivate,
  absences,
  status,
}: IstudyUserComments) {
  const router = useRouter();
  const { data: session } = useSession();

  const userInfo = useRecoilValue(userInfoState);
  const voteDate = useRecoilValue(voteDateState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const setTransferUserData = useSetRecoilState(transferUserDataState);

  const myFriendList = userInfo?.friend;
  const isAttend = attendances.find(
    (who) => who.user.uid === session?.user?.uid
  );
  const hasPublicAccess =
    status === "open" ||
    (status !== "pending" && !!isAttend) ||
    voteDate.date() % 10 !== 1;

  const onClickUser = (user: IUser, isFunc) => {
    if (!isFunc) return;
    setTransferUserData(user);
    setBeforePage(router.asPath);
    router.push(`/profile/${user.uid}`);
  };

  return (
    <>
      <Layout key={router.asPath} isNoMember={attendances.length === 0}>
        <Title>참여 멤버</Title>
        {attendances.length === 0 && (
          <Message>
            <span>현재 신청중인 멤버가 없습니다.</span>
            <span>지금 신청하면 추가 10 point 획득 !</span>
          </Message>
        )}
        {attendances.map((att, idx) => {
          const user = att.user;
          const isAbsent = absences?.find((who) => who.user.uid === user.uid);
          const memo = att.memo === "" ? "출석" : att.memo;
          const isOpenProfile =
            hasPublicAccess ||
            user.uid === userInfo?.uid ||
            myFriendList?.includes(user.uid);

          return (
            <Wrapper key={idx} isPrivate={isPrivate}>
              <Block>
                <ProfileIconWrapper
                  onClick={() => onClickUser(user, isOpenProfile)}
                >
                  {isOpenProfile ? (
                    <ProfileIcon user={user} size="sm" />
                  ) : (
                    <FontAwesomeIcon icon={faBlockQuestion} size="3x" />
                  )}
                </ProfileIconWrapper>
                <BlockInfo>
                  <Info>
                    <studyUserCommentsName
                      name={user.name}
                      uid={user.uid}
                      hasPublicAccess={isOpenProfile}
                      isArrivedCondition={
                        !!(isAttend?.memo !== undefined && memo)
                      }
                    />
                    <studyUserCommentsComment
                      isAbsent={isAbsent}
                      memo={memo}
                      att={att}
                      isPrivate={isPrivate}
                    />
                  </Info>
                  <studyUserCommentsCheck
                    arrived={att.arrived}
                    isAbsent={isAbsent?.createdAt}
                  />
                </BlockInfo>
              </Block>
            </Wrapper>
          );
        })}
      </Layout>
    </>
  );
}

const Layout = styled.div<{ isNoMember: boolean }>`
  min-height: 160px;
  margin-top: var(--margin-main);
  padding: var(--padding-main);
  display: flex;
  flex-direction: column;
  background-color: white;
  border-bottom: ${(props) => props.isNoMember && "1.5px solid var(--font-h7)"};
`;

const Message = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: var(--font-h3);
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  padding-bottom: var(--padding-sub);
`;

const Wrapper = styled.div<{ isPrivate: boolean }>`
  border-bottom: ${(props) => props.isPrivate && "var(--border-main-light)"};
`;

const Block = styled.div`
  height: 60px;
  padding: var(--padding-md) 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--font-h7);
`;

const ProfileIconWrapper = styled.div``;

const BlockInfo = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  margin-left: var(--margin-sub);
`;

const Info = styled.div`
  flex: 1;
  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: var(--padding-min) 0;
  > div {
    font-size: 14px;
    margin-top: var(--margin-min);
    color: var(--font-h3);
    display: flex;
    align-items: center;
  }
`;

export default studyUserComments;
