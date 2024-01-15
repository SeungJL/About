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
import { useGroupStudyAttendancePatchMutation } from "../../../hooks/groupStudy/mutations";
import { useGroupStudyAllQuery } from "../../../hooks/groupStudy/queries";
import { useUserInfoQuery } from "../../../hooks/user/queries";
import GroupStudyBottomNav from "../../../pagesComponents/groupStudy/detail/GroupStudyBottomNav";
import GroupStudyComments from "../../../pagesComponents/groupStudy/detail/GroupStudyComment";
import GroupStudyContent from "../../../pagesComponents/groupStudy/detail/GroupStudyContent/GroupStudyContent";
import GroupStudyCover from "../../../pagesComponents/groupStudy/detail/GroupStudyCover";
import GroupStudyHeader from "../../../pagesComponents/groupStudy/detail/GroupStudyHeader";
import GroupStudyParticipation from "../../../pagesComponents/groupStudy/detail/GroupStudyParticipation";
import GroupStudyTitle from "../../../pagesComponents/groupStudy/detail/GroupStudyTitle";
import { isRefetchGroupStudyInfoState } from "../../../recoil/refetchingAtoms";
import { transferGroupStudyDataState } from "../../../recoil/transferDataAtoms";
import { userAccessUidState, userInfoState } from "../../../recoil/userAtoms";

function GroupStudyDetail() {
  const router = useRouter();
  const groupStudyId = router.query.id;

  const uid = useRecoilValue(userAccessUidState);
  const [groupStudy, setGroupStudy] = useRecoilState(
    transferGroupStudyDataState
  );
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useUserInfoQuery({
    enabled: !userInfo,
    onSuccess(data) {
      setUserInfo(data);
    },
  });

  const [adminIsRefetch, setAdminIsRefetch] = useRecoilState(
    isRefetchGroupStudyInfoState
  );
  const [isRefetch, setIsRefetch] = useState(false);

  const { refetch } = useGroupStudyAllQuery({
    enabled: !groupStudy,
    onSuccess(data) {
      setGroupStudy(data.find((item) => item.id === +groupStudyId));
    },
  });

  const resetQueryData = useResetQueryData();

  const { mutate: patchAttendance } = useGroupStudyAttendancePatchMutation(
    +groupStudyId,
    {
      onSuccess() {
        resetQueryData([GROUP_STUDY_ALL]);
      },
    }
  );

  useEffect(() => {
    if (!groupStudy) return;
    const firstDate = groupStudy.attendance.firstDate;

    if (
      firstDate &&
      firstDate !==
        dayjsToStr(dayjs().subtract(1, "day").startOf("week").add(1, "day"))
    ) {
      console.log(4);
      patchAttendance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupStudy?.attendance?.firstDate]);

  useEffect(() => {
    if (isRefetch || !groupStudy || adminIsRefetch) {
      setTimeout(() => {
        refetch();
        setIsRefetch(false);
        setAdminIsRefetch(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupStudy, isRefetch]);

  return (
    <>
      {groupStudy ? (
        <>
          <Layout>
            <GroupStudyHeader groupStudy={groupStudy} />
            <GroupStudyCover image={groupStudy?.image} />

            <GroupStudyTitle
              isAdmin={groupStudy.organizer.uid === uid}
              memberCnt={groupStudy.participants.length}
              title={groupStudy.title}
              status={groupStudy.status}
              category={groupStudy.category.main}
              maxCnt={groupStudy.memberCnt.max}
              isWaiting={groupStudy.waiting.length !== 0}
            />
            <GroupStudyContent groupStudy={groupStudy} />
            <GroupStudyParticipation data={groupStudy} />
            <GroupStudyComments comment={groupStudy.comment} />

            {![
              groupStudy.organizer,
              ...groupStudy.participants.map((who) => who.user),
            ].some((who) => who.uid === uid) ? (
              <GroupStudyBottomNav data={groupStudy} />
            ) : null}
          </Layout>
          {/* {!isGuest && <GroupStudyBottomNav data={groupStudy} />} */}
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
  background-color: var(--font-h8);
`;

export default GroupStudyDetail;
