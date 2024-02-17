import dayjs from "dayjs";
import "dayjs/locale/ko"; // 로케일 플러그인 로드
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { MainLoading } from "../../../components/common/loaders/MainLoading";
import { GROUP_STUDY_ALL } from "../../../constants/keys/queryKeys";
import { dayjsToStr } from "../../../helpers/dateHelpers";
import { useResetQueryData } from "../../../hooks/custom/CustomHooks";
import { useGroupAttendancePatchMutation } from "../../../hooks/Group/mutations";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import GroupBottomNav from "../../../pageTemplates/Group/detail/GroupBottomNav";
import GroupComments from "../../../pageTemplates/Group/detail/GroupComment";
import GroupContent from "../../../pageTemplates/Group/detail/GroupContent/GroupContent";
import GroupCover from "../../../pageTemplates/Group/detail/GroupCover";
import GroupHeader from "../../../pageTemplates/Group/detail/GroupHeader";
import GroupParticipation from "../../../pageTemplates/Group/detail/GroupParticipation";
import GroupTitle from "../../../pageTemplates/Group/detail/GroupTitle";
import { isRefetchGroupInfoState } from "../../../recoil/refetchingAtoms";
import { transferGroupDataState } from "../../../recoil/transferDataAtoms";
import { userAccessUidState, userInfoState } from "../../../recoil/userAtoms";

function GroupDetail() {
  const router = useRouter();
  const GroupId = router.query.id;

  const uid = useRecoilValue(userAccessUidState);
  const [Group, setGroup] = useRecoilState(transferGroupDataState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useUserInfoQuery({
    enabled: !userInfo,
    onSuccess(data) {
      setUserInfo(data);
    },
  });

  const [adminIsRefetch, setAdminIsRefetch] = useRecoilState(
    isRefetchGroupInfoState
  );
  const [isRefetch, setIsRefetch] = useState(false);

  const { refetch } = useGroupAllQuery({
    enabled: !Group,
    onSuccess(data) {
      setGroup(data.find((item) => item.id === +GroupId));
    },
  });

  const resetQueryData = useResetQueryData();

  const { mutate: patchAttendance } = useGroupAttendancePatchMutation(
    +GroupId,
    {
      onSuccess() {
        resetQueryData([GROUP_STUDY_ALL]);
      },
    }
  );

  useEffect(() => {
    if (!Group) return;
    const firstDate = Group.attendance.firstDate;

    if (
      firstDate &&
      firstDate !==
        dayjsToStr(dayjs().subtract(1, "day").startOf("week").add(1, "day"))
    ) {
      patchAttendance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Group?.attendance?.firstDate]);

  useEffect(() => {
    if (isRefetch || !Group || adminIsRefetch) {
      setTimeout(() => {
        refetch();
        setIsRefetch(false);
        setAdminIsRefetch(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Group, isRefetch]);

  return (
    <>
      {Group ? (
        <>
          <Layout>
            <GroupHeader Group={Group} />
            <GroupCover image={Group?.image} />

            <GroupTitle
              isAdmin={Group.organizer.uid === uid}
              memberCnt={Group.participants.length}
              title={Group.title}
              status={Group.status}
              category={Group.category.main}
              maxCnt={Group.memberCnt.max}
              isWaiting={Group.waiting.length !== 0}
            />
            <GroupContent Group={Group} />
            <GroupParticipation data={Group} />
            <GroupComments comment={Group.comment} />

            {![
              Group.organizer,
              ...Group.participants.map((who) => who.user),
            ].some((who) => who.uid === uid) ? (
              <GroupBottomNav data={Group} />
            ) : null}
          </Layout>
          {/* {!isGuest && <GroupBottomNav data={Group} />} */}
        </>
      ) : (
        <MainLoading />
      )}
    </>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  background-color: var(--gray-8);
`;

export default GroupDetail;
