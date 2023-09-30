import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import ProfileIcon from "../../../../components/common/user/Profile/ProfileIcon";
import { useStudyAbsentQuery } from "../../../../hooks/study/queries";
import { prevPageUrlState } from "../../../../recoil/previousAtoms";
import { isRefetchStudyAbsentState } from "../../../../recoil/refetchingAtoms";
import { transferUserDataState } from "../../../../recoil/transferDataAtoms";
import { IAttendance } from "../../../../types/study/studyDetail";
import { IUser } from "../../../../types/user/user";
import StudySpaceUserCommentsCheck from "./StudySpaceUserCommentsCheck";
import StudySpaceUserCommentsComment from "./StudySpaceUserCommentsComment";
import StudySpaceUserCommentsName from "./StudySpaceUserCommentsName";
interface IStudySpaceUserComments {
  attendances: IAttendance[];
}

function StudySpaceUserComments({ attendances }: IStudySpaceUserComments) {
  const router = useRouter();
  const { data: session } = useSession();
  const voteDate = dayjs(router.query.date as string);

  const setBeforePage = useSetRecoilState(prevPageUrlState);
  const setTransferUserData = useSetRecoilState(transferUserDataState);
  const [isRefetchStudyAbsent, setIsRefetchStudyAbsent] = useRecoilState(
    isRefetchStudyAbsentState
  );
  console.log(attendances);
  const { data: absentData, refetch } = useStudyAbsentQuery(voteDate);

  useEffect(() => {
    if (isRefetchStudyAbsent) {
      refetch();
      setIsRefetchStudyAbsent(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefetchStudyAbsent]);

  const isAttend = attendances.find((who) => who.user.uid === session?.uid);

  const onClickUser = (user: IUser) => {
    setTransferUserData(user);
    setBeforePage(router.asPath);
    router.push(`/profile/${user.uid}}`);
  };

  return (
    <>
      <Layout key={router.asPath}>
        {attendances.map((att, idx) => {
          const user = att.user;
          const isAbsent = absentData?.find((who) => who.uid === user.uid);
          const memo = att.memo === "" ? "출석" : att.memo;
          return (
            <Block key={idx}>
              <ProfileIconWrapper onClick={() => onClickUser(user)}>
                <ProfileIcon user={user} size="md" />
              </ProfileIconWrapper>
              <BlockInfo>
                <Info>
                  <StudySpaceUserCommentsName
                    name={user.name}
                    uid={user.uid}
                    isArrivedCondition={
                      !!(isAttend?.memo !== undefined && memo)
                    }
                  />
                  <StudySpaceUserCommentsComment
                    isAbsent={isAbsent}
                    memo={memo}
                    att={att}
                  />
                </Info>
                <StudySpaceUserCommentsCheck
                  arrived={att.arrived}
                  isAbsent={!!isAbsent}
                />
              </BlockInfo>
            </Block>
          );
        })}
      </Layout>
    </>
  );
}

const Layout = styled.div`
  min-height: 20px;
  margin: 0 var(--margin-main);
  margin-top: var(--margin-max);
  display: flex;
  flex-direction: column;
`;
const Block = styled.div`
  height: 60px;
  margin-bottom: var(--margin-sub);
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
