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
import StudySpaceUserCommentsCheck from "./StudySpaceUserCommentsCheck";
import StudySpaceUserCommentsComment from "./StudySpaceUserCommentsComment";
import StudySpaceUserCommentsName from "./StudySpaceUserCommentsName";
interface IStudySpaceUserComments {
  attendances: IAttendance[];
  isPrivate: boolean;
  absences: IAbsence[];
  status: StudyStatus;
}

function StudySpaceUserComments({
  attendances,
  isPrivate,
  absences,
  status,
}: IStudySpaceUserComments) {
  const router = useRouter();
  const { data: session } = useSession();

  const userInfo = useRecoilValue(userInfoState);
  const voteDate = useRecoilValue(voteDateState);
  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const setTransferUserData = useSetRecoilState(transferUserDataState);

  const myFriendList = userInfo?.friend;
  const isAttend = attendances.find((who) => who.user.uid === session?.uid);
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
      <Layout key={router.asPath}>
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
                    <ProfileIcon user={user} size="md" />
                  ) : (
                    <FontAwesomeIcon icon={faBlockQuestion} size="3x" />
                  )}
                </ProfileIconWrapper>
                <BlockInfo>
                  <Info>
                    <StudySpaceUserCommentsName
                      name={user.name}
                      uid={user.uid}
                      hasPublicAccess={isOpenProfile}
                      isArrivedCondition={
                        !!(isAttend?.memo !== undefined && memo)
                      }
                    />
                    <StudySpaceUserCommentsComment
                      isAbsent={isAbsent}
                      memo={memo}
                      att={att}
                      isPrivate={isPrivate}
                    />
                  </Info>
                  <StudySpaceUserCommentsCheck
                    arrived={att.arrived}
                    isAbsent={!!isAbsent}
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

const Layout = styled.div`
  min-height: 20px;
  margin-top: var(--margin-max);
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div<{ isPrivate: boolean }>`
  border-bottom: ${(props) => props.isPrivate && "var(--border-main-light)"};
`;

const Block = styled.div`
  height: 60px;
  margin: var(--margin-md) var(--margin-main);

  display: flex;
  align-items: center;
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
    font-size: 13px;
    margin-top: var(--margin-min);
    color: var(--font-h3);
    display: flex;
    align-items: center;
  }
`;

export default StudySpaceUserComments;
